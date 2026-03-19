"use client";

import { useState } from "react";
import { getYearPillar, getMonthPillar, getDayPillar, DIZHI_ANIMAL, WUXING_TIANGAN } from "@/lib/bazi";

const TEN_STARS: Record<string, { index: number; keyword: string; short: string }> = {
  甲: { index: 0, keyword: "天将星", short: "王者・支配・カリスマ" },
  乙: { index: 1, keyword: "禄存星", short: "奉仕・貢献・人情" },
  丙: { index: 2, keyword: "司禄星", short: "蓄積・堅実・現実主義" },
  丁: { index: 3, keyword: "牽牛星", short: "誇り・プロ意識・完璧主義" },
  戊: { index: 4, keyword: "龍高星", short: "自由・改革・知性" },
  己: { index: 5, keyword: "玉堂星", short: "伝統・継承・守護" },
  庚: { index: 6, keyword: "調舒星", short: "感性・孤高・芸術" },
  辛: { index: 7, keyword: "鳳閣星", short: "自然体・おおらか・長寿" },
  壬: { index: 8, keyword: "石門星", short: "友情・集団・調和" },
  癸: { index: 9, keyword: "車騎星", short: "行動・闘争・実行力" },
};

const ELEMENT_COLOR: Record<string, string> = {
  木: "#3A6B2A", 火: "#C84028", 土: "#8C6830", 金: "#6080A0", 水: "#285888",
};

export default function SanmeiSim() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{
    dayMaster: string; element: string; star: { keyword: string; short: string };
    yearAnimal: string; monthAnimal: string; dayAnimal: string;
    pillars: { year: string; month: string; day: string };
  } | null>(null);

  function calculate() {
    const d = new Date(date);
    if (!date || isNaN(d.getTime())) return;
    const year = getYearPillar(d);
    const month = getMonthPillar(d);
    const day = getDayPillar(d);
    const dayMaster = day.tiangan;
    const element = WUXING_TIANGAN[dayMaster] ?? "木";
    const star = TEN_STARS[dayMaster] ?? TEN_STARS["甲"];
    setResult({
      dayMaster,
      element,
      star,
      yearAnimal: DIZHI_ANIMAL[year.dizhi],
      monthAnimal: DIZHI_ANIMAL[month.dizhi],
      dayAnimal: DIZHI_ANIMAL[day.dizhi],
      pillars: { year: year.combined, month: month.combined, day: day.combined },
    });
  }

  return (
    <div className="border border-[#E0DDD6]">
      <div className="flex items-center h-[38px] border-b border-[#111111] px-5">
        <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-4">簡易命式計算</span>
        <div className="flex-1 h-px bg-[#E0DDD6]" />
        <span className="text-[8px] tracking-[0.3em] text-[#CCC] ml-4">Sanmeigaku</span>
      </div>
      <div className="p-6">
        <div className="flex gap-3 mb-5">
          <div className="flex-1">
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">生年月日</label>
            <input
              type="date" value={date} onChange={e => setDate(e.target.value)}
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
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#888888] mb-3">年柱 / 月柱 / 日柱</p>
              <div className="grid grid-cols-3 gap-px bg-[#E0DDD6]">
                {[
                  { label: "年柱", combined: result.pillars.year, animal: result.yearAnimal },
                  { label: "月柱", combined: result.pillars.month, animal: result.monthAnimal },
                  { label: "日柱 ★", combined: result.pillars.day, animal: result.dayAnimal },
                ].map(({ label, combined, animal }) => (
                  <div key={label} className="bg-[#F4F4F2] p-3 text-center">
                    <p className="text-[8px] text-[#888888] mb-1">{label}</p>
                    <p className="font-display text-2xl font-light text-[#111111]">{combined}</p>
                    <p className="text-[10px] text-[#888888] mt-1">{animal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Day Master + Star */}
            <div className="bg-[#111111] p-5 text-[#F9F9F7]">
              <p className="text-[8px] tracking-[0.4em] uppercase mb-4" style={{ color: "#555" }}>主星（宿命の中心）</p>
              <div className="flex items-start gap-5">
                <div className="text-center">
                  <p className="font-display text-6xl font-light" style={{ color: ELEMENT_COLOR[result.element] }}>{result.dayMaster}</p>
                  <p className="text-[8px] tracking-[0.2em] uppercase mt-1" style={{ color: "#888" }}>{result.element}</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-light mb-1" style={{ color: "#F9F9F7" }}>{result.star.keyword}</p>
                  <p className="text-xs tracking-wider mb-3" style={{ color: "#888" }}>{result.star.short}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] tracking-[0.2em] uppercase" style={{ color: "#555" }}>Day Master</span>
                    <span className="text-sm font-display" style={{ color: ELEMENT_COLOR[result.element] }}>{result.dayMaster}</span>
                    <span className="text-[8px]" style={{ color: "#555" }}>— {result.element}のエネルギー</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Animals */}
            <div>
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#888888] mb-3">十二支（陰占）</p>
              <div className="flex gap-px bg-[#E0DDD6]">
                {[
                  { label: "年支", animal: result.yearAnimal },
                  { label: "月支", animal: result.monthAnimal },
                  { label: "日支", animal: result.dayAnimal },
                ].map(({ label, animal }) => (
                  <div key={label} className="flex-1 bg-[#F4F4F2] p-3 text-center">
                    <p className="text-[8px] text-[#888888] mb-1">{label}</p>
                    <p className="font-display text-2xl font-light">{animal}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#888888] tracking-wider mt-2">
                ※ 算命学では年・月・日の三柱（六文字）が基本。宿命星・守護神の詳細は専門鑑定でご確認ください。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
