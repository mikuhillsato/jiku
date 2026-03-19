"use client";

import { useState } from "react";

// ─── Star data ─────────────────────────────────────────────────────
const STARS: Record<number, {
  name: string; en: string; element: string; direction: string;
  keyword: string; talent: string; career: string;
  desc: string; monthDesc: string;
}> = {
  1: {
    name: "一白水星", en: "Ippaku Suisei", element: "水", direction: "北",
    keyword: "知性・適応・洞察",
    talent: "水のように形を変えながら深く浸透する適応力と洞察力。状況を読み、相手に合わせながら本質を見抜く力が際立つ。表面に出るより、情報・知識・分析で裏から動かすタイプ。",
    career: "コンサルタント・調査研究・ライター・外交・カウンセラー・分析職",
    desc: "縁の下で力を発揮し、じっくり積み上げることで本物の実力をつける星。",
    monthDesc: "月命星として現れるとき、洞察力と表現の柔軟性がより際立つ。",
  },
  2: {
    name: "二黒土星", en: "Jikoku Dosei", element: "土", direction: "南西",
    keyword: "勤勉・育む・継続",
    talent: "コツコツと地道に積み上げる継続力と、人・組織・プロジェクトを育てる母性的な力。縁の下の力持ちとして、チームを支える役割で最大の力を発揮する。",
    career: "医療・介護・食・農業・教育・管理・サポート・チームビルディング",
    desc: "急がず焦らず、長期的な視点で育てることが最大の強み。組織の土台を支える役割で真価を発揮する星。",
    monthDesc: "月命星として現れるとき、粘り強さと継続力が前面に出る。",
  },
  3: {
    name: "三碧木星", en: "Sanheki Mokusei", element: "木", direction: "東",
    keyword: "行動力・革新・スピード",
    talent: "誰よりも早く動き、新しいものを生み出す推進力。雷のような瞬発力と行動エネルギーで局面を打開する。考えるより先に動き、その行動力自体が道を切り拓く。",
    career: "起業家・営業・広報・エンターテインメント・スポーツ・ITベンチャー・新規事業",
    desc: "変化の激しい環境で真価を発揮する革新者の星。既存の枠を壊して新しい道を切り拓くことで本領を発揮。",
    monthDesc: "月命星として現れるとき、行動の即応性と表現の鋭さが際立つ。",
  },
  4: {
    name: "四緑木星", en: "Shiryoku Mokusei", element: "木", direction: "南東",
    keyword: "信頼・調和・ネットワーク",
    talent: "人と人をつなぐ調整力と、信頼関係を丁寧に築く誠実さ。風のように広く浸透し、縁を広げながら調和を生み出す。交渉・調整・橋渡しで他者の追随を許さない。",
    career: "貿易・外交・調停・PR・コーディネーター・中間管理職・旅行・国際業務",
    desc: "人脈と信頼が最大の財産になる星。一対一の深い関係と広いネットワークの両立が得意。",
    monthDesc: "月命星として現れるとき、人間関係の構築力とコミュニケーションの滑らかさが加わる。",
  },
  5: {
    name: "五黄土星", en: "Goo Dosei", element: "土", direction: "中央",
    keyword: "カリスマ・変革・中心力",
    talent: "9つの星の中心に位置する圧倒的なエネルギー。場の中心に立ち、すべてを統率するカリスマ性。破壊と再生を繰り返しながら大きな変革を成し遂げる力は他の星には持てない規模を持つ。",
    career: "経営者・プロデューサー・政治家・変革リーダー・独立業・組織再建",
    desc: "最強かつ最難のエネルギーを持つ星。大きな組織のトップか完全な独立業が向く。中途半端な立場では力を持て余す。",
    monthDesc: "月命星として現れるとき、強烈な存在感と変革へのエネルギーが滲み出る。",
  },
  6: {
    name: "六白金星", en: "Roppaku Kinsei", element: "金", direction: "北西",
    keyword: "権威・完璧主義・誇り",
    talent: "高い基準を設定し、それを達成するまで妥協しない意志力。天の道理に従い、組織と秩序を守りながら最高品質を実現するリーダーシップ。プロとしての誇りが全行動の軸になる。",
    career: "経営幹部・法律・金融・行政・医師・専門職リーダー・軍・組織マネジメント",
    desc: "権威と誇りを持つ星。高いプロ意識が強みで、組織の上位に立つか専門性を極める方向で才能が開花。",
    monthDesc: "月命星として現れるとき、物事への高い基準と判断の鋭さが加わる。",
  },
  7: {
    name: "七赤金星", en: "Shichiseki Kinsei", element: "金", direction: "西",
    keyword: "弁才・喜び・社交性",
    talent: "話す・伝える・楽しませる弁才と、人を喜ばせるセンス。刃のような鋭さを明るさと愛嬌で包み、相手の心を開かせる。人前に立つと才能が一気に開花する星。",
    career: "講師・接客・芸能・セールス・コンサルタント・飲食・美容・イベント",
    desc: "コミュニケーション能力と愛嬌が最大の武器。人前に出る仕事・話す仕事で才能が開花する。",
    monthDesc: "月命星として現れるとき、表現の明るさと人を惹きつける魅力が際立つ。",
  },
  8: {
    name: "八白土星", en: "Hakku Dosei", element: "土", direction: "北東",
    keyword: "変化・蓄積・粘り強さ",
    talent: "山のように動じない安定感と、長期的に積み上げる忍耐力。変化の節目を的確につかむ先見性と、一度決めたら動じない強さが最大の武器。財産・技術・信頼を着実に蓄積する。",
    career: "不動産・金融・投資・コーチング・武道・伝統工芸・再生事業・長期プロジェクト",
    desc: "最終的に大きな財産を築く星。急がず焦らず長期視点で積み上げる仕事に向く。変化の節目に特に強い。",
    monthDesc: "月命星として現れるとき、粘り強さと地に足のついた判断力が加わる。",
  },
  9: {
    name: "九紫火星", en: "Kyushi Kasei", element: "火", direction: "南",
    keyword: "直感・美・洞察",
    talent: "鋭い直感力と高い審美眼。物事の本質を瞬時に見抜き、美しく表現する力。炎のように人を惹きつけ、見えないものを見える形にする独自の能力を持つ。",
    career: "デザイン・芸術・教育・批評・マーケティング・美容・プロデュース・編集",
    desc: "美意識と直感が武器。「見えないものを見える形にする」仕事で際立つ。人前で輝くことで才能が最大限に発揮される星。",
    monthDesc: "月命星として現れるとき、直感の精度と美的感覚の鋭さが際立つ。",
  },
};

