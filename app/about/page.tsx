import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "About | このサイトについて",
  description: "SEIUNのコンセプト・占術への向き合い方・このサイトが目指すもの。",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-[#EAE4DC]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <AnimateIn>
            <p className="text-xs tracking-[0.3em] text-[#8A7E75] mb-4 uppercase">About</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-[#1A1714] mb-6">
              占術は、<br />
              <em className="not-italic text-[#8B5E3C]">自己理解</em>のツール。
            </h1>
            <p className="text-sm text-[#3D3630] leading-loose tracking-wider max-w-lg">
              SEIUNは「占い好き」のためのサイトではない。
              自分の人生を自分で設計したい人のための、占術という名の地図帳だ。
            </p>
          </AnimateIn>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Concept */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <AnimateIn>
              <p className="font-display italic text-[#C4926A] text-lg mb-4">concept</p>
              <h2 className="font-display text-4xl font-light mb-6">このサイトのコンセプト</h2>
              <p className="text-sm text-[#3D3630] leading-loose tracking-wider mb-4">
                西洋占星術・四柱推命・数秘術・算命学——これらはどれも、何千年もかけて磨かれてきた
                「人間を読み解くフレームワーク」だ。
                未来を予言するものではなく、「自分という人間の傾向・強み・課題・流れ」を
                客観的に言語化する道具として使うとき、占術は最も力を発揮する。
              </p>
              <p className="text-sm text-[#3D3630] leading-loose tracking-wider mb-4">
                このサイトは、四つの占術を「自己理解とキャリア設計のツール」として使いたい人のために作った。
                「今年の運勢は？」ではなく「私はどんな人間で、どこへ向かうべきか？」という問いを持つ人のために。
              </p>
              <p className="text-sm text-[#3D3630] leading-loose tracking-wider">
                難解な専門用語を噛み砕きながら、でも本質は妥協せずに伝えること——それがSEIUNのスタンスだ。
              </p>
            </AnimateIn>

            <AnimateIn delay={150}>
              <div className="space-y-px bg-[#EAE4DC]">
                {[
                  {
                    q: "占いは「当たる・当たらない」で判断するもの？",
                    a: "違う。占術は「傾向とパターンを読む」フレームワーク。100%の予言ではなく、自分の行動と選択を照らす鏡として使うのが正しい向き合い方だ。",
                  },
                  {
                    q: "どの占術から始めればいい？",
                    a: "西洋占星術が最も情報が多く入りやすい。太陽・月・アセンダントの三つを知るだけでも、驚くほど自己理解が深まる。",
                  },
                  {
                    q: "複数の占術を組み合わせる意味は？",
                    a: "それぞれ異なる切り口で「あなた」を照らす。西洋占星術が心理的な地図なら、四柱推命は時間軸の地図。重なる部分が、その人の本質的なパターンだ。",
                  },
                ].map((item) => (
                  <div key={item.q} className="bg-[#EFF0EB] p-6">
                    <p className="text-xs text-[#8B5E3C] tracking-wider mb-2">Q. {item.q}</p>
                    <p className="text-sm text-[#3D3630] leading-loose tracking-wider">A. {item.a}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* For whom */}
        <section className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-[#EAE4DC]" />
            <span className="font-display italic text-[#C4926A] text-sm">for whom</span>
            <div className="flex-1 h-px bg-[#EAE4DC]" />
          </div>

          <AnimateIn>
            <h2 className="font-display text-4xl font-light mb-10 text-center">
              こんな人のためのサイト
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAE4DC]">
            {[
              {
                icon: "01",
                title: "自分の「強みの根拠」を言語化したい",
                desc: "なんとなく感じていた自分の得意・不得意を、占術というフレームで客観的に言葉にしたい人。",
              },
              {
                icon: "02",
                title: "人生の節目で立ち止まって考えたい",
                desc: "転職・独立・結婚・引越し——大きな選択の前に、自分の本質と今の流れを確認したい人。",
              },
              {
                icon: "03",
                title: "「自分らしいキャリア」を設計したい",
                desc: "他者の成功モデルではなく、自分の気質と才能に合ったキャリアの形を探している人。",
              },
            ].map((item) => (
              <AnimateIn key={item.icon} delay={parseInt(item.icon) * 100}>
                <div className="bg-[#EFF0EB] p-8 h-full">
                  <span className="font-display text-4xl text-[#D6C5B0] font-light block mb-4">
                    {item.icon}
                  </span>
                  <h3 className="font-display text-xl font-light mb-3 leading-snug">{item.title}</h3>
                  <p className="text-sm text-[#3D3630] leading-loose tracking-wider">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section>
          <AnimateIn>
            <div className="bg-[#1A1714] text-[#EFF0EB] p-12 md:p-16">
              <p className="font-display italic text-[#C4926A] text-lg mb-6">vision</p>
              <h2 className="font-display text-4xl font-light leading-snug mb-8">
                占術を「ライフデザイン」の<br />
                一部にする。
              </h2>
              <p className="text-sm text-[#8A7E75] leading-loose tracking-wider mb-6 max-w-lg">
                SEIUNは、占術の解説サイトとして始まったが、目指すのはその先にある。
                自分の命式・ナンバー・ホロスコープを「知る」だけでなく、
                それをキャリア設計・人間関係・ライフプランニングに活かす——
                そのための伴走ができるサービスを育てていく予定だ。
              </p>
              <p className="text-sm text-[#8A7E75] leading-loose tracking-wider max-w-lg">
                まずは四つの占術を深く学び、自分という存在を解像度高く知ること。
                それが、すべての出発点になる。
              </p>
              <div className="mt-10 pt-10 border-t border-[#2A2520]">
                <p className="font-display italic text-[#C4926A]">Know yourself. Design your life.</p>
              </div>
            </div>
          </AnimateIn>
        </section>
      </div>
    </>
  );
}
