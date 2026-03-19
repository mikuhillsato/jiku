type SignName = "牡羊座"|"牡牛座"|"双子座"|"蟹座"|"獅子座"|"乙女座"|
               "天秤座"|"蠍座"|"射手座"|"山羊座"|"水瓶座"|"魚座";

const GLYPHS: Record<SignName, React.ReactNode> = {
  "牡羊座": (
    // Two arcs (ram horns) meeting at center-bottom
    <path d="M 18 28 C 7 28 5 11 16 7 M 18 28 C 29 28 31 11 20 7" />
  ),
  "牡牛座": (
    // Circle at bottom, open arc (horns) on top
    <>
      <circle cx="18" cy="25" r="7" />
      <path d="M 11 19 C 11 9 25 9 25 19" />
    </>
  ),
  "双子座": (
    // Double vertical lines with horizontal bars (like Roman II)
    <path d="M 12 8 L 12 28 M 24 8 L 24 28 M 8 8 L 28 8 M 8 28 L 28 28" />
  ),
  "蟹座": (
    // Two interlocking crescent spirals (like 69 rotated)
    <>
      <path d="M 7 16 C 7 8 29 8 29 18 C 29 22 23 25 18 21" />
      <path d="M 29 20 C 29 28 7 28 7 18 C 7 14 13 11 18 15" />
      <circle cx="6.5" cy="18" r="2" />
      <circle cx="29.5" cy="18" r="2" />
    </>
  ),
  "獅子座": (
    // Circle with a curling tail extending right then spiraling
    <>
      <circle cx="14" cy="24" r="7" />
      <path d="M 21 24 C 29 24 33 17 30 11 C 28 7 22 9 21 15" />
    </>
  ),
  "乙女座": (
    // Three stems with two arches, last stem loops under
    <path d="
      M 5 8 L 5 28
      M 5 8 C 8 2 16 2 18 8
      M 18 8 L 18 28
      M 18 8 C 21 2 29 2 31 8
      M 31 8 L 31 26 C 31 34 21 34 19 26
    " />
  ),
  "天秤座": (
    // Horizon line with semicircle above (scales)
    <path d="M 4 26 L 32 26 M 8 26 C 8 14 28 14 28 26" />
  ),
  "蠍座": (
    // m-shape (3 stems, 2 arches) with an arrow at the end
    <path d="
      M 4 8 L 4 26
      M 4 16 C 8 22 14 22 18 16
      M 18 16 L 18 26
      M 18 16 C 22 22 28 22 30 16
      M 30 16 L 30 24
      M 26 28 L 30 24 L 34 28
    " />
  ),
  "射手座": (
    // Diagonal arrow pointing upper-right
    <path d="M 6 30 L 28 10 M 20 10 L 28 10 L 28 18" />
  ),
  "山羊座": (
    // V-shape with a small loop on the right, then fish-tail curling right
    <path d="
      M 4 6 C 8 14 12 22 14 28 C 14 34 22 34 24 26
      C 26 20 28 12 24 7 C 22 3 17 5 19 10
      M 24 24 C 28 22 34 26 34 32
    " />
  ),
  "水瓶座": (
    // Two wavy horizontal lines
    <path d="
      M 4 13 C 8 9 12 17 16 13 C 20 9 24 17 28 13 C 30 11 32 12 32 13
      M 4 23 C 8 19 12 27 16 23 C 20 19 24 27 28 23 C 30 21 32 22 32 23
    " />
  ),
  "魚座": (
    // Two arcs facing outward, connected by horizontal bar
    <>
      <path d="M 16 4 C 5 4 5 14 5 18 C 5 22 5 32 16 32" />
      <path d="M 20 4 C 31 4 31 14 31 18 C 31 22 31 32 20 32" />
      <path d="M 4 18 L 32 18" />
    </>
  ),
};

interface Props {
  sign: SignName;
  size?: number;
  color?: string;
}

export default function ZodiacGlyph({ sign, size = 40, color = "#888888" }: Props) {
  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {GLYPHS[sign]}
    </svg>
  );
}
