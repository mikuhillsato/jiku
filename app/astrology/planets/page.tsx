import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "惑星の意味 | 西洋占星術",
  description: "太陽・月・水星・金星・火星・木星・土星・天王星・海王星・冥王星。10天体それぞれが象徴するテーマと読み方。",
};

const planets = [
  {
    symbol: "☉",
    name: "太陽",
    en: "Sun",
    keyword: "自己・意志・輝き",
    period: "約1ヶ月 / 星座滞在",
    desc: "あなたが「こうありたい」と意識的に目指す自己像。人生のテーマと中心軸を表す。太陽星座は最もポピュラーな「あなたの星座」であり、外の世界で輝こうとする方向性を示す。",
    career: "太陽が示すのは、どんな分野で「本物の自分」として輝けるか。太陽の星座とハウスを見ることで、やりがいを感じやすい仕事の質が分かる。",
  },
  {
    symbol: "☽",
    name: "月",
    en: "Moon",
    keyword: "感情・本能・安心の場所",
    period: "約2.5日 / 星座滞在",
    desc: "無意識の感情パターン・安心できる環境・本能的な反応を表す。月星座は「素の自分」。ストレス下や親しい人の前で自然に出る顔がここに表れる。",
    career: "月が示すのは、どんな環境で「安心して力を発揮できるか」。チームか個人か、ルーティンか変化か——働き方の好みに月は深く関係する。",
  },
  {
    symbol: "☿",
    name: "水星",
    en: "Mercury",
    keyword: "思考・言語・コミュニケーション",
    period: "約2.5〜3週間 / 星座滞在",
    desc: "情報処理の仕方・話し方・学び方・伝え方を表す。水星の星座で「どのように考え、伝えるか」のスタイルが分かる。逆行期には誤解や遅延が起きやすい。",
    career: "水星が示すのは、情報を扱う仕事との相性と、プレゼンや交渉での傾向。ライター・教育・営業・分析職との親和性を見るポイント。",
  },
  {
    symbol: "♀",
    name: "金星",
    en: "Venus",
    keyword: "愛・美・価値観",
    period: "約3〜5週間 / 星座滞在",
    desc: "何を美しいと感じるか、何を愛するか、何に価値を置くか。対人関係・恋愛・お金・審美眼・喜びのスタイルを表す。金星の星座でファッションや美意識の傾向も分かる。",
    career: "金星が示すのは、どんな「価値」を仕事に求めるか。美・調和・人間関係——金星が重視するテーマが満たされる仕事を選ぶと充実感が高まる。",
  },
  {
    symbol: "♂",
    name: "火星",
    en: "Mars",
    keyword: "行動・情熱・エネルギー",
    period: "約1.5〜2ヶ月 / 星座滞在",
    desc: "どのように行動し、何に情熱を燃やし、怒りをどう表現するかを表す。火星は「エンジン」。欲求を実現するための推進力であり、競争・性衝動・反骨精神の源でもある。",
    career: "火星が示すのは、仕事でのドライブの源と、競争や困難への向き合い方。スタートアップ・スポーツ・起業家精神との相性にも関わる。",
  },
  {
    symbol: "♃",
    name: "木星",
    en: "Jupiter",
    keyword: "拡大・幸運・哲学",
    period: "約1年 / 星座滞在",
    desc: "成長・拡張・幸運・学びへの欲求を表す。木星の影響を受けた領域は自然と広がりやすく、チャンスが巡ってきやすい。過剰になりすぎる「拡大しすぎ」の警告でもある。",
    career: "木星が入るハウスや星座を見ると、どの分野でチャンスを掴みやすいか分かる。海外・教育・哲学・出版との親和性も示す。",
  },
  {
    symbol: "♄",
    name: "土星",
    en: "Saturn",
    keyword: "制限・規律・成熟",
    period: "約2.5年 / 星座滞在",
    desc: "試練・忍耐・責任・構造・長期的な達成を表す。土星は厳しい師。最初は制限に見えるが、克服した先に本物の実力と信頼が積み上がる。「遅く咲く」領域を示す惑星。",
    career: "土星が示すのは、時間をかけてこそ光る才能と、長期的なキャリア設計の核。マネジメント・専門職・職人的な積み上げとの親和性が高い。",
  },
  {
    symbol: "♅",
    name: "天王星",
    en: "Uranus",
    keyword: "革新・自由・突破",
    period: "約7年 / 星座滞在",
    desc: "既成概念の破壊・革新・個性の解放を表す。世代共通の変革テーマを示す「世代の星」。個人チャートでは、天王星が強調される人は既存の枠に収まれない自由な魂を持つ。",
    career: "天王星が入るハウスは、型破りな方法で突破しやすい領域。起業・テクノロジー・社会変革・フリーランス志向との関連が強い。",
  },
  {
    symbol: "♆",
    name: "海王星",
    en: "Neptune",
    keyword: "夢想・直感・霊性",
    period: "約14年 / 星座滞在",
    desc: "夢・幻想・直感・スピリチュアリティ・芸術的感受性を表す。境界線を溶かす星。過度な影響で現実逃避・幻滅・欺瞞を招く一方、深い共感力と創造性の源にもなる。",
    career: "海王星が示すのは、目に見えないものへの感受性。アート・音楽・映像・ヒーリング・社会福祉——「人の心に触れる仕事」との親和性が高い。",
  },
  {
    symbol: "♇",
    name: "冥王星",
    en: "Pluto",
    keyword: "変容・死と再生・権力",
    period: "約12〜30年 / 星座滞在",
    desc: "根底からの変容・破壊と再生・権力・無意識の深層を表す。冥王星が絡む領域は「完全に変わらざるを得ない」強烈な変化を経験する。その先に、以前の自分には戻れない深みが生まれる。",
    career: "冥王星が示すのは、本質的な変革力と影響力。リーダーシップ・危機管理・心理学・調査報道——「深く掘り下げる」仕事とのシナジーが高い。",
  },
];