// ─── 計算ロジック ───────────────────────────────────────────────────
function calcHonmeiNumber(year: number): number {
  let s = year;
  while (s >= 10) {
    s = String(s).split("").reduce((acc, d) => acc + Number(d), 0);
  }
  const result = 10 - s;
  return result === 0 ? 9 : result < 0 ? result + 9 : result;
}

function calcHonmei(year: number, month: number, beforeSetsubun: boolean): number {
  // 節分(2/4)前の場合は前年で計算
  const calcYear = (month === 1 || (month === 2 && beforeSetsubun)) ? year - 1 : year;
  return calcHonmeiNumber(calcYear);
}

function calcGetsumei(honmeiNum: number, month: number, beforeSetsubun: boolean): number {
  // 節分前の場合は実質前月扱い（月インデックスを前月に）
  let adjustedMonth = month;
  if (month === 2 && beforeSetsubun) {
    adjustedMonth = 1; // 1月扱い
  }

  // 本命星グループによる寅月(2月)の基準星
  let base: number;
  const group = honmeiNum % 3 === 1 ? 1 : honmeiNum % 3 === 2 ? 2 : 0;
  if (group === 1) base = 8; // 1,4,7 → 八白(8)
  else if (group === 2) base = 5; // 2,5,8 → 五黄(5)
  else base = 2; // 3,6,9 → 二黒(2)

  // 各月のインデックス: 2月=0, 3月=1, ..., 1月=11
  const monthIndex = adjustedMonth === 1 ? 11 : adjustedMonth - 2;
  const result = ((base - 1 - monthIndex) % 9 + 9) % 9 + 1;
  return result;
}

