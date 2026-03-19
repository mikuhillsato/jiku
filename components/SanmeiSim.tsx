"use client";

import { useState } from "react";
import { getYearPillar, getMonthPillar, getDayPillar, DIZHI_ANIMAL, WUXING_TIANGAN } from "@/lib/bazi";

// ─── Star data ────────────────────────────────────────────────────
const TEN_STARS: Record<string, { name: string; keyword: string; short: string; desc: string }> = {
  甲: { name: "天将星", keyword: "王者・支配・カリスマ",     short: "リーダー気質",   desc: "最も強い意志エネルギー。自然と人の上に立ち、場を支配する力を持つ" },
  乙: { name: "禄存星", keyword: "奉仕・貢献・人情",         short: "面倒見の良さ",   desc: "人に尽くすことで満たされる星。コミュニティの中心で温かく支える" },
  丙: { name: "司禄星", keyword: "蓄積・堅実・現実主義",     short: "堅実な積み上げ", desc: "コツコツと積み上げる星。安定を愛し、長期的に実績を育てていく" },
  丁: { name: "牽牛星", keyword: "誇り・プロ意識・完璧主義", short: "職人の誇り",     desc: "一流であることへのこだわりを持つ星。専門性と完璧主義が強み" },
  戊: { name: "龍高星", keyword: "自由・改革・知性",         short: "改革と知性",     desc: "既存の枠を壊し新しいものを作る改革者。知的好奇心と自由を愛する" },
  己: { name: "玉堂星", keyword: "伝統・継承・守護",         short: "守り伝える力",   desc: "先人の知恵や伝統を守り伝える星。深い精神性と落ち着いた判断力" },
  庚: { name: "調舒星", keyword: "感性・孤高・芸術",         short: "芸術的感性",     desc: "繊細な感性と孤独な深みを持つ芸術家の星。独自スタイルで突き詰める" },
  辛: { name: "鳳閣星", keyword: "自然体・おおらか・長寿",   short: "自然体の強さ",   desc: "自然の流れに身をゆだねるおおらかな星。無理をしないことが才能になる" },
  壬: { name: "石門星", keyword: "友情・集団・調和",         short: "社交とつながり", desc: "仲間との絆を大切にする社交の星。グループの橋渡し役として力を発揮" },
  癸: { name: "車騎星", keyword: "行動・闘争・実行力",       short: "突破力",         desc: "考えるより先に動く行動力の星。現場で力を発揮し、困難を突き破る" },
};

// 地支の主気（蔵干） → 天干 → 宿命星
const DIZHI_MAIN_STEM: Record<string, string> = {
  子:"癸", 丑:"己", 寅:"甲", 卯:"乙", 辰:"戊",
  巳:"丙", 午:"丁", 未:"己", 申:"庚", 酉:"辛", 戌:"戊", 亥:"壬",
};

// 人体図ポジション説明
const POSITION_DESC: Record<string, string> = {
  "頭":   "社会・対外的な顔。外の世界にどう出るかを示す",
  "右肩": "先祖・ルーツ・社会的な背景から受け取ったエネルギー",
  "本人": "あなた自身の本質。命式の中心",
  "胸":   "意志・精神・内なる動機の核心",
  "腹":   "感情・本能・プライベートな内面",
  "右足": "先祖から受け継いだ地のエネルギー。土台と現実基盤",
  "左足": "精神の根。内側の安定と成長の方向",
};

const YEARS  = Array.from({ length: 106 }, (_, i) => 1920 + i);
const MONTHS = Array.from({ length: 12  }, (_, i) => i + 1);
const DAYS   = Array.from({ length: 31  }, (_, i) => i + 1);

type StarInfo = { stem: string; star: typeof TEN_STARS[string] };
type ChartData = {
  yearTG: StarInfo; yearDZ: StarInfo;
  monthTG: StarInfo; monthDZ: StarInfo;
  dayMaster: string; dayMasterElement: string;
  dayDZ: StarInfo;
  yearAnimal: string; monthAnimal: string; dayAnimal: string;
  pillars: { year: string; month: string; day: string };
};

