import type { Metadata } from "next";
import KyuseiSim from "@/components/KyuseiSim";

export const metadata: Metadata = {
  title: "九星気学",
  description: "古代中国の洛書をルーツに持つ九星気学。9つの星が示す才能・適職・気質を読み解く。",
};

const nineStars = [
  { number: 1, name: "一白水星", en: "Water", element: "水", direction: "北", keyword: "知性・適応・洞察", talent: "コンサルタント・調査・ライター・外交・分析職", desc: "水のように状況に馴染み、深く物事を理解する。縁の下で力を発揮し、情報・知識・分析で組織を動かす。" },
  { number: 2, name: "二黒土星", en: "Earth", element: "土", direction: "南西", keyword: "勤勉・育む・継続", talent: "医療・介護・教育・食・農業・サポート職", desc: "地道に積み上げ、人・組織・プロジェクトを育てる。チームの土台として機能し、長期的な成果を生み出す。" },
  { number: 3, name: "三碧木星", en: "Wood", element: "木", direction: "東", keyword: "行動力・革新・スピード", talent: "起業・営業・広報・スポーツ・新規事業・エンタメ", desc: "誰よりも早く動き、新しい道を切り拓く。変化の激しい環境・ゼロイチの場で際立つ行動力を持つ。" },
  { number: 4, name: "四緑木星", en: "Wood", element: "木", direction: "南東", keyword: "信頼・調和・ネットワーク", talent: "外交・PR・調停・コーディネーター・貿易・中間管理", desc: "人と人をつなぐ調整力と、信頼を積み上げる誠実さ。広いネットワークが最大の財産になる星。" },
  { number: 5, name: "五黄土星", en: "Earth", element: "土", direction: "中央", keyword: "カリスマ・変革・中心力", talent: "経営者・プロデューサー・変革リーダー・独立業", desc: "9つの星の中心に立つ最強のエネルギー。大きな組織のトップか完全独立業で本領を発揮する。" },
  { number: 6, name: "六白金星", en: "Metal", element: "金", direction: "北西", keyword: "権威・完璧主義・誇り", talent: "経営幹部・法律・金融・医師・行政・専門職リーダー", desc: "高い基準を設定し、妥協なく達成する意志力。プロとしての誇りと権威が全行動の軸になる。" },
  { number: 7, name: "七赤金星", en: "Metal", element: "金", direction: "西", keyword: "弁才・喜び・社交性", talent: "講師・接客・芸能・セールス・コンサルタント・美容", desc: "話す・楽しませる・伝える弁才が最大の武器。人前に立つ仕事で一気に才能が開花する。" },
  { number: 8, name: "八白土星", en: "Earth", element: "土", direction: "北東", keyword: "変化・蓄積・粘り強さ", talent: "不動産・金融・投資・コーチング・再生事業・長期PJ", desc: "山のような安定感と長期的な積み上げ力。変化の節目を的確につかみ、財産・技術・信頼を蓄積する。" },
  { number: 9, name: "九紫火星", en: "Fire", element: "火", direction: "南", keyword: "直感・美・洞察", talent: "デザイン・芸術・教育・マーケ・美容・編集・プロデュース", desc: "鋭い直感と高い審美眼。見えないものを見える形にする独自の能力を持ち、人前で輝くことで才能が最大化する。" },
];

// 洛書の配置: 行×列
// 4(四緑) | 9(九紫) | 2(二黒)
// 3(三碧) | 5(五黄) | 7(七赤)
// 8(八白) | 1(一白) | 6(六白)
const LUOSHU = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

const STAR_CHAR: Record<number, string> = {
  1: "一白", 2: "二黒", 3: "三碧", 4: "四緑",
  5: "五黄", 6: "六白", 7: "七赤", 8: "八白", 9: "九紫",
};

