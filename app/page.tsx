import type { Metadata } from "next";
import Link from "next/link";
import ParallaxBand from "@/components/ParallaxBand";

export const metadata: Metadata = {
  title: "MyJiku | 星と命式が導く、自分軸の羅針盤",
  description: "西洋占星術・四柱推命・数秘術・算命学。占術を自己理解のツールとして使い、自分の人生とキャリアを設計する。",
};

const systems = [
  {
    number: "01",
    title: "西洋占星術",
    titleEn: "Western Astrology",
    href: "/astrology",
    description: "惑星の動きと12のハウスが、あなたの本質・才能・対人関係のパターンを映し出す。生まれ持った資質を読み解き、自分らしい人生設計の地図を描く。",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <circle cx="32" cy="32" r="28" stroke="#111" strokeWidth="0.8"/>
        <circle cx="32" cy="32" r="18" stroke="#111" strokeWidth="0.5"/>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => (
          <line key={deg} x1="32" y1="4" x2="32" y2="14" stroke="#111" strokeWidth="0.7" transform={`rotate(${deg} 32 32)`}/>
        ))}
        <line x1="4" y1="32" x2="60" y2="32" stroke="#111" strokeWidth="0.6"/>
        <line x1="32" y1="4" x2="32" y2="60" stroke="#111" strokeWidth="0.6"/>
        <circle cx="52" cy="18" r="2.5" fill="#111"/>
        <circle cx="14" cy="48" r="2" fill="#888"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "数秘術",
    titleEn: "Numerology",
    href: "/numerology",
    description: "生年月日と名前を数字に還元し、あなたの人生のテーマと使命を読み解く。シンプルな数字の中に、驚くほど精緻な自己像が浮かび上がる。",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <circle cx="32" cy="32" r="22" stroke="#111" strokeWidth="0.8"/>
        <text x="32" y="38" textAnchor="middle" fontSize="20" fill="#111" fontFamily="Georgia,serif" fontStyle="italic">1</text>
        <circle cx="32" cy="10" r="2" fill="#111"/>
        <circle cx="32" cy="54" r="2" fill="#111"/>
        <circle cx="10" cy="32" r="2" fill="#111"/>
        <circle cx="54" cy="32" r="2" fill="#111"/>
        <circle cx="14" cy="14" r="1.5" fill="#CCC"/>
        <circle cx="50" cy="50" r="1.5" fill="#CCC"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "四柱推命",
    titleEn: "Four Pillars of Destiny",
    href: "/shichusuimei",
    description: "生まれた年・月・日・時刻の四つの柱が、あなたの命式を構成する。中国数千年の叡智が紐解く、先天的な資質と後天的な流れ。",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <rect x="8"  y="8"  width="20" height="20" stroke="#111" strokeWidth="0.8"/>
        <rect x="36" y="8"  width="20" height="20" stroke="#111" strokeWidth="0.8"/>
        <rect x="8"  y="36" width="20" height="20" stroke="#111" strokeWidth="0.8"/>
        <rect x="36" y="36" width="20" height="20" stroke="#CCC" strokeWidth="0.5"/>
        <line x1="32" y1="8" x2="32" y2="56" stroke="#E0E0DC" strokeWidth="0.6"/>
        <line x1="8" y1="32" x2="56" y2="32" stroke="#E0E0DC" strokeWidth="0.6"/>
        <circle cx="18" cy="18" r="1.5" fill="#111"/>
        <circle cx="46" cy="18" r="1.5" fill="#111"/>
        <circle cx="18" cy="46" r="1.5" fill="#888"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "九星気学",
    titleEn: "Nine Star Ki",
    href: "/kyusei",
    description: "古代中国の洛書をルーツに持つ九星気学。9つの星が示す才能・適職・気質から、あなたが最大の力を発揮できる環境と役割を読み解く。",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <rect x="8" y="8" width="48" height="48" stroke="#111" strokeWidth="0.8"/>
        <line x1="24" y1="8" x2="24" y2="56" stroke="#111" strokeWidth="0.5"/>
        <line x1="40" y1="8" x2="40" y2="56" stroke="#111" strokeWidth="0.5"/>
        <line x1="8" y1="24" x2="56" y2="24" stroke="#111" strokeWidth="0.5"/>
        <line x1="8" y1="40" x2="56" y2="40" stroke="#111" strokeWidth="0.5"/>
        <circle cx="32" cy="32" r="4" fill="#111"/>
        <circle cx="16" cy="16" r="1.5" fill="#888"/>
        <circle cx="48" cy="16" r="1.5" fill="#888"/>
        <circle cx="16" cy="48" r="1.5" fill="#888"/>
        <circle cx="48" cy="48" r="1.5" fill="#888"/>
      </svg>
    ),
  },
  {
    number: "05",
    title: "算命学",
    titleEn: "Sanmeigaku",
    href: "/sanmeigaku",
    description: "中国古代の哲学を基盤とした占術。天干・地支の組み合わせから、先天的な気質と人生の大きな流れを立体的に読み解く日本独自の体系。",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <line x1="14" y1="16" x2="50" y2="16" stroke="#111" strokeWidth="1.4"/>
        <line x1="14" y1="24" x2="30" y2="24" stroke="#111" strokeWidth="0.8"/>
        <line x1="34" y1="24" x2="50" y2="24" stroke="#111" strokeWidth="0.8"/>
        <line x1="14" y1="32" x2="50" y2="32" stroke="#111" strokeWidth="1.4"/>
        <line x1="14" y1="40" x2="30" y2="40" stroke="#111" strokeWidth="0.8"/>
        <line x1="34" y1="40" x2="50" y2="40" stroke="#111" strokeWidth="0.8"/>
        <line x1="14" y1="48" x2="50" y2="48" stroke="#CCC" strokeWidth="1.4"/>
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <div className="grid border-b border-[#111111] grid-cols-[52px_1fr] md:grid-cols-[52px_1fr_320px]">
        {/* 縦ラベル */}
        <div className="border-r border-[#E0DDD6] flex items-center justify-center bg-[#F4F4F2]">
          <span style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "8px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "#BBB",
            whiteSpace: "nowrap",
          }}>
            Self-knowledge × Divination — MyJiku
          </span>
        </div>

        {/* 本文 */}
        <div className="px-6 md:px-12 py-10 md:py-16 md:border-r border-[#111111] flex flex-col justify-between min-h-[380px] md:min-h-[480px]">
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#888888] mb-7">
              占いは、当てるものじゃない。知るためのものだ。
            </p>
            <h1 className="font-display font-light leading-[0.93] tracking-tight mb-11" style={{ fontSize: "clamp(44px,7vw,84px)" }}>
              星と<br />
              命式が、<br />
              <em className="not-italic font-light italic">羅針盤</em><br />
              になる。
            </h1>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <Link
              href="/astrology"
              className="text-[9px] tracking-[0.3em] uppercase px-7 py-3 bg-[#111111] text-[#F9F9F7] hover:bg-[#333333] transition-colors"
            >
              探索する
            </Link>
            <Link
              href="#systems"
              className="text-[9px] tracking-[0.2em] uppercase px-6 py-3 text-[#888888] hover:text-[#111111] transition-colors flex items-center gap-2"
            >
              <span className="inline-block w-4 h-px bg-[#CCC]" />
              占術を選ぶ
            </Link>
          </div>
        </div>

        {/* ホロスコープチャート - hidden on mobile */}
        <div className="hidden md:flex items-center justify-center p-10 bg-[#F9F9F7]">
          <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[220px] h-[220px]">
            <circle cx="120" cy="120" r="108" stroke="#111" strokeWidth="0.8"/>
            <circle cx="120" cy="120" r="82"  stroke="#111" strokeWidth="0.5"/>
            <circle cx="120" cy="120" r="44"  stroke="#CCC" strokeWidth="0.5"/>
            <circle cx="120" cy="120" r="3"   fill="#111"/>
            {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => (
              <line key={deg} x1="120" y1="12" x2="120" y2="38" stroke="#111" strokeWidth="0.6" transform={`rotate(${deg} 120 120)`}/>
            ))}
            <line x1="12"  y1="120" x2="228" y2="120" stroke="#111" strokeWidth="0.8"/>
            <line x1="120" y1="12"  x2="120" y2="228" stroke="#111" strokeWidth="0.8"/>
            <line x1="172" y1="28"  x2="68"  y2="212" stroke="#BBB" strokeWidth="0.5" strokeDasharray="3 4"/>
            <line x1="212" y1="172" x2="28"  y2="68"  stroke="#BBB" strokeWidth="0.5" strokeDasharray="3 4"/>
            <line x1="172" y1="212" x2="68"  y2="28"  stroke="#DDD" strokeWidth="0.4" strokeDasharray="2 5"/>
            <circle cx="172" cy="28"  r="3.5" fill="#111"/>
            <circle cx="212" cy="172" r="3.5" fill="#111"/>
            <circle cx="68"  cy="212" r="2.5" fill="#888"/>
            <circle cx="28"  cy="68"  r="2.5" fill="#888"/>
            <circle cx="68"  cy="28"  r="2"   fill="#DDD" stroke="#AAA" strokeWidth="0.6"/>
            <circle cx="196" cy="88"  r="2"   fill="#DDD" stroke="#AAA" strokeWidth="0.6"/>
            <text x="122" y="9"   fontSize="8" fill="#888" fontFamily="Georgia,serif">MC</text>
            <text x="5"   y="123" fontSize="8" fill="#888" fontFamily="Georgia,serif">ASC</text>
            <text x="122" y="238" fontSize="8" fill="#DDD" fontFamily="Georgia,serif">IC</text>
            <text x="204" y="123" fontSize="8" fill="#DDD" fontFamily="Georgia,serif">DSC</text>
          </svg>
        </div>
      </div>

      {/* PARALLAX BAND */}
      <ParallaxBand />

      {/* SYSTEMS */}
      <div id="systems">
        {/* ヘッダー */}
        <div className="flex items-center px-6 h-[38px] border-b border-[#111111]">
          <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">Four Systems</span>
          <div className="flex-1 h-px bg-[#E0DDD6]" />
          <span className="font-display text-[11px] text-[#CCC] ml-5 tracking-[0.1em]">i — iv</span>
        </div>

        {systems.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col md:grid border-b border-[#E8E8E4] hover:bg-[#F4F4F2] transition-colors last:border-b-0 md:grid-cols-[120px_72px_220px_1fr]"
          >
            {/* サムネイル */}
            <div className="border-b md:border-b-0 md:border-r border-[#E8E8E4] flex items-center justify-center h-20 md:h-24 bg-[#F4F4F2]">
              {s.icon}
            </div>
            {/* 番号 - hidden on mobile */}
            <div className="hidden md:flex border-r border-[#E8E8E4] items-start pt-7 pl-5">
              <span className="font-display text-[12px] tracking-[0.15em] text-[#CCC]">{s.number} —</span>
            </div>
            {/* タイトル */}
            <div className="md:border-r border-[#E8E8E4] flex flex-col justify-center px-5 md:px-6 py-3 md:py-0">
              <p className="text-[8px] tracking-[0.35em] uppercase text-[#AAA] mb-1">{s.titleEn}</p>
              <h2 className="font-display text-[20px] md:text-[22px] font-light group-hover:opacity-60 transition-opacity">{s.title}</h2>
            </div>
            {/* 説明 */}
            <div className="flex items-start md:items-center px-5 md:px-8 pb-4 pt-0 md:py-7">
              <p className="text-[11px] leading-loose tracking-wider text-[#666666]">{s.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* PHILOSOPHY */}
      <section
        className="py-10 px-6 md:py-16 md:px-12 flex flex-col gap-6 md:grid md:gap-x-10 md:items-start md:grid-cols-[80px_1fr_1fr]"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="hidden md:block font-display text-[120px] leading-[0.7] italic" style={{ color: "#2A2A2A" }}>&ldquo;</div>
        <div>
          <p className="text-[8px] tracking-[0.5em] uppercase mb-5 flex items-center gap-3" style={{ color: "#555" }}>
            Philosophy
            <span className="flex-1 h-px" style={{ background: "#2A2A2A" }} />
          </p>
          <p className="font-display text-[26px] md:text-[30px] font-light italic leading-relaxed" style={{ color: "#F9F9F7" }}>
            「知ること」は、<br />
            「選ぶこと」の始まり。
          </p>
        </div>
        <div className="md:pt-8">
          <p className="text-[11px] leading-[2.2] tracking-wider mb-6" style={{ color: "#666" }}>
            自分の先天的な資質を知れば、強みを活かした選択ができる。人生の流れを読めば、焦らず自分のタイミングで動ける。占術は、自分の人生を自分で設計するための地図だ。
          </p>
          <p className="text-[8px] tracking-[0.35em] uppercase flex items-center gap-3" style={{ color: "#333" }}>
            <span className="inline-block w-6 h-px" style={{ background: "#333" }} />
            MyJiku
          </p>
        </div>
      </section>
    </>
  );
}
