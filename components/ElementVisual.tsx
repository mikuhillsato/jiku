import type { ReactElement } from "react";

type Element = "wood" | "fire" | "earth" | "metal" | "water";

const visuals: Record<Element, ReactElement> = {
  wood: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* Tree trunk */}
      <rect x="24" y="30" width="8" height="20" rx="2" fill="#2D6A2D" opacity="0.9" />
      {/* Canopy layers */}
      <ellipse cx="28" cy="22" rx="16" ry="12" fill="#3A8A3A" opacity="0.85" />
      <ellipse cx="28" cy="14" rx="11" ry="9" fill="#4CAF50" opacity="0.9" />
      <ellipse cx="28" cy="8" rx="7" ry="6" fill="#66BB6A" />
      {/* Growth lines */}
      <line x1="28" y1="30" x2="18" y2="22" stroke="#4CAF50" strokeWidth="1" opacity="0.5" />
      <line x1="28" y1="30" x2="38" y2="22" stroke="#4CAF50" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  fire: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <radialGradient id="fireGrad" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="50%" stopColor="#FF3800" />
          <stop offset="100%" stopColor="#CC1800" stopOpacity="0.8" />
        </radialGradient>
      </defs>
      {/* Main flame */}
      <path d="M28 52 C14 52 8 40 12 28 C16 18 20 22 20 14 C20 8 24 4 28 2 C28 10 32 12 34 18 C36 24 32 26 32 32 C36 28 38 20 36 12 C42 18 48 30 44 42 C42 48 36 52 28 52Z" fill="url(#fireGrad)" />
      {/* Inner bright core */}
      <path d="M28 48 C20 48 16 40 18 32 C20 26 24 28 24 22 C26 28 28 30 28 36 C30 30 30 24 28 18 C34 24 36 34 32 42 C30 46 28 48 28 48Z" fill="#FFB040" opacity="0.8" />
      {/* Tip glow */}
      <ellipse cx="28" cy="8" rx="4" ry="5" fill="#FFE080" opacity="0.6" />
    </svg>
  ),
  earth: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="earthGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C8A040" />
          <stop offset="100%" stopColor="#886020" />
        </linearGradient>
      </defs>
      {/* Base square / mountain form */}
      <rect x="8" y="20" width="40" height="30" rx="2" fill="url(#earthGrad)" opacity="0.9" />
      {/* Mountain peak */}
      <polygon points="28,6 10,22 46,22" fill="#D4A840" opacity="0.95" />
      {/* Highlight */}
      <polygon points="28,8 22,18 34,18" fill="#E8C060" opacity="0.7" />
      {/* Ground line */}
      <line x1="4" y1="50" x2="52" y2="50" stroke="#A07830" strokeWidth="2" opacity="0.6" />
    </svg>
  ),
  metal: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8E8F0" />
          <stop offset="40%" stopColor="#C0B8D8" />
          <stop offset="100%" stopColor="#8878A8" />
        </linearGradient>
      </defs>
      {/* Diamond / crystal form */}
      <polygon points="28,4 50,22 44,48 12,48 6,22" fill="url(#metalGrad)" opacity="0.9" />
      {/* Facet lines */}
      <line x1="28" y1="4" x2="28" y2="48" stroke="#D8D0F0" strokeWidth="0.8" opacity="0.5" />
      <line x1="6" y1="22" x2="50" y2="22" stroke="#D8D0F0" strokeWidth="0.8" opacity="0.5" />
      <line x1="28" y1="4" x2="6" y2="22" stroke="white" strokeWidth="1" opacity="0.4" />
      <line x1="28" y1="4" x2="50" y2="22" stroke="white" strokeWidth="0.5" opacity="0.2" />
      {/* Shine */}
      <polygon points="28,4 38,14 28,24 18,14" fill="white" opacity="0.2" />
    </svg>
  ),
  water: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#4090E0" />
          <stop offset="50%" stopColor="#2060C0" />
          <stop offset="100%" stopColor="#0830A0" />
        </linearGradient>
      </defs>
      {/* Water drop */}
      <path d="M28 4 C28 4 10 26 10 36 C10 46 18 52 28 52 C38 52 46 46 46 36 C46 26 28 4 28 4Z" fill="url(#waterGrad)" opacity="0.9" />
      {/* Wave highlight */}
      <path d="M16 36 C18 32 22 34 24 30 C26 26 28 28 30 24" stroke="#80C0FF" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Shine */}
      <ellipse cx="22" cy="28" rx="5" ry="8" fill="white" opacity="0.15" transform="rotate(-20 22 28)" />
    </svg>
  ),
};

export default function ElementVisual({ element }: { element: Element }) {
  return (
    <div className="flex items-center justify-center w-14 h-14">
      {visuals[element]}
    </div>
  );
}
