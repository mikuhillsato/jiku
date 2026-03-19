"use client";

import { useState } from "react";
import { getFourPillars, calcWuxingBalance, WUXING_TIANGAN, WUXING_DIZHI } from "@/lib/bazi";

const ELEMENT_DESC: Record<string, { en: string; trait: string; color: string }> = {
  木: { en: "Wood", trait: "成長・柔軟・上昇志向", color: "#3A6B2A" },
  火: { en: "Fire", trait: "情熱・表現・直感", color: "#C84028" },
  土: { en: "Earth", trait: "安定・実直・調和", color: "#8C6830" },
  金: { en: "Metal", trait: "厳格・決断・鋭さ", color: "#6080A0" },
  水: { en: "Water", trait: "智慧・流動・深み", color: "#285888" },
};

const TIANGAN_DESC: Record<string, string> = {
  甲: "大木。正義感・リーダーシップ・上昇志向",
  乙: "草花。柔軟性・適応力・生命力",
  丙: "太陽。明るさ・カリスマ・情熱",
  丁: "灯火。繊細な美意識・集中力・温かさ",
  戊: "大山。包容力・安定・信頼感",
  己: "田畑。育てる力・現実的・地道な積み上げ",
  庚: "鋼。決断力・意志の強さ・潔癖",
  辛: "宝石。審美眼・プライドの高さ・磨かれて輝く",
  壬: "大海。知性・包容力・自由への渇望",
  癸: "雨水。直感・繊細さ・内側に深い世界",
};

// 五行が命式全体で最も強い場合の気質傾向
const ELEMENT_DOMINANT_DESC: Record<string, string> = {
  木: "成長と前進への強い意志が命式を貫く。目標に向かって着実に伸び続ける力があり、新しい道を切り開く開拓者の気質を持つ。ただし主張が強くなりすぎると周囲との摩擦が生じやすい面もある",
  火: "情熱とカリスマが際立つ命式。表現力・行動力が強く、人を引き付ける輝きを持つ。舞台に立ち光を放つことで本領を発揮するが、エネルギーの消耗が激しく、静養の時間を意識的に設けることが大切だ",
  土: "安定と信頼を軸に生きる命式。粘り強く周囲の支えになれる人間力を持つ。じっくりと積み上げ、長い時間をかけて結果を出すタイプ。変化への対応に時間がかかることもあるが、一度根付いたものは揺らがない",
  金: "鋭い判断力と強い意志を持つ命式。プロ意識が高く、決断が速い。自分の信念を曲げない潔さが強みだが、完璧主義が自他を追い込む場面もある。磨けば磨くほど輝く宝石のような人生",
  水: "深い知性と柔軟な思考力が命式の中心にある。状況に応じて形を変える適応力と、表面には見えない洞察力を持つ。流れるように物事を処理できるが、方向性を定めることが運気を整えるカギになる",
};

// 五行が最も弱い場合＝意識的に補うことで運が整う
const ELEMENT_WEAK_DESC: Record<string, string> = {
  木: "新しい挑戦や成長の意欲を意識的に育てることが開運につながる。固定したルーティンより「はじめての経験」に積極的に飛び込む姿勢が命式を活性化させる",
  火: "自己表現や情熱を外に出す練習が、流れを変えるきっかけになる。自分の感情や意見を開示することへの恐れを手放すと、命式全体のエネルギーが動き出す",
  土: "地に足のついた習慣とルーティンを持つことで、命式の安定が増す。「今いる場所に根を張る」意識が、浮き足立ちがちなエネルギーを地に戻してくれる",
  金: "自分の軸と決断力を磨くことで、人生の方向性がクリアになる。他者の意見より自分の判断を優先する練習が、命式の力を引き出す",
  水: "知識を深め、直感を信頼する練習が命式を豊かにする。立ち止まって内省する時間を定期的に作ることが、表面的な行動力を本物の知恵へと変えていく",
};

// 月支から季節・五行を導く
const DIZHI_SEASON_EL: Record<string, string> = {
  寅:"木", 卯:"木", 辰:"土",
  巳:"火", 午:"火", 未:"土",
  申:"金", 酉:"金", 戌:"土",
  亥:"水", 子:"水", 丑:"土",
};

