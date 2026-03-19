import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "四柱推命",
  description: "年・月・日・時の四柱から命式を読み解く中国占術。十干十二支と五行で、あなたの先天的な資質と人生の流れを知る。",
};

const subPages = [
  {
    href: "/shichusuimei/pillars",
    title: "年柱・月柱・日柱・時柱",
    titleEn: "Four Pillars",
    desc: "四柱推命の根幹となる四つの柱。年・月・日・時それぞれが何を表し、どう読み解くか。「日柱（日主）」があなたの本質を表すコアになる。",
  },
  {
    href: "/shichusuimei/stars",
    title: "十干・十二支と星の意味",
    titleEn: "Stems, Branches & Stars",
    desc: "甲・乙・丙…の十干と、子・丑・寅…の十二支。五行との関係性、星（通変星）の意味、組み合わせによる命式の読み方。",
  },
];

export default function ShichusuimeiPage() {
  return (
    <>
      <div className="border-b border-[#EAE4DC]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.3em] text-[#8A7E75] mb-4 uppercase">02 — Four Pillars of Destiny</p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-[#1A1714] mb-6">
            四柱推命
          </h1>
          <p className="text-sm text-[#3D3630] leading-loose tracking-wider max-w-lg">
            中国数千年の歴史を持つ命理学。生まれた年・月・日・時刻の四つの柱と、
            十干・十二支・五行の組み合わせから命式を読み解く。
            運命を「当てる」のではなく、先天的な資質と後天的な流れを「知る」ための体系。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Overview */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-display italic text-[#C4926A] text-lg mb-4">overview</p>
              <h2 className="font-display text-4xl font-light mb-6">四柱推命とは</h2>
              <p className="text-sm text-[#3D3630] leading-loose tracking-wider mb-4">
                四柱推命（しちゅうすいめい）とは、生年月日時を「年柱・月柱・日柱・時柱」の四つの柱に変換し、
                それぞれに十干（甲乙丙丁…）と十二支（子丑寅卯…）を配置して命式を作る占術。
                この命式は「その人という木（日主）が、どんな環境（季節・気候）に生まれたか」を示す地図だ。
              </p>
              <p className="text-sm text-[#3D3630] leading-loose tracking-wider mb-4">
                四柱推命の特徴は、その人の「気質・資質・弱点・才能」という先天的な要素と、
                「大運・流年」という時間の流れ（後天的な運気）を同時に読める点にある。
                西洋占星術が空間（惑星配置）を重視するのに対し、四柱推命は時間（生まれた時刻）を起点にする。
              </p>
              <p className="text-sm text-[#3D3630] leading-loose tracking-wider">
                なお「時柱」は正確な出生時刻が必要になるため、時刻が不明な場合は年・月・日の三柱で読むこともある。
              </p>
            </div>
            <div className="bg-[#1A1714] text-[#F5F1EA] p-8">
              <p className="text-xs tracking-[0.2em] text-[#C4926A] mb-6 uppercase">Five Elements — 五行</p>
              <div className="space-y-4">
                {[
                  { element: "木 (Wood)", trait: "成長・柔軟・上昇志向", season: "春", color: "緑" },
                  { element: "火 (Fire)", trait: "情熱・表現・直感", season: "夏", color: "赤" },
                  { element: "土 (Earth)", trait: "安定・実直・調和", season: "土用", color: "黄" },
                  { element: "金 (Metal)", trait: "厳格・決断・鋭さ", season: "秋", color: "白" },
                  { element: "水 (Water)", trait: "智慧・流動・深み", season: "冬", color: "黒" },
                ].map((item) => (
                  <div key={item.element} className="flex gap-4 items-baseline border-b border-[#333] pb-4 last:border-0 last:pb-0">
                    <span className="font-display text-[#C4926A] text-lg w-28 shrink-0">{item.element}</span>
                    <span className="text-xs text-[#8A7E75] tracking-wider">{item.trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What you can know */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-10">
            <div className="flex-1 h-px bg-[#EAE4DC]" />
            <span className="font-display italic text-[#C4926A] text-sm">what you can know</span>
            <div className="flex-1 h-px bg-[#EAE4DC]" />
          </div>
          <h2 className="font-display text-4xl font-light mb-10 text-center">四柱推命で分かること</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAE4DC]">
            {[
              {
                title: "先天的な気質",
                desc: "日主（日柱の天干）があなたの本質を表す。木・火・土・金・水のどの性質が強いかで、思考の癖・感情の動き・人間関係のスタイルが分かる。",
              },
              {
                title: "才能と適性",
                desc: "命式中の通変星（食神・傷官・財星・官星・印星など）のバランスから、どの分野で力を発揮しやすいかが見える。表現・管理・創造・奉仕…それぞれに対応する星がある。",
              },
              {
                title: "人生の大きな流れ",
                desc: "10年ごとに変わる「大運」と年ごとの「流年」が、いつ追い風が吹き、いつ内側を固める時期かを示す。時代を読んで動くための羅針盤になる。",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#F5F1EA] p-8">
                <h3 className="font-display text-xl font-light mb-4 text-[#8B5E3C]">{item.title}</h3>
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
                className="group bg-[#F5F1EA] p-8 hover:bg-[#EAE4DC] transition-colors duration-300 block"
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
