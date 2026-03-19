export default function SanmeiBodyMap() {
  return (
    <div className="bg-[#F4F4F2] p-5 flex flex-col items-center">
      <p className="text-[8px] tracking-[0.4em] text-[#888888] mb-4 uppercase">人体図 — Jinzu Chart</p>

      {/*
        Grid: 3 cols × 3 rows, 190×300
        Col width: ~63px  |  Row height: 100px
        Col centers: 42, 105, 168
        Row centers: 60, 160, 260
      */}
      <svg width="100%" viewBox="0 0 210 316" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 210 }}>

        {/* ── Silhouette ── */}
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


        {/* ── Row: 天 — all cells center-aligned at row center (y=60) ── */}
        <text x="41"  y="55"  fill="#888888" fontSize="9"   fontFamily="serif"      textAnchor="middle">親縁</text>
        <text x="41"  y="68"  fill="#AAAAAA" fontSize="6"   fontFamily="sans-serif" textAnchor="middle">初年期</text>
        <text x="105" y="55"  fill="#222222" fontSize="10"  fontFamily="serif"      textAnchor="middle">頭</text>
        <text x="105" y="68"  fill="#888888" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">年干</text>
        <text x="169" y="55"  fill="#333333" fontSize="10"  fontFamily="serif"      textAnchor="middle">左肩</text>
        <text x="169" y="68"  fill="#888888" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">年支</text>

        {/* ── Row: 人 ── */}
        <text x="41"  y="155" fill="#333333" fontSize="10"  fontFamily="serif"      textAnchor="middle">右手</text>
        <text x="41"  y="168" fill="#AAAAAA" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">配偶運</text>
        <text x="105" y="155" fill="#222222" fontSize="10"  fontFamily="serif"      textAnchor="middle">胸</text>
        <text x="105" y="168" fill="#888888" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">月干</text>
        <text x="169" y="155" fill="#333333" fontSize="10"  fontFamily="serif"      textAnchor="middle">左手</text>
        <text x="169" y="168" fill="#AAAAAA" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">兄弟運</text>

        {/* ── Row: 地 ── */}
        <text x="41"  y="255" fill="#333333" fontSize="10"  fontFamily="serif"      textAnchor="middle">右足</text>
        <text x="41"  y="268" fill="#AAAAAA" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">晩年運</text>
        <text x="105" y="255" fill="#222222" fontSize="10"  fontFamily="serif"      textAnchor="middle">腹</text>
        <text x="105" y="268" fill="#888888" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">月支</text>
        <text x="169" y="255" fill="#333333" fontSize="10"  fontFamily="serif"      textAnchor="middle">左足</text>
        <text x="169" y="268" fill="#AAAAAA" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle">中年運</text>

        {/* ── Zone labels (right of grid) ── */}
        <text x="205" y="60"  fill="#888888" fontSize="10" fontFamily="serif" textAnchor="middle">天</text>
        <text x="205" y="160" fill="#888888" fontSize="10" fontFamily="serif" textAnchor="middle">人</text>
        <text x="205" y="260" fill="#888888" fontSize="10" fontFamily="serif" textAnchor="middle">地</text>
      </svg>
    </div>
  );
}
