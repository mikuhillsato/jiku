type Planet = "sun" | "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune" | "pluto";

const FILTER_ID = "planet-noise";

function PlanetFilters() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        {/* Surface noise */}
        <filter id="planet-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="soft-light" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>
        {/* Atmosphere glow */}
        <filter id="planet-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Moon craters */}
        <filter id="moon-texture">
          <feTurbulence type="turbulence" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feComposite in="displaced" in2="SourceGraphic" operator="in" />
        </filter>
        {/* Gas giant bands */}
        <filter id="band-warp">
          <feTurbulence type="turbulence" baseFrequency="0.02 0.4" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

function Sun({ size }: { size: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* Corona glow */}
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle, rgba(255,220,50,0.6) 0%, rgba(255,140,0,0.2) 55%, transparent 75%)",
        transform: "scale(1.45)",
        filter: "blur(8px)",
      }} />
      {/* Surface */}
      <div className="rounded-full absolute inset-0" style={{
        background: "radial-gradient(circle at 35% 32%, #FFF5A0 0%, #FFD700 22%, #FF8C00 55%, #CC4400 80%, #992200 100%)",
        filter: `url(#${FILTER_ID})`,
      }} />
      {/* Surface shimmer */}
      <div className="rounded-full absolute inset-0" style={{
        background: "radial-gradient(circle at 30% 28%, rgba(255,255,200,0.55) 0%, transparent 48%)",
      }} />
    </div>
  );
}

function Moon({ size }: { size: number }) {
  return (
    <div className="relative shrink-0 rounded-full overflow-hidden" style={{ width: size, height: size }}>
      {/* Base */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 36% 34%, #D8D4C8 0%, #B0AC9C 38%, #8C8878 68%, #605C50 90%, #4A463C 100%)",
      }} />
      {/* Texture */}
      <div className="absolute inset-0" style={{ filter: "url(#moon-texture)", mixBlendMode: "multiply", opacity: 0.6,
        background: "radial-gradient(circle at 50% 50%, #888 0%, #444 100%)" }} />
      {/* Craters (SVG circles) */}
      <svg className="absolute inset-0" width={size} height={size} style={{ opacity: 0.35 }}>
        <circle cx={size*0.3} cy={size*0.35} r={size*0.08} fill="none" stroke="#555" strokeWidth="1.5" />
        <circle cx={size*0.6} cy={size*0.55} r={size*0.05} fill="none" stroke="#555" strokeWidth="1" />
        <circle cx={size*0.22} cy={size*0.65} r={size*0.04} fill="none" stroke="#555" strokeWidth="1" />
        <circle cx={size*0.7} cy={size*0.28} r={size*0.03} fill="none" stroke="#555" strokeWidth="0.8" />
        <circle cx={size*0.52} cy={size*0.7} r={size*0.035} fill="none" stroke="#555" strokeWidth="0.8" />
      </svg>
      {/* Highlight */}
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle at 32% 30%, rgba(255,255,240,0.5) 0%, transparent 45%)",
      }} />
    </div>
  );
}

function Mercury({ size }: { size: number }) {
  return (
    <div className="relative shrink-0 rounded-full overflow-hidden" style={{ width: size, height: size }}>
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 36% 32%, #C8B8A4 0%, #A89880 38%, #887260 68%, #604840 90%, #402820 100%)",
        filter: `url(#${FILTER_ID})`,
      }} />
      <svg className="absolute inset-0" width={size} height={size} style={{ opacity: 0.3 }}>
        <circle cx={size*0.38} cy={size*0.42} r={size*0.06} fill="none" stroke="#444" strokeWidth="1.2" />
        <circle cx={size*0.62} cy={size*0.3} r={size*0.04} fill="none" stroke="#444" strokeWidth="1" />
        <circle cx={size*0.25} cy={size*0.6} r={size*0.03} fill="none" stroke="#444" strokeWidth="0.8" />
      </svg>
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle at 32% 28%, rgba(255,240,220,0.45) 0%, transparent 42%)",
      }} />
    </div>
  );
}

function Venus({ size }: { size: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle, rgba(255,240,150,0.5) 0%, transparent 65%)",
        transform: "scale(1.25)",
        filter: "blur(6px)",
      }} />
      <div className="rounded-full absolute inset-0 overflow-hidden" style={{
        background: "radial-gradient(circle at 40% 36%, #FFFCE8 0%, #F4E098 28%, #D4BC60 56%, #B09830 78%, #8C7418 100%)",
      }}>
        {/* Cloud bands */}
        {[0.25, 0.42, 0.58, 0.72].map((y, i) => (
          <div key={i} className="absolute left-0 right-0" style={{
            top: `${y * 100}%`,
            height: `${size * 0.07}px`,
            background: i % 2 === 0 ? "rgba(255,245,180,0.4)" : "rgba(180,140,40,0.3)",
            filter: "url(#band-warp)",
          }} />
        ))}
      </div>
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle at 34% 30%, rgba(255,255,240,0.6) 0%, transparent 40%)",
      }} />
    </div>
  );
}