export default function KyuseiPage() {
  return (
    <>
      {/* Page header */}
      <div className="grid border-b border-[#111111]" style={{ gridTemplateColumns: "52px 1fr" }}>
        <div className="border-r border-[#E0DDD6] flex items-center justify-center bg-[#F4F4F2]">
          <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#BBB", whiteSpace: "nowrap" }}>
            Nine Star Ki — MyJiku
          </span>
        </div>
        <div className="px-4 md:px-12 py-8 md:py-16">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#888888] mb-5">04 — Kyusei Kigaku</p>
          <h1 className="font-display font-light leading-[0.95]" style={{ fontSize: "clamp(44px,5.5vw,76px)" }}>
            九星気学
          </h1>
          <p className="text-sm text-[#555555] leading-loose tracking-wider max-w-lg mt-6">
            古代中国の洛書（らくしょ）を起源に持ち、日本で体系化された九星気学。生まれ年から導く「本命星」が、その人の本質的な才能・気質・適した環境を示す。かつて宮廷や軍で人材登用の判断基準として使われた実績を持つ、実用的な占術体系。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Overview */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-10">
            <div>
              <p className="font-display italic text-[#888888] text-lg mb-4">overview</p>
              <h2 className="font-display text-4xl font-light mb-6">九星気学とは</h2>
              <p className="text-sm text-[#555555] leading-loose tracking-wider mb-4">
                九星気学は、中国の古典「洛書」の九宮図（3×3の魔方陣）と陰陽五行思想を組み合わせた命理学。唐代に体系化され、日本に伝来後、独自の発展を遂げた。
              </p>
              <p className="text-sm text-[#555555] leading-loose tracking-wider mb-4">
                最大の特徴は、生まれ年から導く「本命星」が単なる性格判断を超え、「その人がどんな環境・役割で最大の力を発揮するか」を示す点にある。古代中国の宮廷・軍では、この理論をもとに官僚・武将・参謀の配置を行っていたとされ、適材適所の判断ツールとして長い実績を持つ。
              </p>
              <p className="text-sm text-[#555555] leading-loose tracking-wider">
                現代では自己理解・適職判断・チームビルディングへの応用が進んでいる。
              </p>
            </div>

            {/* 九宮図 SVG */}
            <div className="flex justify-center md:justify-start">
              <svg viewBox="0 0 210 210" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 210, display: "block" }}>
                {/* Grid lines */}
                <rect x="5" y="5" width="200" height="200" stroke="#C4C1B8" strokeWidth="0.75" fill="#F9F9F7" />
                <line x1="5" y1="71.67" x2="205" y2="71.67" stroke="#C4C1B8" strokeWidth="0.5" />
                <line x1="5" y1="138.33" x2="205" y2="138.33" stroke="#C4C1B8" strokeWidth="0.5" />
                <line x1="71.67" y1="5" x2="71.67" y2="205" stroke="#C4C1B8" strokeWidth="0.5" />
                <line x1="138.33" y1="5" x2="138.33" y2="205" stroke="#C4C1B8" strokeWidth="0.5" />

                {LUOSHU.map((row, ri) =>
                  row.map((num, ci) => {
                    const cx = 5 + 66.67 * ci + 33.33;
                    const cy = 5 + 66.67 * ri + 33.33;
                    const isCenter = num === 5;
                    return (
                      <g key={`${ri}-${ci}`}>
                        {isCenter && (
                          <rect
                            x={5 + 66.67 * ci + 1}
                            y={5 + 66.67 * ri + 1}
                            width={65.67}
                            height={65.67}
                            fill="#EAEAE6"
                          />
                        )}
                        <text
                          x={cx} y={cy - 4}
                          fill={isCenter ? "#111111" : "#888888"}
                          fontSize={isCenter ? "22" : "20"}
                          fontFamily="Georgia, serif"
                          fontWeight={isCenter ? "500" : "300"}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {num}
                        </text>
                        <text
                          x={cx} y={cy + 16}
                          fill={isCenter ? "#555555" : "#AAAAAA"}
                          fontSize="7"
                          fontFamily="sans-serif"
                          textAnchor="middle"
                        >
                          {STAR_CHAR[num]}
                        </text>
                      </g>
                    );
                  })
                )}
              </svg>
            </div>
          </div>

          {/* Structure cards */}
          <div className="bg-[#EAEAE6] p-8">
            <p className="text-xs tracking-[0.2em] text-[#888888] mb-4 uppercase">Structure</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3">
              {[
                { term: "本命星（ほんめいせい）", desc: "生まれ年から導く主星。その人の核心的な気質・才能・適した役割を示す。" },
                { term: "月命星（げつめいせい）", desc: "生まれ月から導くサブの星。本命星の才能がどのように表現されるかの質を加える。" },
                { term: "五行（ごぎょう）", desc: "水・木・火・土・金の5つのエネルギー。各星が属し、相生・相克の関係が星同士の影響を決める。" },
                { term: "方位（ほうい）", desc: "各星が司る方角。相性のよい方位・環境が運気の流れに影響する。" },
              ].map((item) => (
                <div key={item.term} className="border-b border-[#D0CCC4] pb-3">
                  <p className="text-sm font-display text-[#111111] mb-1">{item.term}</p>
                  <p className="text-xs text-[#888888] tracking-wider">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simulation */}
        <section className="mb-20">
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-8">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">シミュレーション</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
            <span className="text-[8px] tracking-[0.3em] text-[#CCC] mr-5">Try it</span>
          </div>
          <KyuseiSim />
        </section>

        {/* Nine stars */}
        <section>
          <h2 className="font-display text-4xl font-light mb-2">9つの星と才能</h2>
          <p className="text-sm text-[#888888] mb-10 tracking-wider">
            九星気学の9つの星はそれぞれ固有の五行・方位・気質を持ち、「その人がどんな場で力を発揮するか」を示す。古代の人材配置から現代の適職判断まで、実用的な指針として機能する。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAEAE6]">
            {nineStars.map((star) => (
              <div key={star.number} className="bg-[#F4F4F2] p-8">
                <p className="font-display text-5xl text-[#CCCCCC] font-light mb-2">{star.number}</p>
                <p className="font-display text-xl font-light mb-1">{star.name}</p>
                <p className="text-xs text-[#111111] tracking-wider mb-3">
                  {star.element} / {star.direction} / {star.keyword}
                </p>
                <p className="text-xs text-[#888888] mb-0.5">Career →</p>
                <p className="text-xs text-[#555555] mb-3">{star.talent}</p>
                <p className="text-sm text-[#555555] leading-loose mt-3">{star.desc}</p>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 border border-[#D0CCC4] p-8">
            <p className="text-xs tracking-[0.2em] text-[#111111] mb-3 uppercase">Note — 本命星と月命星について</p>
            <p className="text-sm text-[#555555] leading-loose tracking-wider">
              九星気学では本命星が人生の核心的な資質を示し、月命星がその才能の表現スタイルを加える。
              古代の人材配置では、この二つの組み合わせから「その人物がどの役職・環境で最大の成果を上げるか」を判断していたとされる。
              現代においては、適職選択・強みの把握・チームにおける役割理解に活用できる。
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
