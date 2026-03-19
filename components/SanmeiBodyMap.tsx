export default function SanmeiBodyMap() {
  return (
    <div className="bg-[#111111] p-8 flex flex-col items-center">
      <p className="text-xs tracking-[0.2em] text-[#888888] mb-6 uppercase">人体図 — Jinzu Chart</p>

      <div className="relative" style={{ width: 220, height: 480 }}>
        <svg
          width="220"
          height="480"
          viewBox="0 0 220 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Zone backgrounds ── */}
          {/* 天 (Heaven) zone */}
          <rect x="10" y="10" width="200" height="148" rx="4"
            fill="#1A1F35" stroke="#2A2F52" strokeWidth="1" />
          {/* 人 (Human) zone */}
          <rect x="10" y="166" width="200" height="148" rx="4"
            fill="#0F1428" stroke="#2A2F52" strokeWidth="1" />
          {/* 地 (Earth) zone */}
          <rect x="10" y="322" width="200" height="148" rx="4"
            fill="#0A0F20" stroke="#2A2F52" strokeWidth="1" />

          {/* ── Zone labels (right side) ── */}
          <text x="196" y="90" fill="#AAAAAA" fontSize="11" fontFamily="serif"
            textAnchor="middle" dominantBaseline="middle" writingMode="vertical-rl">天</text>
          <text x="196" y="244" fill="#AAAAAA" fontSize="11" fontFamily="serif"
            textAnchor="middle" dominantBaseline="middle" writingMode="vertical-rl">人</text>
          <text x="196" y="400" fill="#AAAAAA" fontSize="11" fontFamily="serif"
            textAnchor="middle" dominantBaseline="middle" writingMode="vertical-rl">地</text>

          {/* ══════════════════════════════
              HUMAN FIGURE
              ══════════════════════════════ */}

          {/* Head */}
          <circle cx="110" cy="52" r="26" fill="#E8E8E4" stroke="#111111" strokeWidth="1.2" />

          {/* Neck */}
          <rect x="102" y="76" width="16" height="14" rx="3" fill="#E8E8E4" />

          {/* Shoulders / upper torso */}
          <path d="M62 94 C62 88 80 86 110 86 C140 86 158 88 158 94 L162 130 L58 130 Z"
            fill="#E8E8E4" stroke="#111111" strokeWidth="1" />

          {/* Left arm */}
          <path d="M62 96 C50 100 40 118 38 148 L34 168 C32 174 36 178 40 176 L48 148 C50 132 58 116 66 110 Z"
            fill="#E8E8E4" stroke="#111111" strokeWidth="1" />
          {/* Left hand */}
          <ellipse cx="37" cy="178" rx="7" ry="5" fill="#E8E8E4" stroke="#111111" strokeWidth="1" />

          {/* Right arm */}
          <path d="M158 96 C170 100 180 118 182 148 L186 168 C188 174 184 178 180 176 L172 148 C170 132 162 116 154 110 Z"
            fill="#E8E8E4" stroke="#111111" strokeWidth="1" />
          {/* Right hand */}
          <ellipse cx="183" cy="178" rx="7" ry="5" fill="#E8E8E4" stroke="#111111" strokeWidth="1" />

          {/* Torso (middle) */}
          <rect x="68" y="128" width="84" height="110" rx="8"
            fill="#E8E8E4" stroke="#111111" strokeWidth="1" />

          {/* Hip / pelvis */}
          <path d="M60 236 C58 248 64 260 110 260 C156 260 162 248 160 236 L152 238 L68 238 Z"
            fill="#E8E8E4" stroke="#111111" strokeWidth="1" />

          {/* Left leg */}
          <rect x="70" y="258" width="34" height="130" rx="8"
            fill="#E8E8E4" stroke="#111111" strokeWidth="1" />
          {/* Left foot */}
          <ellipse cx="87" cy="394" rx="20" ry="8" fill="#E8E8E4" stroke="#111111" strokeWidth="1" />

          {/* Right leg */}
          <rect x="116" y="258" width="34" height="130" rx="8"
            fill="#E8E8E4" stroke="#111111" strokeWidth="1" />
          {/* Right foot */}
          <ellipse cx="133" cy="394" rx="20" ry="8" fill="#E8E8E4" stroke="#111111" strokeWidth="1" />

          {/* ── Zone dividers ── */}
          <line x1="58" y1="160" x2="162" y2="160" stroke="#2A2F52" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="60" y1="318" x2="160" y2="318" stroke="#2A2F52" strokeWidth="1" strokeDasharray="4 3" />

          {/* ── Pillar labels (left side) ── */}
          {/* 年柱 */}
          <rect x="14" y="70" width="36" height="42" rx="3" fill="#1E2548" stroke="#2A2F52" strokeWidth="1" />
          <text x="32" y="88" fill="#888888" fontSize="9" textAnchor="middle" fontFamily="sans-serif">年柱</text>
          <text x="32" y="102" fill="#888888" fontSize="8" textAnchor="middle" fontFamily="sans-serif">社会運</text>
          <line x1="50" y1="91" x2="67" y2="91" stroke="#2A2F52" strokeWidth="1" />

          {/* 月柱 */}
          <rect x="14" y="226" width="36" height="42" rx="3" fill="#1E2548" stroke="#2A2F52" strokeWidth="1" />
          <text x="32" y="244" fill="#888888" fontSize="9" textAnchor="middle" fontFamily="sans-serif">月柱</text>
          <text x="32" y="258" fill="#888888" fontSize="8" textAnchor="middle" fontFamily="sans-serif">精神運</text>
          <line x1="50" y1="247" x2="68" y2="186" stroke="#2A2F52" strokeWidth="1" />

          {/* 日柱 */}
          <rect x="14" y="360" width="36" height="42" rx="3" fill="#1E2548" stroke="#2A2F52" strokeWidth="1" />
          <text x="32" y="378" fill="#888888" fontSize="9" textAnchor="middle" fontFamily="sans-serif">日柱</text>
          <text x="32" y="392" fill="#888888" fontSize="8" textAnchor="middle" fontFamily="sans-serif">本能運</text>
          <line x1="50" y1="381" x2="70" y2="335" stroke="#2A2F52" strokeWidth="1" />

          {/* ── Star placements (dots on body) ── */}
          {/* 天将星 — head top */}
          <circle cx="110" cy="36" r="3.5" fill="#888888" opacity="0.8" />
          {/* 禄存星 — left shoulder */}
          <circle cx="76" cy="96" r="3" fill="#888888" opacity="0.7" />
          {/* 牽牛星 — right shoulder */}
          <circle cx="144" cy="96" r="3" fill="#888888" opacity="0.7" />
          {/* 龍高星 — chest center */}
          <circle cx="110" cy="152" r="3" fill="#888888" opacity="0.7" />
          {/* 調舒星 — left side torso */}
          <circle cx="80" cy="175" r="3" fill="#888888" opacity="0.6" />
          {/* 玉堂星 — right side torso */}
          <circle cx="140" cy="175" r="3" fill="#888888" opacity="0.6" />
          {/* 司禄星 — abdomen */}
          <circle cx="110" cy="210" r="3" fill="#888888" opacity="0.6" />
          {/* 石門星 — left hip */}
          <circle cx="84" cy="270" r="3" fill="#888888" opacity="0.6" />
          {/* 車騎星 — right hip */}
          <circle cx="136" cy="270" r="3" fill="#888888" opacity="0.6" />
          {/* 鳳閣星 — feet */}
          <circle cx="110" cy="380" r="3" fill="#888888" opacity="0.5" />
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 w-full space-y-2">
        {[
          { zone: "天", label: "年柱 — 社会・対人・公の場での運", color: "#888888" },
          { zone: "人", label: "月柱 — 精神・内面・意志の運", color: "#444444" },
          { zone: "地", label: "日柱 — 本能・身体・プライベートの運", color: "#888888" },
        ].map((item) => (
          <div key={item.zone} className="flex items-center gap-3">
            <div
              className="w-5 h-5 flex items-center justify-center text-xs font-serif shrink-0"
              style={{ color: item.color, border: `1px solid ${item.color}33` }}
            >
              {item.zone}
            </div>
            <p className="text-xs text-[#888888] tracking-wider">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
