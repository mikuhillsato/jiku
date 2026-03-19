import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "西洋占星術",
  description:
    "惑星・ハウス・アセンダントから読み解く、西洋占星術の基礎と実践。",
};

const subPages = [
  {
    href: "/astrology/planets",
    title: "惑星の意味",
    titleEn: "Planets",
    desc: "太陽・月・水星・金星・火星・木星・土星・天王星・海王星・冥王星。10天体それぞれが象徴するテーマと、あなたのチャートでの読み方。",
  },
  {
    href: "/astrology/houses",
    title: "ハウスの意味",
    titleEn: "Houses",
    desc: "第1室から第12室まで、人生の12の領域。仕事・お金・人間関係・精神性——それぞれのハウスに惑星が入ることの意味。",
  },
];

export default function AstrologyPage() {
  return (
    <>
      {/* Page header */}
      <div className="border-b border-[#EAE4DC]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.3em] text-[#8A7E75] mb-4 uppercase">01 — Western Astrology</p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-[#1A1714] mb-6">
            西洋占星術
          </h1>
          <p className="text-sm text-[#3D3630] leading-loose tracking-wider max-w-lg">
            紀元前から続く西洋占星術は、惑星の位置と運動をもとに人間の心理・才能・運命のパターンを読み解く体系。
            「生まれた瞬間の空の配置」は、あなたという人間の設計図だ。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* What is Western Astrology */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-display italic text-[#C4926A] text-lg mb-4">overview</p>
              <h2 className="font-display text-4xl font-light mb-6">占星術とは何か</h2>
              <p className="text-sm text-[#3D3630] leading-loose tracking-wider mb-4">
                西洋占星術では、生まれた日時・場所をもとに「ホロスコープ（出生図）」を作成する。
                ホロスコープとは、生まれた瞬間の惑星配置を円形の図に落とし込んだもの。
                太陽・月を含む10天体が、12星座のどこに位置し、12ハウスのどこに入っているかを読むことで、
                その人の本質・思考パターン・感情の動き・才能・課題が浮かび上がる。
              </p>
              <p className="text-sm text-[#3D3630] leading-loose tracking-wider">
                重要なのは「当たる・当たらない」ではなく、自分の傾向を客観視するツールとして使うこと。
                自分の強みと弱みを知ることで、より意識的な選択ができるようになる。
              </p>
            </div>
            <div className="bg-[#EAE4DC] p-8">
              <p className="text-xs tracking-[0.2em] text-[#8A7E75] mb-6 uppercase">Key Elements</p>
              <ul className="space-y-4">
                {[
                  { term: "惑星", desc: "何を（テーマ・欲求）" },
                  { term: "星座", desc: "どのように（スタイル・質）" },
                  { term: "ハウス", desc: "人生のどの領域で（場所）" },
                  { term: "アスペクト", desc: "惑星同士の角度関係（調和・緊張）" },
                  { term: "アセンダント", desc: "外側への見せ方・入り口（上昇宮）" },
                ].map((item) => (
                  <li key={item.term} className="flex gap-4 items-baseline">
                    <span className="font-display text-[#8B5E3C] text-lg font-light w-28 shrink-0">
                      {item.term}
                    </span>
                    <span className="text-xs text-[#8A7E75] tracking-wider">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Three main axes */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-10">
            <div className="flex-1 h-px bg-[#EAE4DC]" />
            <span className="font-display italic text-[#C4926A] text-sm">three luminaries</span>
            <div className="flex-1 h-px bg-[#EAE4DC]" />
          </div>

          <h2 className="font-display text-4xl font-light mb-10 text-center">
            読み解きの三本軸
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAE4DC]">
            {[
              {
                symbol: "☉",
                name: "太陽星座",
                en: "Sun Sign",
                desc: "意識的な自己・人生のテーマ・外の世界で表現したい自分。「私はこうありたい」という核心。",
              },
              {
                symbol: "☽",
                name: "月星座",
                en: "Moon Sign",
                desc: "感情・本能・内なる自己・安心できる場所。意識せずとも自然に出る反応パターン。",
              },
              {
                symbol: "AC",
                name: "アセンダント",
                en: "Ascendant",
                desc: "他者への第一印象・人生への入り口・外に見せるペルソナ。「あなたはこう見える」。",
              },
            ].map((item) => (
              <div key={item.name} className="bg-[#EFF0EB] p-8 text-center">
                <p className="font-display text-5xl text-[#C4926A] mb-4">{item.symbol}</p>
                <p className="text-xs tracking-[0.2em] text-[#8A7E75] mb-1 uppercase">{item.en}</p>
                <h3 className="font-display text-2xl font-light mb-4">{item.name}</h3>
                <p className="text-sm text-[#3D3630] leading-loose tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sub-pages */}
        <section>
          <h2 className="font-display text-3xl font-light mb-8">さらに深く学ぶ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EAE4DC]">
            {subPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group bg-[#EFF0EB] p-8 hover:bg-[#EAE4DC] transition-colors duration-300 block"
              >
                <p className="text-xs tracking-[0.2em] text-[#8A7E75] mb-2 uppercase">{page.titleEn}</p>
                <h3 className="font-display text-2xl font-light mb-3 group-hover:text-[#8B5E3C] transition-colors">
                  {page.title} <span className="text-[#C4926A]">→</span>
                </h3>
                <p className="text-sm text-[#3D3630] leading-loose tracking-wider">{page.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