function Mars({ size }: { size: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle, rgba(200,80,40,0.35) 0%, transparent 65%)",
        transform: "scale(1.2)",
        filter: "blur(5px)",
      }} />
      <div className="rounded-full absolute inset-0 overflow-hidden" style={{
        background: "radial-gradient(circle at 36% 32%, #E87060 0%, #C84830 38%, #A03018 68%, #7A1E0A 90%, #580E00 100%)",
        filter: `url(#${FILTER_ID})`,
      }}>
        {/* Polar cap */}
        <div className="absolute" style={{
          top: 0, left: "30%", right: "30%", height: "16%",
          background: "rgba(240,230,220,0.65)",
          borderRadius: "0 0 50% 50%",
          filter: "blur(1px)",
        }} />
        {/* Valles Marineris hint */}
        <div className="absolute" style={{
          top: "42%", left: "18%", right: "25%", height: "3px",
          background: "rgba(60,10,0,0.6)",
          borderRadius: "2px",
          transform: "rotate(-8deg)",
        }} />
      </div>
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle at 32% 28%, rgba(255,220,200,0.5) 0%, transparent 42%)",
      }} />
    </div>
  );
}

function Jupiter({ size }: { size: number }) {
  const bands = [
    { y: 0, h: 0.12, color: "#C8A878" },
    { y: 0.12, h: 0.08, color: "#7A5030" },
    { y: 0.2, h: 0.1, color: "#D4B888" },
    { y: 0.3, h: 0.06, color: "#986040" },
    { y: 0.36, h: 0.12, color: "#C8A870" },
    { y: 0.48, h: 0.07, color: "#7A4828" },
    { y: 0.55, h: 0.1, color: "#D0AC78" },
    { y: 0.65, h: 0.08, color: "#906040" },
    { y: 0.73, h: 0.12, color: "#C4A060" },
    { y: 0.85, h: 0.15, color: "#AA8848" },
  ];
  return (
    <div className="relative shrink-0 rounded-full overflow-hidden" style={{ width: size, height: size,
      background: "radial-gradient(circle at 42% 40%, #E8C890 0%, #C4A060 100%)" }}>
      {/* Bands */}
      {bands.map((b, i) => (
        <div key={i} className="absolute left-0 right-0" style={{
          top: `${b.y * 100}%`,
          height: `${b.h * 100}%`,
          background: b.color,
          opacity: 0.75,
          filter: "url(#band-warp)",
        }} />
      ))}
      {/* Great Red Spot */}
      <div className="absolute" style={{
        width: size * 0.24, height: size * 0.16,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, #C84028 0%, #A03018 60%, transparent 100%)",
        top: "52%", left: "22%",
      }} />
      {/* Highlight */}
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle at 28% 24%, rgba(255,245,220,0.45) 0%, transparent 42%)",
      }} />
    </div>
  );
}

