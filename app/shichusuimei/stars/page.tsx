import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "十干・十二支と星の意味 | 四柱推命",
  description: "甲乙丙丁…の十干、子丑寅…の十二支、そして通変星（食神・傷官・財星・官星・印星）の意味と読み方。",
};

const stems = [
  { stem: "甲", reading: "きのえ", element: "木（陽）", nature: "大木。上昇志向・リーダーシップ・正義感。曲がることを嫌う剛直さ。" },
  { stem: "乙", reading: "きのと", element: "木（陰）", nature: "草花・蔓草。柔軟性・適応力・したたかな生命力。人の心を読む繊細さ。" },
  { stem: "丙", reading: "ひのえ", element: "火（陽）", nature: "太陽。明るさ・カリスマ・情熱。場を照らす力があるが、熱くなりすぎる傾向も。" },
  { stem: "丁", reading: "ひのと", element: "火（陰）", nature: "灯火・ろうそく。温かさ・繊細な美意識・集中力。小さくとも確かな光を灯す。" },
  { stem: "戊", reading: "つちのえ", element: "土（陽）", nature: "大山。どっしりとした包容力・安定・信頼感。揺るがない存在感と忍耐力。" },
  { stem: "己", reading: "つちのと", element: "土（陰）", nature: "田畑・大地。育てる力・現実的・地道な積み上げ。人を育て、場を整える。" },
  { stem: "庚", reading: "かのえ", element: "金（陽）", nature: "鋼・岩石。潔癖・決断力・意志の強さ。妥協を許さない鋭さと、変革への衝動。" },
  { stem: "辛", reading: "かのと", element: "金（陰）", nature: "宝石・刃。審美眼・繊細な感受性・プライドの高さ。磨かれてこそ輝く才能。" },
  { stem: "壬", reading: "みずのえ", element: "水（陽）", nature: "大海・大河。知性・包容力・自由への渇望。自在に流れ、深い智慧を蓄える。" },
  { stem: "癸", reading: "みずのと", element: "水（陰）", nature: "雨水・霧。直感・繊細さ・静かな観察眼。内側に深い世界を持ち、芸術性が高い。" },
];

const stars = [
  {
    name: "比肩",
    en: "Bi Jian",
    category: "比劫星",
    keyword: "自立・独立・競争",
    desc: "日主と同じ五行・同じ陰陽の星。独立心・自己主張・競争心を表す。比肩が強い命式は自立型で、起業家・フリーランス・リーダーに向く。ただし協調性が課題になることも。",
  },
  {
    name: "劫財",
    en: "Jie Cai",
    category: "比劫星",
    keyword: "勝負・義侠心・引力",
    desc: "日主と同じ五行・異なる陰陽の星。勝負事・義侠心・人を惹きつける魅力を表す。比肩より社交的だが、散財や依存関係に注意が必要な面も。",
  },
  {
    name: "食神",
    en: "Shi Shen",
    category: "食傷星",
    keyword: "表現・創造・豊かさ",
    desc: "日主が生じる五行・同じ陰陽の星。豊かな表現力・創造性・楽しむ能力を表す。「自分を楽しんで生きる」エネルギー。アーティスト・料理家・コンテンツクリエイターとの相性◎。",
  },
  {
    name: "傷官",
    en: "Shang Guan",
    category: "食傷星",
    keyword: "才能・反骨・鋭さ",
    desc: "日主が生じる五行・異なる陰陽の星。突出した才能と鋭い感性を持つが、権威や既存の枠に反発しやすい。傷官が強い命式は「型破りな天才」タイプが多い。",
  },
  {
    name: "偏財",
    en: "Pian Cai",
    category: "財星",
    keyword: "行動力・交際・流動する富",
    desc: "日主が剋す五行・同じ陰陽の星。社交的・行動力・外の世界との取引を表す。父親との関係や、ビジネス上の財を表すことも。営業・投資・対外的な仕事との親和性が高い。",
  },
  {
    name: "正財",
    en: "Zheng Cai",
    category: "財星",
    keyword: "堅実・誠実・安定した富",
    desc: "日主が剋す五行・異なる陰陽の星。誠実さ・堅実さ・コツコツと積み上げる財を表す。約束を守り、長期的な信頼で財を築く。銀行・会計・管理職との相性◎。",
  },
  {
    name: "偏官",
    en: "Pian Guan",
    category: "官星",
    keyword: "行動・リスク・突破力",
    desc: "日主を剋す五行・同じ陰陽の星（七殺とも呼ばれる）。リスクを恐れず突破する行動力・プレッシャーの中で輝く力を表す。軍人・経営者・スポーツ選手タイプ。",
  },
  {
    name: "正官",
    en: "Zheng Guan",
    category: "官星",
    keyword: "規律・責任・社会的評価",
    desc: "日主を剋す五行・異なる陰陽の星。社会的なルール・責任感・評判・名誉を表す。組織の中で評価を積み上げるタイプ。公務員・管理職・法律家との相性◎。",
  },
  {
    name: "偏印",
    en: "Pian Yin",
    category: "印星",
    keyword: "直感・独自性・探究心",
    desc: "日主を生じる五行・同じ陰陽の星（梟神とも）。独自の発想・直感・スピリチュアルな知性を表す。型にはまらない学びや探究に向く。哲学者・研究者・スピリチュアルワーカータイプ。",
  },
  {
    name: "正印",
    en: "Zheng Yin",
    category: "印星",
    keyword: "知性・母性・保護",
    desc: "日主を生じる五行・異なる陰陽の星。知識・学習能力・保護する力・母親との関係を表す。正印が強い命式は勉強家で知的な権威を持ちやすい。教育・医療・学術との親和性が高い。",
  },
];

