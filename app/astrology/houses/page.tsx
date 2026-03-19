import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ハウスの意味 | 西洋占星術",
  description: "第1室から第12室まで、人生の12領域を解説。どのハウスに惑星が入るかで、その人生テーマへの関わり方が変わる。",
};

const houses = [
  {
    number: "I",
    name: "第1ハウス",
    en: "House of Self",
    keyword: "自己・外見・入り口",
    desc: "アセンダント（上昇宮）が位置するハウス。外の世界への出方・第一印象・身体的な外見・個性の入り口を表す。「あなたはどう見られているか」が映し出される場所。",
  },
  {
    number: "II",
    name: "第2ハウス",
    en: "House of Values",
    keyword: "お金・所有・価値観",
    desc: "物質的な豊かさ・収入・自分が大切にするもの・自己価値を表す。ここに惑星が集まる人はお金・モノ・価値観のテーマが人生の核になる。",
  },
  {
    number: "III",
    name: "第3ハウス",
    en: "House of Communication",
    keyword: "コミュニケーション・学び・近所",
    desc: "言語・文章・日常会話・短距離の移動・兄弟姉妹・初期教育を表す。思考や情報のやり取りが活発になる領域。",
  },
  {
    number: "IV",
    name: "第4ハウス",
    en: "House of Home",
    keyword: "家・家族・ルーツ",
    desc: "家庭環境・出身家族・プライベートな自己・感情的な基盤を表す。「どこに帰ってくるか」——内なる安全基地を示すハウス。",
  },
  {
    number: "V",
    name: "第5ハウス",
    en: "House of Pleasure",
    keyword: "創造・遊び・恋愛・子ども",
    desc: "自己表現・創造的な活動・楽しみ・恋愛・子どもとの関係を表す。ここが活性化されていると、遊びや創造が人生の重要な柱になる。",
  },
  {
    number: "VI",
    name: "第6ハウス",
    en: "House of Work",
    keyword: "健康・日常・仕事・奉仕",
    desc: "日常のルーティン・健康管理・職場環境・体の調子を表す。「毎日の丁寧な積み上げ」がテーマ。ここに惑星が多い人は仕事と健康のバランスが人生のカギになる。",
  },
  {
    number: "VII",
    name: "第7ハウス",
    en: "House of Partnership",
    keyword: "パートナーシップ・結婚・ビジネス",
    desc: "一対一の関係・結婚・ビジネスパートナー・対立する相手を表す。ディセンダント（下降宮）が位置し、「あなたが無意識に引き寄せる他者像」が映る。",
  },
  {
    number: "VIII",
    name: "第8ハウス",
    en: "House of Transformation",
    keyword: "変容・共有・性・死と再生",
    desc: "他者との深い融合・共同財産・性・死・変容・タブーを表す。冥王星と親和性が高く、このハウスが強い人は「深さ」と「変化」に引き寄せられる。",
  },
  {
    number: "IX",
    name: "第9ハウス",
    en: "House of Philosophy",
    keyword: "哲学・海外・高等教育・信念",
    desc: "世界観・宗教・高等教育・海外渡航・出版・長距離旅行を表す。「より大きな意味や真実を求める」衝動が強まる領域。",
  },
  {
    number: "X",
    name: "第10ハウス",
    en: "House of Career",
    keyword: "キャリア・社会的地位・使命",
    desc: "MC（天頂）が位置するハウス。社会的なキャリア・評判・公的な役割・人生の使命を表す。ここが強調された人は「社会でどう輝くか」が人生のテーマになる。",
  },
  {
    number: "XI",
    name: "第11ハウス",
    en: "House of Community",
    keyword: "友人・コミュニティ・未来のビジョン",
    desc: "友情・グループ活動・社会への貢献・未来への希望を表す。ここが活性化されると、コミュニティや仲間との繋がりが人生の推進力になる。",
  },
  {
    number: "XII",
    name: "第12ハウス",
    en: "House of the Unconscious",
    keyword: "無意識・隠れた才能・解放",
    desc: "無意識・孤独・隠れた敵・スピリチュアリティ・見えない才能を表す。最も神秘的なハウス。ここに惑星が多い人は、内省と独自の精神的探求が人生を豊かにする。",
  },
];

