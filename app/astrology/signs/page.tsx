import type { Metadata } from "next";
import Link from "next/link";
import ZodiacGlyph from "@/components/ZodiacGlyph";

export const metadata: Metadata = {
  title: "12星座の意味 | 西洋占星術",
  description: "牡羊座から魚座まで、12星座それぞれの気質・テーマ・エレメントを解説。太陽星座を軸に、あなたの本質を読み解く。",
};

const signs = [
  {
    name:    "牡羊座" as const,
    en:      "Aries",
    period:  "3/21 – 4/19",
    element: "火",
    quality: "活動宮",
    ruler:   "火星",
    keyword: "勇気・先駆・情熱",
    desc:    "12星座の最初に位置する開拓者。情熱と直感で新しい道を切り拓き、挑戦そのものに生きがいを感じる。考えるより先に動く行動力が最大の武器で、停滞を最も嫌う。衝動的に見られることもあるが、その推進力が世界を動かす最初の一手となる。",
  },
  {
    name:    "牡牛座" as const,
    en:      "Taurus",
    period:  "4/20 – 5/20",
    element: "地",
    quality: "不動宮",
    ruler:   "金星",
    keyword: "安定・美・実直",
    desc:    "堅実に土台を築く職人気質の星座。美と豊かさを愛し、時間をかけて積み上げることに深い喜びを感じる。五感の満足—美味しい食、心地よい音楽、肌に触れる質感—が心の安定につながる。一度動き出すと驚異的な粘り強さを発揮する。",
  },
  {
    name:    "双子座" as const,
    en:      "Gemini",
    period:  "5/21 – 6/20",
    element: "風",
    quality: "柔軟宮",
    ruler:   "水星",
    keyword: "知性・変化・コミュニケーション",
    desc:    "多様な関心と表現力を持つ情報の使者。言葉・文章・会話で人と繋がることが人生の核。変化と刺激の中で思考が冴え、退屈が最大の敵となる。複数のことを同時に進める器用さを持ち、あらゆる分野の知識を橋渡しする能力に優れる。",
  },
  {
    name:    "蟹座" as const,
    en:      "Cancer",
    period:  "6/21 – 7/22",
    element: "水",
    quality: "活動宮",
    ruler:   "月",
    keyword: "感受性・守護・家庭",
    desc:    "深い感受性と守護本能を持つ養育者の星座。家族や仲間を守り育てることに強い使命感を感じ、安心できる「家」を大切にする。感情のアンテナが鋭く、相手の気持ちを言葉より先に感じ取る。信頼できる関係の中でこそ、本来の力が最大限に開花する。",
  },
  {
    name:    "獅子座" as const,
    en:      "Leo",
    period:  "7/23 – 8/22",
    element: "火",
    quality: "不動宮",
    ruler:   "太陽",
    keyword: "カリスマ・表現・誇り",
    desc:    "舞台で輝くことを求める表現者の星座。自己表現と創造性によって人々を鼓舞し、誇りを持って生きることが人生のテーマ。愛情深く寛大であり、自分が中心にいることで他者も輝かせることができる。承認への欲求が才能の火をつける燃料となる。",
  },
  {
    name:    "乙女座" as const,
    en:      "Virgo",
    period:  "8/23 – 9/22",
    element: "地",
    quality: "柔軟宮",
    ruler:   "水星",
    keyword: "分析・完璧主義・奉仕",
    desc:    "分析力と精緻さで世界に貢献する職人の星座。細部への注意と絶え間ない改善の追求が人生のテーマ。役に立てる・整っている状態で深く安心し、混乱した状況を整理することに才能を発揮する。批判的に見えるのは、もっと良くなれると信じているからだ。",
  },
  {
    name:    "天秤座" as const,
    en:      "Libra",
    period:  "9/23 – 10/22",
    element: "風",
    quality: "活動宮",
    ruler:   "金星",
    keyword: "調和・美・パートナーシップ",
    desc:    "美と公正さを愛する調停者の星座。関係性の中で成長し、バランスと調和を保つことが人生の核心。美的センスが鋭く、デザインや空間に対する審美眼を持つ。一人でいるより誰かとの対話の中で思考が最も深まる、社交的な知性の持ち主。",
  },
  {
    name:    "蠍座" as const,
    en:      "Scorpio",
    period:  "10/23 – 11/21",
    element: "水",
    quality: "不動宮",
    ruler:   "冥王星",
    keyword: "深化・変容・洞察",
    desc:    "深層を見通す洞察力を持つ変革者の星座。表面に惑わされず、本質と真実を追求し続ける。強い絆と深い信頼の中でこそ本来の姿を開く。一度決めたことへの執着と集中力は他の星座の追随を許さない。傷つくことを恐れながらも、深く繋がることを求める。",
  },
  {
    name:    "射手座" as const,
    en:      "Sagittarius",
    period:  "11/22 – 12/21",
    element: "火",
    quality: "柔軟宮",
    ruler:   "木星",
    keyword: "冒険・哲学・自由",
    desc:    "真理と自由を探求する哲人の星座。冒険と拡大を通じて人生の意味を見出し、常に遠くの地平を目指す。楽観的なエネルギーで周囲を鼓舞し、閉塞した状況でも出口を信じて動き続ける。海外・高等教育・哲学・宗教など、より大きな意味を扱う領域に引き寄せられる。",
  },
  {
    name:    "山羊座" as const,
    en:      "Capricorn",
    period:  "12/22 – 1/19",
    element: "地",
    quality: "活動宮",
    ruler:   "土星",
    keyword: "野望・規律・達成",
    desc:    "時間をかけて頂点を目指す遅咲きの星座。責任感と忍耐で社会的な地位と達成を積み上げていく。若い頃は苦労が多くとも、年齢を重ねるにつれて真価が現れる。構造・規律・長期的な計画を得意とし、他者が諦める場所でも着実に歩み続ける強さを持つ。",
  },
  {
    name:    "水瓶座" as const,
    en:      "Aquarius",
    period:  "1/20 – 2/18",
    element: "風",
    quality: "不動宮",
    ruler:   "天王星",
    keyword: "革新・独立・人道",
    desc:    "枠を超えて革新する未来の使者の星座。独自の視点と独立心で、人類の未来を先取りするような生き方を選ぶ。感情より理念で動き、集団の利益や社会的な理想のために行動する。個であることへのこだわりと、仲間との連帯感を同時に強く感じる矛盾した星座。",
  },
  {
    name:    "魚座" as const,
    en:      "Pisces",
    period:  "2/19 – 3/20",
    element: "水",
    quality: "柔軟宮",
    ruler:   "海王星",
    keyword: "共感・直感・夢想",
    desc:    "深い共感と霊的な感受性を持つ夢想家の星座。境界を超えて人と宇宙に溶け込み、見えないものを感じ取る。音楽・詩・映像・スピリチュアルな探求で魂が喜ぶ。他者の痛みを自分のものとして感じられるほどの共感力が、時に傷つきやすさにもなる。12星座の最後を締め、すべての経験を包み込む宇宙的な星座。",
  },
];