const categories = [
  { name: "比劫星（ひごうせい）", stars: ["比肩", "劫財"], desc: "日主自身と同類の星。自立・競争・仲間" },
  { name: "食傷星（しょくしょうせい）", stars: ["食神", "傷官"], desc: "日主のエネルギーを放出する星。表現・才能・出力" },
  { name: "財星（ざいせい）", stars: ["偏財", "正財"], desc: "日主が剋する星。お金・父親・仕事の成果" },
  { name: "官星（かんせい）", stars: ["偏官", "正官"], desc: "日主を剋する星。社会・規律・評価・配偶者" },
  { name: "印星（いんせい）", stars: ["偏印", "正印"], desc: "日主を生じる星。知識・保護・母親・精神的支柱" },
];

export default function StarsPage() {
  return (
    <>
      <div className="grid border-b border-[#111111]" style={{ gridTemplateColumns: "52px 1fr" }}>
        <div className="border-r border-[#E0DDD6] flex items-center justify-center bg-[#F4F4F2]">
          <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#BBB", whiteSpace: "nowrap" }}>
            Stems & Stars — Shichusuimei
          </span>
        </div>
        <div className="px-12 py-12">
          <div className="flex items-center gap-2 text-[8px] tracking-[0.3em] text-[#888888] mb-5 uppercase">
            <Link href="/shichusuimei" className="hover:text-[#111111] transition-colors">四柱推命</Link>
            <span>/</span>
            <span>十干・十二支と星の意味</span>
          </div>
          <h1 className="font-display font-light leading-[0.95]" style={{ fontSize: "clamp(36px,4.5vw,68px)" }}>
            十干・通変星
          </h1>
          <p className="text-sm text-[#555555] leading-loose tracking-wider max-w-lg mt-5">
            四柱推命の解読には、十干（天干）の性質と、
            日主との関係から生まれる「通変星（つうへんせい）」の理解が欠かせない。
            10の通変星が命式のどこにどのように現れるかで、才能・性格・仕事運が浮かび上がる。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Ten Stems */}
        <section className="mb-20">
          <h2 className="font-display text-4xl font-light mb-2">十干</h2>
          <p className="text-sm text-[#888888] mb-8 tracking-wider">Ten Heavenly Stems</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EAEAE6]">
            {stems.map((s) => (
              <div key={s.stem} className="bg-[#F4F4F2] p-6 flex gap-6">
                <div className="text-center shrink-0 w-16">
                  <p className="font-display text-4xl text-[#888888] font-light">{s.stem}</p>
                  <p className="text-xs text-[#888888] mt-1 tracking-wider">{s.reading}</p>
                </div>
                <div>
                  <p className="text-xs text-[#111111] tracking-wider mb-2">{s.element}</p>
                  <p className="text-sm text-[#555555] leading-loose tracking-wider">{s.nature}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Star categories overview */}
        <section className="mb-12">
          <div className="flex items-center gap-6 mb-10">
            <div className="flex-1 h-px bg-[#EAEAE6]" />
            <span className="font-display italic text-[#888888] text-sm">ten stars</span>
            <div className="flex-1 h-px bg-[#EAEAE6]" />
          </div>
          <h2 className="font-display text-4xl font-light mb-2">通変星（十神）</h2>
          <p className="text-sm text-[#888888] mb-8 tracking-wider">
            日主と他の天干との関係から生まれる10の星。命式中の星の構成で、才能・性格・運の傾向が分かる。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[#EAEAE6] mb-12">
            {categories.map((cat) => (
              <div key={cat.name} className="bg-[#F4F4F2] p-5 text-center">
                <p className="text-xs text-[#111111] tracking-wider mb-2">{cat.stars.join(" / ")}</p>
                <p className="font-display text-sm font-light leading-snug mb-2">{cat.name}</p>
                <p className="text-xs text-[#888888] tracking-wider">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Each star */}
        <section>
          <div className="space-y-px bg-[#EAEAE6]">
            {stars.map((star) => (
              <div key={star.name} className="bg-[#F4F4F2] p-8">
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6">
                  <div>
                    <p className="font-display text-3xl font-light text-[#111111] mb-1">{star.name}</p>
                    <p className="text-xs text-[#888888] tracking-wider mb-1">{star.en}</p>
                    <span className="inline-block text-xs border border-[#D0CCC4] text-[#888888] px-2 py-0.5 tracking-wider">
                      {star.category}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[#111111] tracking-wider mb-3">{star.keyword}</p>
                    <p className="text-sm text-[#555555] leading-loose tracking-wider">{star.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