export default function HousesPage() {
  return (
    <>
      <div className="grid border-b border-[#111111]" style={{ gridTemplateColumns: "52px 1fr" }}>
        <div className="border-r border-[#E0DDD6] flex items-center justify-center bg-[#F4F4F2]">
          <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#BBB", whiteSpace: "nowrap" }}>
            Houses — Western Astrology
          </span>
        </div>
        <div className="px-4 md:px-12 py-6 md:py-12">
          <div className="flex items-center gap-2 text-[8px] tracking-[0.3em] text-[#888888] mb-5 uppercase">
            <Link href="/astrology" className="hover:text-[#111111] transition-colors">西洋占星術</Link>
            <span>/</span>
            <span>ハウスの意味</span>
          </div>
          <h1 className="font-display font-light leading-[0.95]" style={{ fontSize: "clamp(36px,4.5vw,68px)" }}>
            ハウスの意味
          </h1>
          <p className="text-sm text-[#555555] leading-loose tracking-wider max-w-lg mt-5">
            ホロスコープは12の「ハウス（室）」に分割される。それぞれのハウスは人生の特定の領域を象徴し、
            どの惑星がどのハウスに入っているかで、その人がどの領域に強いエネルギーを持つかが分かる。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EAEAE6]">
          {houses.map((house) => (
            <div key={house.number} className="bg-[#F4F4F2] p-8">
              <div className="flex gap-6 items-start">
                <span className="font-display text-4xl text-[#CCCCCC] font-light shrink-0 w-12">
                  {house.number}
                </span>
                <div>
                  <p className="text-xs tracking-[0.2em] text-[#888888] mb-1 uppercase">{house.en}</p>
                  <h2 className="font-display text-2xl font-light mb-1">{house.name}</h2>
                  <p className="text-xs text-[#111111] tracking-wider mb-3">{house.keyword}</p>
                  <p className="text-sm text-[#555555] leading-loose tracking-wider">{house.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Related pages */}
        <section className="mt-20">
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-0">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">さらに深く学ぶ</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
          </div>
          {[
            { href: "/astrology/planets", title: "惑星の意味",    titleEn: "Planets", desc: "太陽・月・水星・金星・火星・木星・土星・天王星・海王星・冥王星。10天体それぞれが象徴するテーマと、あなたのチャートでの読み方。" },
            { href: "/astrology/signs",   title: "12星座の意味", titleEn: "Signs",   desc: "牡羊座から魚座まで、12星座それぞれの気質・テーマ・エレメントを解説。太陽星座を軸に、あなたの本質を読み解く入口。" },
            { href: "/astrology",         title: "西洋占星術 トップ", titleEn: "Western Astrology", desc: "ホロスコープの基礎から惑星・星座・ハウスの三層構造まで。西洋占星術の全体像を把握する。" },
          ].map((page, i) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex flex-col md:grid border-b border-[#E8E8E4] hover:bg-[#F4F4F2] transition-colors last:border-b-0 md:grid-cols-[72px_220px_1fr]"
            >
              <div className="hidden md:flex border-r border-[#E8E8E4] items-start pt-6 pl-5">
                <span className="font-display text-[12px] tracking-[0.15em] text-[#CCC]">0{i + 1} —</span>
              </div>
              <div className="md:border-r border-[#E8E8E4] flex flex-col justify-center px-5 md:px-6 py-4 md:py-6">
                <p className="text-[8px] tracking-[0.35em] uppercase text-[#AAA] mb-1">{page.titleEn}</p>
                <h3 className="font-display text-[20px] font-light group-hover:opacity-60 transition-opacity">{page.title} <span className="text-[#888]">→</span></h3>
              </div>
              <div className="flex items-center px-5 md:px-8 pb-4 pt-0 md:py-6">
                <p className="text-[11px] leading-loose tracking-wider text-[#666666]">{page.desc}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