// ─── 相生・相克 ────────────────────────────────────────────────────
const SANSHO: [string, string][] = [
  ["水", "木"], ["木", "火"], ["火", "土"], ["土", "金"], ["金", "水"],
];
const SOKOKU: [string, string][] = [
  ["水", "火"], ["火", "金"], ["金", "木"], ["木", "土"], ["土", "水"],
];

function getInteractionText(honmeiEl: string, getsumeiEl: string): string {
  if (honmeiEl === getsumeiEl) {
    return "同じ五行が重なり、その特質が際立って強く現れる。迷いなく一つの方向に集中できる力がある";
  }
  const isSansho = SANSHO.some(([a, b]) => a === honmeiEl && b === getsumeiEl);
  if (isSansho) {
    return "二つの星が互いを高め合う相生の関係にある。本命星のエネルギーが月命星の質によってさらに発展・拡大される";
  }
  const isSokoku = SOKOKU.some(([a, b]) => a === honmeiEl && b === getsumeiEl);
  if (isSokoku) {
    return "異なるエネルギーが緊張を生む相克の関係だが、この緊張こそが独自の個性と突破力の源になる";
  }
  return "互いに補完し合いながら、多様な状況に対応できる幅の広さを生み出す";
}

function buildReading(honmeiNum: number, getsumeiNum: number): string {
  const honmeiStar = STARS[honmeiNum];
  const getsumeiStar = STARS[getsumeiNum];
  const honmeiKw = honmeiStar.keyword.split("・")[0];
  const getsumeiKw = getsumeiStar.keyword.split("・")[0];
  const interactionText = getInteractionText(honmeiStar.element, getsumeiStar.element);
  return `本命星${honmeiStar.name}は「${honmeiKw}」という核心的な資質で世界と関わる。${honmeiStar.talent} 月命星${getsumeiStar.name}はその才能の表現に「${getsumeiKw}」の色を加える。${getsumeiStar.monthDesc} この組み合わせは、${interactionText}。`;
}

