import type { Metadata } from "next";
import Link from "next/link";
import AstrologySim from "@/components/AstrologySim";

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
  {
    href: "/astrology/signs",
    title: "12星座の意味",
    titleEn: "Signs",
    desc: "牡羊座から魚座まで、12星座それぞれの気質・テーマ・エレメントを解説。太陽星座を軸に、あなたの本質を読み解く入口。",
  },
];

export default function AstrologyPage() {
  return (
    <>
      {/* Page header */}
      <div className="grid border-b border-[#111111]" style={{ gridTemplateColumns: "52px 1fr" }}>
        <div className="border-r border-[#E0DDD6] flex items-center justify-center bg-[#F4F4F2]">
          <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#BBB", whiteSpace: "nowrap" }}>
            Western Astrology — MyJiku
          </span>
        </div>
        <div className="px-4 md:px-12 py-8 md:py-16">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#888888] mb-5">01 — Western Astrology</p>
          <h1 className="font-display font-light leading-[0.95]" style={{ fontSize: "clamp(44px,5.5vw,76px)" }}>
            西洋占星術
          </h1>
          <p className="text-sm text-[#555555] leading-loose tracking-wider max-w-lg mt-6">
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
              <p className="font-display italic text-[#888888] text-lg mb-4">overview</p>
              <h2 className="font-display text-4xl font-light mb-6">占星術とは何か</h2>
              <p className="text-sm text-[#555555] leading-loose tracking-wider mb-4">
                西洋占星術では、生まれた日時・場所をもとに「ホロスコープ（出生図）」を作成する。
                ホロスコープとは、生まれた瞬間の惑星配置を円形の図に落とし込んだもの。
                太陽・月を含む10天体が、12星座のどこに位置し、12ハウスのどこに入っているかを読むことで、
                その人の本質・思考パターン・感情の動き・才能・課題が浮かび上がる。
              </p>
              <p className="text-sm text-[#555555] leading-loose tracking-wider">
                重要なのは「当たる・当たらない」ではなく、自分の傾向を客観視するツールとして使うこと。
                自分の強みと弱みを知ることで、より意識的な選択ができるようになる。
              </p>
            </div>
            <div className="bg-[#EAEAE6] p-8">
              <p className="text-xs tracking-[0.2em] text-[#888888] mb-6 uppercase">Key Elements</p>
              <ul className="space-y-4">
                {[
                  { term: "惑星", desc: "何を（テーマ・欲求）" },
                  { term: "星座", desc: "どのように（スタイル・質）" },
                  { term: "ハウス", desc: "人生のどの領域で（場所）" },
                  { term: "アスペクト", desc: "惑星同士の角度関係（調和・緊張）" },
                  { term: "アセンダント", desc: "外側への見せ方・入り口（上昇宮）" },
                ].map((item) => (
                  <li key={item.term} className="flex gap-4 items-baseline">
                    <span className="font-display text-[#111111] text-lg font-light w-28 shrink-0">
                      {item.term}
                    </span>
                    <span className="text-xs text-[#888888] tracking-wider">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Three main axes */}
        <section className="mb-20">
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-10">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">three luminaries</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
          </div>

          <h2 className="font-display text-4xl font-light mb-10 text-center">
            読み解きの三本軸
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAEAE6]">
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
              <div key={item.name} className="bg-[#F4F4F2] p-8 text-center">
                <p className="font-display text-5xl text-[#888888] mb-4">{item.symbol}</p>
                <p className="text-xs tracking-[0.2em] text-[#888888] mb-1 uppercase">{item.en}</p>
                <h3 className="font-display text-2xl font-light mb-4">{item.name}</h3>
                <p className="text-sm text-[#555555] leading-loose tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DSC & MC */}
        <section className="mb-20">
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-10">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">angles</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
          </div>

          <h2 className="font-display text-4xl font-light mb-4 text-center">
            もう二つのアングル
          </h2>
          <p className="text-sm text-[#888888] text-center mb-10 tracking-wider">
            アセンダント（AC）と対をなす二つの軸。チャート読みの解像度を上げる。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EAEAE6]">
            {[
              {
                symbol: "DC",
                name: "ディセンダント",
                en: "Descendant",
                desc: "ACの真向かい、第7ハウスのカスプ。「自分と対になる他者」を示す軸。パートナーシップ・結婚・重要な他者に求めるものを表す。自分の中で意識しにくい資質を、他者の中に見出す傾向がある。",
              },
              {
                symbol: "MC",
                name: "MC（天頂）",
                en: "Midheaven",
                desc: "第10ハウスのカスプ。社会的な方向性・キャリア・公の自己像を示す軸。「世の中でどう生きるか」「何者として認識されたいか」という問いへの答え。人生の中盤以降に強く現れてくることが多い。",
              },
            ].map((item) => (
              <div key={item.name} className="bg-[#F4F4F2] p-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <p className="font-display text-4xl text-[#888888] font-light">{item.symbol}</p>
                  <div>
                    <p className="text-xs tracking-[0.2em] text-[#888888] uppercase">{item.en}</p>
                    <h3 className="font-display text-2xl font-light">{item.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-[#555555] leading-loose tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Simulation */}
        <section className="mb-12">
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-8">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">シミュレーション</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
            <span className="text-[8px] tracking-[0.3em] text-[#CCC] mr-5">Try it</span>
          </div>
          <AstrologySim />
        </section>

        {/* Sub-pages */}
        <section>
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-0">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">さらに深く学ぶ</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
          </div>
          <div>
            {subPages.map((page, i) => (
              <Link
                key={page.href}
                href={page.href}
                className="group grid border-b border-[#E8E8E4] hover:bg-[#F4F4F2] transition-colors last:border-b-0"
                style={{ gridTemplateColumns: "72px 220px 1fr" }}
              >
                <div className="border-r border-[#E8E8E4] flex items-start pt-6 pl-5">
                  <span className="font-display text-[12px] tracking-[0.15em] text-[#CCC]">0{i + 1} —</span>
                </div>
                <div className="border-r border-[#E8E8E4] flex flex-col justify-center px-6 py-6">
                  <p className="text-[8px] tracking-[0.35em] uppercase text-[#AAA] mb-1">{page.titleEn}</p>
                  <h3 className="font-display text-[20px] font-light group-hover:opacity-60 transition-opacity">{page.title} <span className="text-[#888]">→</span></h3>
                </div>
                <div className="flex items-center px-8 py-6">
                  <p className="text-[11px] leading-loose tracking-wider text-[#666666]">{page.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
