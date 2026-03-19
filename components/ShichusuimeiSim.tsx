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

export default function ShichusuimeiSim() {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [result, setResult] = useState<ReturnType<typeof getFourPillars> | null>(null);
  const [balance, setBalance] = useState<Record<string, number> | null>(null);

  function calculate() {
    const d = new Date(date);
    if (!date || isNaN(d.getTime())) return;
    const h = hour !== "" ? parseInt(hour) : 12;
    const pillars = getFourPillars(d, h);
    setResult(pillars);
    setBalance(calcWuxingBalance(pillars));
  }

  const dayMaster = result?.day.tiangan ?? "";
  const dayElement = WUXING_TIANGAN[dayMaster] ?? "";
  const elementCfg = ELEMENT_DESC[dayElement];
  const maxElement = balance ? Object.entries(balance).sort((a, b) => b[1] - a[1])[0][0] : "";

  return (
    <div className="border border-[#E0DDD6]">
      <div className="flex items-center h-[38px] border-b border-[#111111] px-5">
        <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-4">簡易命式計算</span>
        <div className="flex-1 h-px bg-[#E0DDD6]" />
        <span className="text-[8px] tracking-[0.3em] text-[#CCC] ml-4">Four Pillars</span>
      </div>
      <div className="p-6">
        <div className="flex gap-3 mb-5 flex-wrap">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">生年月日</label>
            <input
              type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full border border-[#E0DDD6] px-3 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors"
            />
          </div>
          <div className="w-24">
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">出生時（任意）</label>
            <input
              type="number" min={0} max={23} placeholder="例: 14"
              value={hour} onChange={e => setHour(e.target.value)}
              className="w-full border border-[#E0DDD6] px-3 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors"
            />
          </div>
          <div className="flex items-end">
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
              <div className="grid grid-cols-4 gap-px bg-[#E0DDD6]">
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
          </div>
        )}
      </div>
    </div>
  );
}
