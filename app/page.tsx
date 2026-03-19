import Link from "next/link";

const systems = [
  {
    number: "01",
    title: "西洋占星術",
    titleEn: "Western Astrology",
    href: "/astrology",
    description:
      "惑星の動きと12のハウスが、あなたの本質・才能・対人関係のパターンを映し出す。生まれ持った資質を読み解き、自分らしい人生設計の地図を描く。",
    keywords: ["太陽・月・水星", "ハウス", "アセンダント"],
  },
  {
    number: "02",
    title: "四柱推命",
    titleEn: "Four Pillars of Destiny",
    href: "/shichusuimei",
    description:
      "生まれた年・月・日・時刻の四つの柱が、あなたの命式を構成する。中国数千年の叡智が紐解く、先天的な資質と後天的な流れ。",
    keywords: ["年柱・月柱・日柱", "十干十二支", "大運・流年"],
  },
  {
    number: "03",
    title: "数秘術",
    titleEn: "Numerology",
    href: "/numerology",
    description:
      "生年月日と名前を数字に還元し、あなたの人生のテーマと使命を読み解く。シンプルな数字の中に、驚くほど精緻な自己像が浮かび上がる。",
    keywords: ["ライフパスナンバー", "ソウルナンバー", "デスティニーナンバー"],
  },
  {
    number: "04",
    title: "算命学",
    titleEn: "Sanmeigaku",
    href: "/sanmeigaku",
    description:
      "中国古代の哲学を基盤とした占術。天干・地支の組み合わせから、先天的な気質と人生の大きな流れを立体的に読み解く日本独自の体系。",
    keywords: ["天干地支", "五行", "守護神"],
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.3em] text-[#8888AA] mb-6 uppercase">
            Self-knowledge × Divination
          </p>
          <h1 className="font-display text-6xl md:text-8xl font-light leading-none tracking-tight text-[#E8E5F5] mb-8">
            星と命式が、<br />
            <em className="not-italic text-[#8B7FCC]">羅針盤</em>になる。
          </h1>
          <p className="text-sm text-[#C0BDD4] leading-loose tracking-wider max-w-md">
            占術は未来を「当てる」ものではなく、自分を「知る」ツール。
            西洋占星術・四柱推命・数秘術・算命学の四つのレンズを通して、
            あなたの本質・才能・人生の流れを読み解く。
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/astrology"
              className="inline-block px-8 py-3 bg-[#0D1028] text-[#E8E5F5] text-xs tracking-[0.2em] hover:bg-[#6B5BAE] transition-colors duration-300"
            >
              探索する
            </Link>
            <Link
              href="#systems"
              className="inline-block px-8 py-3 border border-[#2A2F52] text-[#8888AA] text-xs tracking-[0.2em] hover:border-[#8B7FCC] hover:text-[#8B7FCC] transition-colors duration-300"
            >
              占術を選ぶ
            </Link>
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-20 flex items-center gap-6">
          <div className="flex-1 h-px bg-[#1A1F35]" />
          <span className="font-display italic text-[#B8AEED] text-sm">four systems</span>
          <div className="w-12 h-px bg-[#1A1F35]" />
        </div>
      </section>

      {/* Systems Grid */}
      <section id="systems" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1A1F35]">
          {systems.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-[#0E1020] p-10 hover:bg-[#1A1F35] transition-colors duration-300 block"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-display text-5xl text-[#303860] group-hover:text-[#B8AEED] transition-colors duration-300 font-light">
                  {s.number}
                </span>
                <span className="text-xs text-[#8888AA] tracking-widest mt-2 group-hover:text-[#8B7FCC] transition-colors">
                  →
                </span>
              </div>
              <p className="text-xs tracking-[0.2em] text-[#8888AA] mb-2 uppercase">{s.titleEn}</p>
              <h2 className="font-display text-3xl font-light mb-4 text-[#E8E5F5] group-hover:text-[#8B7FCC] transition-colors duration-300">
                {s.title}
              </h2>
              <p className="text-xs text-[#8888AA] leading-relaxed tracking-wider mb-6">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.keywords.map((k) => (
                  <span
                    key={k}
                    className="text-xs border border-[#2A2F52] text-[#8888AA] px-3 py-1 tracking-wider"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy section */}
      <section className="bg-[#0D1028] text-[#E8E5F5] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="font-display italic text-[#B8AEED] text-lg mb-6">philosophy</p>
            <h3 className="font-display text-4xl font-light leading-snug mb-8">
              「知ること」は、<br />
              「選ぶこと」の始まり。
            </h3>
            <p className="text-sm text-[#8888AA] leading-loose tracking-wider">
              自分の先天的な資質を知れば、強みを活かした選択ができる。
              人生の流れを読めば、焦らず自分のタイミングで動ける。
              占術は、自分の人生を自分で設計するための地図だ。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
