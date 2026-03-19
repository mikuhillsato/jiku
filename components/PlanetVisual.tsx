type Planet = "sun" | "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune" | "pluto";

const configs: Record<Planet, { bg: string; glow?: string; bands?: boolean; rings?: boolean }> = {
  sun: {
    bg: "radial-gradient(circle at 38% 35%, #FFF8C0, #FFD700 28%, #FF8C00 62%, #C04000)",
    glow: "0 0 24px rgba(255,200,0,0.7), 0 0 48px rgba(255,130,0,0.35)",
  },
  moon: {
    bg: "radial-gradient(circle at 38% 35%, #E8E4D8 0%, #C8C4B0 45%, #A8A498 75%, #888478 100%)",
  },
  mercury: {
    bg: "radial-gradient(circle at 38% 35%, #C8B8A8, #A89888 45%, #887868 75%, #685848)",
  },
  venus: {
    bg: "radial-gradient(circle at 45% 38%, #FFFCE0, #F8E8A0 32%, #D4C060 65%, #A89030)",
    glow: "0 0 16px rgba(240,210,60,0.3)",
  },
  mars: {
    bg: "radial-gradient(circle at 38% 35%, #E87058, #C84830 45%, #A03018 75%, #801808)",
    glow: "0 0 12px rgba(200,70,40,0.3)",
  },
  jupiter: {
    bg: "radial-gradient(circle at 50% 50%, #E8C890 0%, #D4A868 100%)",
    bands: true,
  },
  saturn: {
    bg: "radial-gradient(circle at 40% 35%, #F0DCA0, #D8C080 40%, #C0A060 70%, #A88040)",
    rings: true,
    glow: "0 0 12px rgba(200,170,80,0.2)",
  },
  uranus: {
    bg: "radial-gradient(circle at 40% 38%, #B8F4F4, #78D8E8 40%, #38A8C8 70%, #1880A0)",
    glow: "0 0 12px rgba(80,200,220,0.25)",
  },
  neptune: {
    bg: "radial-gradient(circle at 38% 35%, #5878F0, #2848C8 45%, #0820A0 75%, #040C70)",
    glow: "0 0 14px rgba(60,90,210,0.3)",
  },
  pluto: {
    bg: "radial-gradient(circle at 42% 38%, #C8B098, #A89080 45%, #887060 75%, #685040)",
  },
};

// Jupiter bands overlay
const jupiterBands = [
  "rgba(160,110,60,0.5)",
  "rgba(220,170,100,0.3)",
  "rgba(150,100,50,0.6)",
  "rgba(200,150,80,0.3)",
  "rgba(170,120,60,0.5)",
  "rgba(230,180,110,0.25)",
];

export default function PlanetVisual({ planet, size = 72 }: { planet: Planet; size?: number }) {
  const cfg = configs[planet];

  if (planet === "saturn") {
    const ringW = size * 2.2;
    const ringH = size * 0.45;
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size * 2.4, height: size * 1.6 }}
      >
        {/* Ring behind */}
        <div
          className="absolute"
          style={{
            width: ringW,
            height: ringH,
            border: `${size * 0.06}px solid rgba(200,170,90,0.55)`,
            borderRadius: "50%",
            transform: "rotateX(68deg)",
            zIndex: 0,
            boxShadow: "0 0 8px rgba(200,170,80,0.2)",
          }}
        />
        {/* Planet */}
        <div
          className="relative z-10 rounded-full shrink-0"
          style={{
            width: size,
            height: size,
            background: cfg.bg,
            boxShadow: cfg.glow,
          }}
        />
      </div>
    );
  }

  if (planet === "jupiter") {
    const bandHeight = size / jupiterBands.length;
    return (
      <div
        className="rounded-full overflow-hidden shrink-0"
        style={{
          width: size,
          height: size,
          background: cfg.bg,
          boxShadow: cfg.glow,
          position: "relative",
        }}
      >
        {jupiterBands.map((color, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: i * bandHeight,
              height: bandHeight,
              background: color,
            }}
          />
        ))}
        {/* Great Red Spot */}
        <div
          style={{
            position: "absolute",
            width: size * 0.22,
            height: size * 0.14,
            borderRadius: "50%",
            background: "rgba(180,60,40,0.7)",
            top: "55%",
            left: "25%",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background: cfg.bg,
        boxShadow: cfg.glow,
      }}
    />
  );
}