// 相生（生じる関係）: A → B = AがBを生む
const GENERATES: Record<string, string> = {
  木:"火", 火:"土", 土:"金", 金:"水", 水:"木",
};

function buildReading(
  pillars: ReturnType<typeof import("@/lib/bazi").getFourPillars>,
  balance: Record<string, number>,
  dayMaster: string,
  dayElement: string,
): string {
  const sorted = Object.entries(balance).sort((a, b) => b[1] - a[1]);
  const dominant = sorted[0][0];
  const weakest  = sorted[sorted.length - 1][0];

  // 日主が季節に乗っているか（旺相）
  const seasonEl = DIZHI_SEASON_EL[pillars.month.dizhi] ?? "";
  const isSupported = seasonEl === dayElement || GENERATES[seasonEl] === dayElement;
  const strengthNote = isSupported
    ? `生まれた季節（${pillars.month.dizhi}の月）は日主${dayMaster}を後押しする環境であり、本来の力を発揮しやすい命式と言える。`
    : `生まれた季節（${pillars.month.dizhi}の月）の気は日主${dayMaster}と異なる方向を向いており、環境との折り合いをどうつけるかが人生の大きなテーマになる。`;

  const weakNote = weakest !== dominant
    ? `命式の中で${weakest}の気が最も薄い。${ELEMENT_WEAK_DESC[weakest]}。`
    : "";

  return (
    `日主${dayMaster}（${dayElement}）——${TIANGAN_DESC[dayMaster]}。` +
    `この命式全体を見渡すと${dominant}のエネルギーが最も強く出ており、${ELEMENT_DOMINANT_DESC[dominant]}。` +
    strengthNote +
    weakNote
  );
}

const YEARS  = Array.from({ length: 106 }, (_, i) => 1920 + i);
const MONTHS = Array.from({ length: 12 },  (_, i) => i + 1);
const DAYS   = Array.from({ length: 31 },  (_, i) => i + 1);