function getStar(stem: string): StarInfo {
  return { stem, star: TEN_STARS[stem] ?? TEN_STARS["甲"] };
}

// ─── Reading ──────────────────────────────────────────────────────
const STAR_READING: Record<string, string> = {
  天将星: "命式の中に強いリーダーシップと支配力が宿っている。人の上に立つことを宿命として持ち、責任の重さに比例して輝く人生だ",
  禄存星: "人に尽くし、つながりの中で充実する宿命を持つ。与えることで自分も満たされるという豊かなサイクルが人生の核心にある",
  司禄星: "堅実な積み上げと安定を愛する宿命。派手さより継続性に価値を置き、じっくりと確かな実績を育てていく人生が合っている",
  牽牛星: "プロとしての誇りと完璧主義が命式を貫く。技術・専門性・一流であることへのこだわりが人生の方向性を決めていく",
  龍高星: "既存の枠を超えていく改革者の宿命。知的好奇心と自由への渇望が強く、常識の外に出ることで真の力を発揮する",
  玉堂星: "伝統・家族・精神的な守護を大切にする宿命。先人の知恵を継承しながら、落ち着いた判断力で周囲を安定させる",
  調舒星: "繊細な感性と孤高の深みを持つ芸術的な宿命。群れることより独自の道を深く突き詰めることで、唯一無二の輝きを放つ",
  鳳閣星: "自然体でおおらかな宿命。無理をせず流れに乗ることが最大の才能であり、長期的な視点で人生を豊かに謳歌できる",
  石門星: "仲間とのつながりと集団の調和を軸にする宿命。橋渡し役として人と人をつなぐことで、命式の力が最も発揮される",
  車騎星: "行動力と突破力を持つ宿命。考えるより先に動き、現場で力を発揮するアクティブな人生が命式と一致している",
};

function buildReading(chart: ChartData): string {
  const mainStar = TEN_STARS[chart.dayMaster]?.name ?? "";
  const headStar = chart.yearTG.star.name;
  const innerStar = chart.dayDZ.star.name;
  return (
    `日主${chart.dayMaster}（${chart.dayMasterElement}）の命式——${STAR_READING[mainStar]}。` +
    `頭の位置に${headStar}を持ち、社会に対して「${chart.yearTG.star.keyword}」の顔を向けている。` +
    `腹の${innerStar}は内面・感情の核心であり、${chart.dayDZ.star.desc}、という本能が行動の根底を流れる。`
  );
}