function Saturn({ size }: { size: number }) {
  const ringW = size * 2.4;
  const ringH = size * 0.5;
  return (
    <div className="relative flex items-center justify-center shrink-0"
      style={{ width: size * 2.6, height: size * 1.5 }}>
      {/* Ring behind planet */}
      <svg className="absolute" style={{ width: ringW, height: ringH, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        viewBox={`0 0 ${ringW} ${ringH}`}>
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="12%" stopColor="rgba(180,150,80,0.3)" />
            <stop offset="22%" stopColor="rgba(210,180,100,0.7)" />
            <stop offset="35%" stopColor="rgba(230,200,120,0.85)" />
            <stop offset="50%" stopColor="rgba(200,170,90,0.6)" />
            <stop offset="65%" stopColor="rgba(230,200,120,0.85)" />
            <stop offset="78%" stopColor="rgba(210,180,100,0.7)" />
            <stop offset="88%" stopColor="rgba(180,150,80,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <ellipse cx={ringW/2} cy={ringH/2} rx={ringW/2 * 0.98} ry={ringH/2 * 0.85}
          fill="none" stroke="url(#ring-grad)" strokeWidth={ringH * 0.35} />
        <ellipse cx={ringW/2} cy={ringH/2} rx={ringW/2 * 0.7} ry={ringH/2 * 0.55}
          fill="none" stroke="rgba(160,130,60,0.25)" strokeWidth={ringH * 0.08} />
      </svg>
      {/* Planet */}
      <div className="relative rounded-full shrink-0 overflow-hidden" style={{ width: size, height: size, zIndex: 2 }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(circle at 38% 34%, #F8E8B0 0%, #DCC878 32%, #C0A850 62%, #A08830 82%, #806810 100%)",
        }} />
        {/* Subtle bands */}
        {[0.3, 0.5, 0.68].map((y, i) => (
          <div key={i} className="absolute left-0 right-0" style={{
            top: `${y * 100}%`, height: "8%",
            background: i % 2 === 0 ? "rgba(160,120,40,0.3)" : "rgba(240,210,140,0.2)",
          }} />
        ))}
        <div className="absolute inset-0 rounded-full" style={{
          background: "radial-gradient(circle at 32% 28%, rgba(255,250,220,0.55) 0%, transparent 44%)",
        }} />
      </div>
      {/* Ring front (over planet) */}
      <svg className="absolute" style={{ width: ringW, height: ringH * 0.55, bottom: "10%", left: "50%", transform: "translateX(-50%)", zIndex: 3 }}
        viewBox={`0 0 ${ringW} ${ringH * 0.55}`}>
        <ellipse cx={ringW/2} cy={ringH*0.28} rx={ringW/2 * 0.98} ry={ringH/2 * 0.45}
          fill="none" stroke="url(#ring-grad)" strokeWidth={ringH * 0.32} />
      </svg>
    </div>
  );
}

function Uranus({ size }: { size: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle, rgba(100,220,230,0.4) 0%, transparent 65%)",
        transform: "scale(1.2)",
        filter: "blur(5px)",
      }} />
      <div className="rounded-full absolute inset-0 overflow-hidden" style={{
        background: "radial-gradient(circle at 38% 34%, #C0F4F8 0%, #68D0E0 35%, #28A0C0 65%, #0870A0 88%, #044C78 100%)",
      }}>
        {/* Subtle atmospheric bands */}
        {[0.35, 0.55, 0.7].map((y, i) => (
          <div key={i} className="absolute left-0 right-0" style={{
            top: `${y * 100}%`, height: "8%",
            background: "rgba(80,200,220,0.2)",
          }} />
        ))}
      </div>
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle at 30% 26%, rgba(220,255,255,0.55) 0%, transparent 42%)",
      }} />
    </div>
  );
}

function Neptune({ size }: { size: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle, rgba(40,80,220,0.45) 0%, transparent 65%)",
        transform: "scale(1.22)",
        filter: "blur(6px)",
      }} />
      <div className="rounded-full absolute inset-0 overflow-hidden" style={{
        background: "radial-gradient(circle at 36% 32%, #6090F8 0%, #2858D0 35%, #0A30A8 65%, #040E70 90%, #020850 100%)",
      }}>
        {/* Great Dark Spot */}
        <div className="absolute" style={{
          width: size * 0.22, height: size * 0.14,
          borderRadius: "50%",
          background: "rgba(0,4,40,0.7)",
          top: "38%", left: "30%",
        }} />
        {/* Storm bands */}
        {[0.6, 0.75].map((y, i) => (
          <div key={i} className="absolute left-0 right-0" style={{
            top: `${y * 100}%`, height: "5%",
            background: "rgba(100,150,255,0.25)",
          }} />
        ))}
      </div>
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle at 30% 26%, rgba(180,210,255,0.5) 0%, transparent 40%)",
      }} />
    </div>
  );
}

function Pluto({ size }: { size: number }) {
  return (
    <div className="relative shrink-0 rounded-full overflow-hidden" style={{ width: size, height: size }}>
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 36% 32%, #D0B898 0%, #A89070 38%, #806850 68%, #503828 90%, #301808 100%)",
        filter: `url(#${FILTER_ID})`,
      }} />
      {/* Tombaugh Regio (heart) */}
      <div className="absolute" style={{
        width: size * 0.38, height: size * 0.32,
        top: "35%", left: "28%",
        background: "radial-gradient(ellipse, rgba(220,200,180,0.7) 0%, transparent 70%)",
        filter: "blur(2px)",
      }} />
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle at 32% 28%, rgba(255,240,220,0.4) 0%, transparent 40%)",
      }} />
    </div>
  );
}

const COMPONENTS: Record<Planet, React.ComponentType<{ size: number }>> = {
  sun: Sun, moon: Moon, mercury: Mercury, venus: Venus, mars: Mars,
  jupiter: Jupiter, saturn: Saturn, uranus: Uranus, neptune: Neptune, pluto: Pluto,
};

export default function PlanetVisual({ planet, size = 72 }: { planet: Planet; size?: number }) {
  const Component = COMPONENTS[planet];
  return (
    <>
      <PlanetFilters />
      <Component size={size} />
    </>
  );
}
