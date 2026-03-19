"use client";

import { useState } from "react";

const SIGNS = [
  { name: "牡羊座", en: "Aries", from: [3, 21], to: [4, 19], symbol: "♈", keyword: "勇気・開拓・先駆", element: "火" },
  { name: "牡牛座", en: "Taurus", from: [4, 20], to: [5, 20], symbol: "♉", keyword: "忍耐・安定・感覚美", element: "地" },
  { name: "双子座", en: "Gemini", from: [5, 21], to: [6, 20], symbol: "♊", keyword: "知性・変化・コミュニケーション", element: "風" },
  { name: "蟹座", en: "Cancer", from: [6, 21], to: [7, 22], symbol: "♋", keyword: "感受性・守護・家庭", element: "水" },
  { name: "獅子座", en: "Leo", from: [7, 23], to: [8, 22], symbol: "♌", keyword: "カリスマ・表現・誇り", element: "火" },
  { name: "乙女座", en: "Virgo", from: [8, 23], to: [9, 22], symbol: "♍", keyword: "分析・完璧主義・奉仕", element: "地" },
  { name: "天秤座", en: "Libra", from: [9, 23], to: [10, 22], symbol: "♎", keyword: "調和・美・パートナーシップ", element: "風" },
  { name: "蠍座", en: "Scorpio", from: [10, 23], to: [11, 21], symbol: "♏", keyword: "深化・変容・洞察", element: "水" },
  { name: "射手座", en: "Sagittarius", from: [11, 22], to: [12, 21], symbol: "♐", keyword: "冒険・哲学・自由", element: "火" },
  { name: "山羊座", en: "Capricorn", from: [12, 22], to: [1, 19], symbol: "♑", keyword: "野望・規律・達成", element: "地" },
  { name: "水瓶座", en: "Aquarius", from: [1, 20], to: [2, 18], symbol: "♒", keyword: "革新・独立・人道", element: "風" },
  { name: "魚座", en: "Pisces", from: [2, 19], to: [3, 20], symbol: "♓", keyword: "共感・直感・夢想", element: "水" },
];

const ELEMENT_COLOR: Record<string, string> = {
  火: "#C84028", 地: "#7A6040", 風: "#4080A0", 水: "#285888",
};

function getSunSign(month: number, day: number) {
  for (const sign of SIGNS) {
    const [fm, fd] = sign.from;
    const [tm, td] = sign.to;
    if (fm <= tm) {
      if ((month === fm && day >= fd) || (month === tm && day <= td) || (month > fm && month < tm)) return sign;
    } else {
      // wraps year (Capricorn: Dec 22 – Jan 19)
      if ((month === fm && day >= fd) || (month === tm && day <= td) || month > fm || month < tm) return sign;
    }
  }
  return null;
}

export default function SunSignSim() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [result, setResult] = useState<typeof SIGNS[number] | null | "none">(null);

  function calculate() {
    const m = parseInt(month);
    const d = parseInt(day);
    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) { setResult("none"); return; }
    setResult(getSunSign(m, d) ?? "none");
  }

  return (
    <div className="border border-[#E0DDD6]">
      <div className="flex items-center h-[38px] border-b border-[#111111] px-5">
        <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-4">太陽星座を調べる</span>
        <div className="flex-1 h-px bg-[#E0DDD6]" />
        <span className="text-[8px] tracking-[0.3em] text-[#CCC] ml-4">Sun Sign</span>
      </div>
      <div className="p-6">
        <div className="flex gap-3 mb-5">
          <div className="flex-1">
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">月</label>
            <input
              type="number" min={1} max={12} placeholder="例: 3"
              value={month} onChange={e => setMonth(e.target.value)}
              className="w-full border border-[#E0DDD6] px-3 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">日</label>
            <input
              type="number" min={1} max={31} placeholder="例: 21"
              value={day} onChange={e => setDay(e.target.value)}
              className="w-full border border-[#E0DDD6] px-3 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={calculate}
              className="px-5 py-2 bg-[#111111] text-[#F9F9F7] text-[9px] tracking-[0.3em] uppercase hover:bg-[#333] transition-colors"
            >
              計算
            </button>
          </div>
        </div>

        {result && result !== "none" && (
          <div className="border-t border-[#E0DDD6] pt-5">
            <div className="flex items-center gap-5">
              <div className="text-center">
                <p className="font-display text-5xl" style={{ color: ELEMENT_COLOR[result.element] }}>{result.symbol}</p>
                <p className="text-[8px] tracking-[0.3em] uppercase text-[#888888] mt-1">{result.en}</p>
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="font-display text-2xl font-light">{result.name}</p>
                  <span className="text-[8px] tracking-[0.2em] text-[#888888]">{result.element}のエレメント</span>
                </div>
                <p className="text-xs text-[#555555] tracking-wider mb-3">{result.keyword}</p>
              </div>
            </div>
          </div>
        )}
        {result === "none" && (
          <p className="text-xs text-[#888888] tracking-wider border-t border-[#E0DDD6] pt-4">有効な月・日を入力してください。</p>
        )}
      </div>
    </div>
  );
}