// ─── Body diagram SVG ─────────────────────────────────────────────
// 3 cols × 3 rows — data grid (no silhouette) matching SanmeiBodyMap structure
function BodyDiagram({ chart }: { chart: ChartData }) {
  const filled = [
    { col: 1, row: 0, pos: "頭",   info: chart.yearTG  },
    { col: 2, row: 0, pos: "左肩", info: chart.yearDZ  },
    { col: 1, row: 1, pos: "胸",   info: chart.monthTG },
    { col: 0, row: 2, pos: "腰",   info: chart.dayDZ   },
    { col: 1, row: 2, pos: "腹",   info: chart.monthDZ },
  ];
  const empty = [
    { col: 0, row: 0, pos: "親縁" },
    { col: 0, row: 1, pos: "右手" },
    { col: 2, row: 1, pos: "左手" },
    { col: 2, row: 2, pos: "左足" },
  ];

  // col centers: 41, 104, 167  |  row centers: 60, 160, 260
  const cx = (c: number) => 10 + 63 * c + 31;
  const cy = (r: number) => 10 + 100 * r + 50;

  return (
    <svg viewBox="0 0 210 316" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 210, display: 'block', margin: '0 auto' }}>
      {/* ── Silhouette (drawn first, behind grid) ── */}
      <g fill="#DDDBD8">
        <circle cx="105" cy="42" r="20" />
        <rect x="98" y="60" width="14" height="10" />
        <path d="M 70 70 Q 105 62 140 70 L 134 198 Q 105 206 76 198 Z" />
        <path d="M 70 72 L 24 170 L 36 174 L 80 78 Z" />
        <path d="M 140 72 L 186 170 L 174 174 L 130 78 Z" />
        <rect x="76" y="197" width="24" height="108" rx="5" />
        <rect x="105" y="197" width="24" height="108" rx="5" />
      </g>

      {/* ── Grid ── */}
      <rect x="10" y="10" width="190" height="300" stroke="#C4C1B8" strokeWidth="0.5" />
      <line x1="10"  y1="110" x2="200" y2="110" stroke="#CCCAC4" strokeWidth="0.5" />
      <line x1="10"  y1="210" x2="200" y2="210" stroke="#CCCAC4" strokeWidth="0.5" />
      <line x1="73"  y1="10"  x2="73"  y2="310" stroke="#CCCAC4" strokeWidth="0.5" />
      <line x1="137" y1="10"  x2="137" y2="310" stroke="#CCCAC4" strokeWidth="0.5" />


      {/* ── Zone labels ── */}
      <text x="205" y="60"  fill="#888888" fontSize="10" fontFamily="serif" textAnchor="middle">天</text>
      <text x="205" y="160" fill="#888888" fontSize="10" fontFamily="serif" textAnchor="middle">人</text>
      <text x="205" y="260" fill="#888888" fontSize="10" fontFamily="serif" textAnchor="middle">地</text>

      {/* ── Empty placeholder cells ── */}
      {empty.map(cell => (
        <text key={cell.pos}
          x={cx(cell.col)} y={cy(cell.row)}
          fill="#D0CEC8" fontSize="9" fontFamily="serif"
          textAnchor="middle" dominantBaseline="middle">
          {cell.pos}
        </text>
      ))}

      {/* ── Filled star cells ── */}
      {filled.map(cell => (
        <g key={cell.pos}>
          {/* subtle highlight */}
          <rect
            x={10 + 63 * cell.col + 1} y={10 + 100 * cell.row + 1}
            width={61} height={98} fill="#D8D5D0" fillOpacity="0.65"
          />
          <text x={cx(cell.col)} y={cy(cell.row) - 14} fill="#999999" fontSize="7"    textAnchor="middle" fontFamily="sans-serif">{cell.pos}</text>
          <text x={cx(cell.col)} y={cy(cell.row) + 2}  fill="#111111" fontSize="10.5" textAnchor="middle" dominantBaseline="middle" fontFamily="serif">{cell.info.star.name}</text>
          <text x={cx(cell.col)} y={cy(cell.row) + 18} fill="#888888" fontSize="6.5"  textAnchor="middle" fontFamily="sans-serif">{cell.info.star.short}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────
export default function SanmeiSim() {
  const [year,   setYear]   = useState<number>(1990);
  const [month,  setMonth]  = useState<number>(1);
  const [day,    setDay]    = useState<number>(1);
  const [chart,  setChart]  = useState<ChartData | null>(null);

  function calculate() {
    const d = new Date(year, month - 1, day);
    if (isNaN(d.getTime())) return;
    const yp = getYearPillar(d);
    const mp = getMonthPillar(d);
    const dp = getDayPillar(d);
    const dayMaster = dp.tiangan;
    const dayMasterElement = WUXING_TIANGAN[dayMaster] ?? "木";
    setChart({
      yearTG:  getStar(yp.tiangan),
      yearDZ:  getStar(DIZHI_MAIN_STEM[yp.dizhi] ?? "甲"),
      monthTG: getStar(mp.tiangan),
      monthDZ: getStar(DIZHI_MAIN_STEM[mp.dizhi] ?? "甲"),
      dayMaster,
      dayMasterElement,
      dayDZ:   getStar(DIZHI_MAIN_STEM[dp.dizhi] ?? "甲"),
      yearAnimal:  DIZHI_ANIMAL[yp.dizhi],
      monthAnimal: DIZHI_ANIMAL[mp.dizhi],
      dayAnimal:   DIZHI_ANIMAL[dp.dizhi],
      pillars: { year: yp.combined, month: mp.combined, day: dp.combined },
    });
  }

  const selectCls = "border border-[#E0DDD6] px-2 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors";

  return (
    <div className="border border-[#E0DDD6]">
      <div className="flex items-center h-[38px] border-b border-[#111111] px-5">
        <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-4">簡易命式計算</span>
        <div className="flex-1 h-px bg-[#E0DDD6]" />
        <span className="text-[8px] tracking-[0.3em] text-[#CCC] ml-4">Sanmeigaku</span>
      </div>

      <div className="p-6">
        {/* Form */}
        <div className="flex gap-3 mb-5 items-end flex-wrap">
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">生年月日</label>
            <div className="flex gap-1">
              <select value={year}  onChange={e => setYear(Number(e.target.value))}  className={selectCls}>
                {YEARS.map(y  => <option key={y}  value={y}>{y}年</option>)}
              </select>
              <select value={month} onChange={e => setMonth(Number(e.target.value))} className={selectCls}>
                {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
              </select>
              <select value={day}   onChange={e => setDay(Number(e.target.value))}   className={selectCls}>
                {DAYS.map(d   => <option key={d}  value={d}>{d}日</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} className="px-5 py-2 bg-[#111111] text-[#F9F9F7] text-[9px] tracking-[0.3em] uppercase hover:bg-[#333] transition-colors">
            計算
          </button>
        </div>

        {chart && (
          <div className="border-t border-[#E0DDD6] pt-5 space-y-5">

            {/* Pillars */}
            <div>
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#888888] mb-3">年柱 / 月柱 / 日柱</p>
              <div className="grid grid-cols-3 gap-px bg-[#E0DDD6]">
                {[
                  { label: "年柱", combined: chart.pillars.year,  animal: chart.yearAnimal  },
                  { label: "月柱", combined: chart.pillars.month, animal: chart.monthAnimal },
                  { label: "日柱 ★", combined: chart.pillars.day, animal: chart.dayAnimal  },
                ].map(({ label, combined, animal }) => (
                  <div key={label} className="bg-[#F4F4F2] p-3 text-center">
                    <p className="text-[8px] text-[#888888] mb-1">{label}</p>
                    <p className="font-display text-2xl font-light text-[#111111]">{combined}</p>
                    <p className="text-[10px] text-[#888888] mt-1">{animal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Body diagram */}
            <div>
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#888888] mb-3">人体図 — 宿命星の配置</p>
              <div className="bg-[#F9F9F7] flex justify-center p-5">
                <BodyDiagram chart={chart} />
              </div>
            </div>

            {/* Day master block */}
            <div className="bg-[#111111] p-5">
              <p className="text-[8px] tracking-[0.4em] uppercase mb-4" style={{ color: "#555" }}>主星（日干の宿命星）</p>
              <div className="flex items-start gap-5">
                <div className="text-center shrink-0">
                  <p className="font-display text-5xl font-light text-[#F9F9F7]">{chart.dayMaster}</p>
                  <p className="text-[8px] tracking-[0.2em] uppercase mt-1 text-[#888888]">{chart.dayMasterElement}</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-light text-[#F9F9F7] mb-1">{TEN_STARS[chart.dayMaster]?.name}</p>
                  <p className="text-xs tracking-wider text-[#888888] mb-2">{TEN_STARS[chart.dayMaster]?.keyword}</p>
                  <p className="text-xs text-[#888888] leading-relaxed tracking-wider">{TEN_STARS[chart.dayMaster]?.desc}</p>
                </div>
              </div>
            </div>

            {/* Reading */}
            <div style={{ backgroundColor: "#111111" }} className="p-6">
              <p className="text-[8px] tracking-[0.5em] uppercase mb-5" style={{ color: "#555555" }}>
                Reading — 命式が語ること
              </p>
              <p style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "15px", fontWeight: 300, lineHeight: 2.1,
                letterSpacing: "0.04em", color: "#C8C4B8",
              }}>
                {buildReading(chart)}
              </p>
              <p className="text-[8px] tracking-[0.3em] mt-5 pt-4 border-t"
                 style={{ color: "#333333", borderColor: "#222222" }}>
                ※ 簡易計算による概観です。宿命星の詳細な配置・位相法・守護神は専門鑑定でご確認ください。
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