// ─── Constants ────────────────────────────────────────────────────
const YEARS = Array.from({ length: 106 }, (_, i) => 1920 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

// ─── Main component ───────────────────────────────────────────────
export default function KyuseiSim() {
  const [year, setYear] = useState<number>(1990);
  const [month, setMonth] = useState<number>(6);
  const [beforeSetsubun, setBeforeSetsubun] = useState<boolean>(false);
  const [result, setResult] = useState<{ honmei: number; getsumei: number } | null>(null);

  const showSetsubun = month === 1 || month === 2;

  function calculate() {
    const honmei = calcHonmei(year, month, beforeSetsubun);
    const getsumei = calcGetsumei(honmei, month, beforeSetsubun);
    setResult({ honmei, getsumei });
  }

  const selectCls = "border border-[#E0DDD6] px-2 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors";

  return (
    <div className="border border-[#E0DDD6]">
      {/* Header */}
      <div className="flex items-center h-[38px] border-b border-[#111111] px-5">
        <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-4">九星気学 計算</span>
        <div className="flex-1 h-px bg-[#E0DDD6]" />
        <span className="text-[8px] tracking-[0.3em] text-[#CCC] ml-4">Nine Star Ki</span>
      </div>

      <div className="p-6">
        {/* Form */}
        <div className="flex gap-3 mb-5 items-end flex-wrap">
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">生年</label>
            <select value={year} onChange={e => setYear(Number(e.target.value))} className={selectCls}>
              {YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">生月</label>
            <select
              value={month}
              onChange={e => {
                const m = Number(e.target.value);
                setMonth(m);
                if (m !== 1 && m !== 2) setBeforeSetsubun(false);
              }}
              className={selectCls}
            >
              {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
            </select>
          </div>
          {showSetsubun && (
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-xs text-[#555555] cursor-pointer">
                <input
                  type="checkbox"
                  checked={beforeSetsubun}
                  onChange={e => setBeforeSetsubun(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#111111]"
                />
                2月3日以前生まれ（1月・2月生まれの方）
              </label>
            </div>
          )}
          <button
            onClick={calculate}
            className="px-5 py-2 bg-[#111111] text-[#F9F9F7] text-[9px] tracking-[0.3em] uppercase hover:bg-[#333] transition-colors"
          >
            計算
          </button>
        </div>

        {/* Results */}
        {result && (() => {
          const honmeiStar = STARS[result.honmei];
          const getsumeiStar = STARS[result.getsumei];
          return (
            <div className="border-t border-[#E0DDD6] pt-5 space-y-4">

              {/* 本命星 */}
              <div>
                <p className="text-[8px] tracking-[0.4em] uppercase text-[#888888] mb-3">本命星</p>
                <div className="bg-[#111111] text-[#F9F9F7] p-6">
                  <p className="font-display text-4xl font-light mb-3">{honmeiStar.name}</p>
                  <p className="text-xs text-[#888] mb-1 tracking-wider">{honmeiStar.en}</p>
                  <p className="text-xs text-[#888] mb-4 tracking-wider">
                    五行：{honmeiStar.element}　方位：{honmeiStar.direction}　キーワード：{honmeiStar.keyword}
                  </p>
                  <p className="text-sm leading-loose text-[#C8C4B8] mb-4 tracking-wider">{honmeiStar.talent}</p>
                  <div className="border-t border-[#222] pt-4">
                    <p className="text-[8px] tracking-[0.3em] uppercase text-[#555] mb-1">Career</p>
                    <p className="text-xs text-[#888] tracking-wider">{honmeiStar.career}</p>
                  </div>
                </div>
              </div>

              {/* 月命星 */}
              <div>
                <p className="text-[8px] tracking-[0.4em] uppercase text-[#888888] mb-3">月命星（サブの星）</p>
                <div className="bg-[#F4F4F2] p-5">
                  <p className="text-[9px] tracking-wider text-[#888888] mb-3">月命星は本命星を補完するサブの資質を示す</p>
                  <p className="font-display text-2xl font-light text-[#111111] mb-1">{getsumeiStar.name}</p>
                  <p className="text-xs text-[#555] tracking-wider mb-3">{getsumeiStar.keyword}</p>
                  <p className="text-sm text-[#555555] leading-loose tracking-wider">{getsumeiStar.monthDesc}</p>
                </div>
              </div>

              {/* Reading */}
              <div>
                <p className="text-[8px] tracking-[0.4em] uppercase text-[#888888] mb-3">Reading</p>
                <div className="bg-[#111111] p-6">
                  <p className="text-[8px] tracking-[0.5em] uppercase mb-5" style={{ color: "#555555" }}>
                    Reading — 本命星と月命星が語ること
                  </p>
                  <p style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "15px", fontWeight: 300, lineHeight: 2.1,
                    letterSpacing: "0.04em", color: "#C8C4B8",
                  }}>
                    {buildReading(result.honmei, result.getsumei)}
                  </p>
                  <p className="text-[8px] tracking-[0.3em] mt-5 pt-4 border-t" style={{ color: "#333333", borderColor: "#222222" }}>
                    ※ 簡易計算による概観です。詳細な方位・年盤・月盤の読みは専門鑑定でご確認ください。
                  </p>
                </div>
              </div>

            </div>
          );
        })()}
      </div>
    </div>
  );
}