export default function PlanetsPage() {
  return (
    <>
      <div className="border-b border-[#EAE4DC]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-xs text-[#8A7E75] tracking-wider mb-4">
            <Link href="/astrology" className="hover:text-[#8B5E3C] transition-colors">西洋占星術</Link>
            <span>/</span>
            <span>惑星の意味</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-[#1A1714] mb-4">
            惑星の意味
          </h1>
          <p className="text-sm text-[#3D3630] leading-loose tracking-wider max-w-lg">
            西洋占星術では10の惑星（天体）を使う。それぞれが人間の心理・欲求・テーマを象徴し、
            「何を（惑星）」「どのように（星座）」「どの領域で（ハウス）」という三層の文法で読み解く。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-px bg-[#EAE4DC]">
          {planets.map((planet) => (
            <div key={planet.name} className="bg-[#EFF0EB] p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
                {/* Symbol + name */}
                <div className="text-center md:text-left">
                  <p className="font-display text-6xl text-[#C4926A] leading-none mb-2">{planet.symbol}</p>
                  <p className="text-xs tracking-[0.2em] text-[#8A7E75] uppercase mb-1">{planet.en}</p>
                  <h2 className="font-display text-2xl font-light">{planet.name}</h2>
                  <p className="text-xs text-[#D6C5B0] mt-2 tracking-wider">{planet.period}</p>
                </div>
                {/* Content */}
                <div>
                  <p className="text-xs tracking-[0.15em] text-[#8B5E3C] mb-3">{planet.keyword}</p>
                  <p className="text-sm text-[#3D3630] leading-loose tracking-wider mb-4">{planet.desc}</p>
                  <div className="border-l-2 border-[#EAE4DC] pl-4">
                    <p className="text-xs tracking-[0.2em] text-[#8A7E75] mb-1 uppercase">Career Lens</p>
                    <p className="text-sm text-[#3D3630] leading-loose tracking-wider">{planet.career}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