export default function ShichusuimeiSim() {
  const [year,  setYear]  = useState<number>(1990);
  const [month, setMonth] = useState<number>(1);
  const [day,   setDay]   = useState<number>(1);
  const [hour,  setHour]  = useState("");
  const [result,  setResult]  = useState<ReturnType<typeof getFourPillars> | null>(null);
  const [balance, setBalance] = useState<Record<string, number> | null>(null);

  function calculate() {
    const d = new Date(year, month - 1, day);
    if (isNaN(d.getTime())) return;
    const h = hour !== "" ? parseInt(hour) : 12;
    const pillars = getFourPillars(d, h);
    setResult(pillars);
    setBalance(calcWuxingBalance(pillars));
  }

  const dayMaster  = result?.day.tiangan ?? "";
  const dayElement = WUXING_TIANGAN[dayMaster] ?? "";
  const elementCfg = ELEMENT_DESC[dayElement];
  const maxElement = balance ? Object.entries(balance).sort((a, b) => b[1] - a[1])[0][0] : "";
  const readingText = result && balance ? buildReading(result, balance, dayMaster, dayElement) : "";

  return (
    <div className="border border-[#E0DDD6]">
      <div className="flex items-center h-[38px] border-b border-[#111111] px-5">
        <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-4">簡易命式計算</span>
        <div className="flex-1 h-px bg-[#E0DDD6]" />
        <span className="text-[8px] tracking-[0.3em] text-[#CCC] ml-4">Four Pillars</span>
      </div>
      <div className="p-6">
        <div className="flex gap-3 mb-5 flex-wrap items-end">
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">生年月日</label>
            <div className="flex gap-1">
              <select value={year}  onChange={e => setYear(Number(e.target.value))}
                className="border border-[#E0DDD6] px-2 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors">
                {YEARS.map(y  => <option key={y}  value={y}>{y}年</option>)}
              </select>
              <select value={month} onChange={e => setMonth(Number(e.target.value))}
                className="border border-[#E0DDD6] px-2 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors">
                {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
              </select>
              <select value={day}   onChange={e => setDay(Number(e.target.value))}
                className="border border-[#E0DDD6] px-2 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors">
                {DAYS.map(d   => <option key={d}  value={d}>{d}日</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">出生時（任意）</label>
            <input
              type="number" min={0} max={23} placeholder="例: 14"
              value={hour} onChange={e => setHour(e.target.value)}
              className="w-24 border border-[#E0DDD6] px-3 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors"
            />
          </div>
          <div>
            <button onClick={calculate} className="px-5 py-2 bg-[#111111] text-[#F9F9F7] text-[9px] tracking-[0.3em] uppercase hover:bg-[#333] transition-colors">
              計算
            </button>
          </div>
        </div>

        {result && (
          <div className="border-t border-[#E0DDD6] pt-5 space-y-5">
            {/* Pillars */}
            <div>
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#888888] mb-3">命式（四柱）</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E0DDD6]">
                {[
                  { label: "年柱", pillar: result.year },
                  { label: "月柱", pillar: result.month },
                  { label: "日柱 ★", pillar: result.day },
                  { label: "時柱", pillar: result.hour },
                ].map(({ label, pillar }) => (
                  <div key={label} className="bg-[#F4F4F2] p-3 text-center">
                    <p className="text-[8px] text-[#888888] mb-1">{label}</p>
                    <p className="font-display text-xl font-light text-[#111111]">{pillar.tiangan}</p>
                    <p className="text-[9px] text-[#555555]">{WUXING_TIANGAN[pillar.tiangan]}</p>
                    <p className="font-display text-xl font-light text-[#111111] mt-1">{pillar.dizhi}</p>
                    <p className="text-[9px] text-[#555555]">{WUXING_DIZHI[pillar.dizhi]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Day Master */}
            {elementCfg && (
              <div className="bg-[#111111] p-5 text-[#F9F9F7]">
                <p className="text-[8px] tracking-[0.4em] uppercase mb-3" style={{ color: "#555" }}>日主（あなたの本質）</p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-display text-5xl font-light" style={{ color: elementCfg.color }}>{dayMaster}</p>
                    <p className="text-[9px] tracking-[0.2em] uppercase mt-1" style={{ color: "#888" }}>{elementCfg.en}</p>
                  </div>
                  <div>
                    <p className="text-sm font-display font-light mb-1" style={{ color: elementCfg.color }}>{dayElement} — {elementCfg.trait}</p>
                    <p className="text-xs leading-relaxed tracking-wider" style={{ color: "#888" }}>{TIANGAN_DESC[dayMaster]}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Balance */}
            {balance && (
              <div>
                <p className="text-[8px] tracking-[0.4em] uppercase text-[#888888] mb-3">五行バランス</p>
                <div className="flex gap-px bg-[#E0DDD6]">
                  {Object.entries(balance).map(([el, count]) => (
                    <div key={el} className="flex-1 bg-[#F4F4F2] p-2 text-center">
                      <p className="font-display text-lg font-light" style={{ color: ELEMENT_DESC[el]?.color ?? "#111" }}>{el}</p>
                      <p className="text-[10px] text-[#888888] mt-1">{"●".repeat(count)}{"○".repeat(8 - count)}</p>
                      <p className="text-[10px] text-[#555555]">{count}pt</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#555555] tracking-wider mt-2">
                  最も強い五行：<span className="font-display text-lg" style={{ color: ELEMENT_DESC[maxElement]?.color }}>{maxElement}</span>
                  　{ELEMENT_DESC[maxElement]?.trait}
                </p>
              </div>
            )}

            {/* Reading */}
            {readingText && (
              <div style={{ backgroundColor: "#111111" }} className="p-6">
                <p className="text-[8px] tracking-[0.5em] uppercase mb-5" style={{ color: "#555555" }}>
                  Reading — 命式が語ること
                </p>
                <p style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "15px", fontWeight: 300, lineHeight: 2.1,
                  letterSpacing: "0.04em", color: "#C8C4B8",
                }}>
                  {readingText}
                </p>
                <p className="text-[8px] tracking-[0.3em] mt-5 pt-4 border-t"
                   style={{ color: "#333333", borderColor: "#222222" }}>
                  ※ 簡易計算による概観です。実際の鑑定では大運・流年・通変星の詳細な配置も読み合わせます。
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