const ELEMENT_LABEL: Record<string, string> = { 火: "Fire", 地: "Earth", 風: "Air", 水: "Water" };

export default function SignsPage() {
  return (
    <>
      <div className="grid border-b border-[#111111]" style={{ gridTemplateColumns: "52px 1fr" }}>
        <div className="border-r border-[#E0DDD6] flex items-center justify-center bg-[#F4F4F2]">
          <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#BBB", whiteSpace: "nowrap" }}>
            Signs — Western Astrology
          </span>
        </div>
        <div className="px-4 md:px-12 py-6 md:py-12">
          <div className="flex items-center gap-2 text-[8px] tracking-[0.3em] text-[#888888] mb-5 uppercase">
            <Link href="/astrology" className="hover:text-[#111111] transition-colors">西洋占星術</Link>
            <span>/</span>
            <span>12星座の意味</span>
          </div>
          <h1 className="font-display font-light leading-[0.95]" style={{ fontSize: "clamp(36px,4.5vw,68px)" }}>
            12星座の意味
          </h1>
          <p className="text-sm text-[#555555] leading-loose tracking-wider max-w-lg mt-5">
            太陽・月・各惑星が位置する星座が、その天体のテーマをどんな「スタイル」で表現するかを決定する。
            ここでは太陽星座を軸に、12の星座それぞれが持つ気質・使命・エレメントの性質を解説する。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Element legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          {[
            { el: "火", en: "Fire",  signs: "牡羊・獅子・射手" },
            { el: "地", en: "Earth", signs: "牡牛・乙女・山羊" },
            { el: "風", en: "Air",   signs: "双子・天秤・水瓶" },
            { el: "水", en: "Water", signs: "蟹・蠍・魚" },
          ].map(e => (
            <div key={e.el} className="flex items-center gap-3">
              <div className="w-px h-8 bg-[#111111] shrink-0" />
              <div>
                <p className="font-display text-lg font-light text-[#111111]">{e.el} <span className="text-[#888888] text-sm">{e.en}</span></p>
                <p className="text-[9px] tracking-wider text-[#888888]">{e.signs}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Signs grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAEAE6]">
          {signs.map((s) => (
            <div key={s.name} className="bg-[#F4F4F2] p-8">
              <div className="flex items-start justify-between mb-4">
                <ZodiacGlyph sign={s.name} size={48} color="#111111" />
                <div className="text-right">
                  <p className="text-[8px] tracking-[0.3em] uppercase text-[#888888]">{s.element} — {ELEMENT_LABEL[s.element]}</p>
                  <p className="text-[8px] tracking-[0.25em] text-[#AAAAAA] mt-0.5">{s.quality} / ♟ {s.ruler}</p>
                </div>
              </div>
              <p className="text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-1">{s.en}</p>
              <h2 className="font-display text-2xl font-light mb-1 text-[#111111]">{s.name}</h2>
              <p className="text-[9px] tracking-[0.25em] text-[#888888] mb-4">{s.period} — {s.keyword}</p>
              <p className="text-sm text-[#555555] leading-loose tracking-wider">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 border-t border-[#E0DDD6] pt-8 mb-20">
          <p className="text-xs text-[#888888] tracking-wider leading-loose">
            ※ 太陽星座の期間は年によって1日前後する場合があります。境界付近の生まれの方は出生時刻と正確な天体暦で確認してください。
            また、太陽星座はあなたの多面的な性質のひとつに過ぎません。月星座・アセンダントと合わせて読むことで、より立体的な自己像が浮かび上がります。
          </p>
        </div>

        {/* Related pages */}
        <section>
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-0">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">さらに深く学ぶ</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
          </div>
          {[
            { href: "/astrology/planets", title: "惑星の意味", titleEn: "Planets", desc: "太陽・月・水星・金星・火星・木星・土星・天王星・海王星・冥王星。10天体それぞれが象徴するテーマと、あなたのチャートでの読み方。" },
            { href: "/astrology/houses",  title: "ハウスの意味", titleEn: "Houses",  desc: "第1室から第12室まで、人生の12の領域。仕事・お金・人間関係・精神性——それぞれのハウスに惑星が入ることの意味。" },
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
