import type { Metadata } from "next";
import SanmeiBodyMap from "@/components/SanmeiBodyMap";
import SanmeiSim from "@/components/SanmeiSim";

export const metadata: Metadata = {
  title: "算命学",
  description: "中国古代の陰陽五行をベースに、天干地支と守護神で命式を読み解く算命学の基礎解説。",
};

const tenGods = [
  { name: "天将星", keyword: "王者・支配・カリスマ", desc: "最も強いエネルギーを持つ星。リーダーシップ・権力・支配力を表す。命式にあると、自然と人の上に立つ役割を引き受ける。" },
  { name: "禄存星", keyword: "奉仕・貢献・人情", desc: "人に尽くすことで満たされる星。面倒見がよく、コミュニティの中心になりやすい。お金は入ってきやすいが出やすい傾向も。" },
  { name: "司禄星", keyword: "蓄積・堅実・現実主義", desc: "コツコツと積み上げる星。貯蓄・資産形成・継続的な努力を好む。安定と実績を重んじ、じっくり育てる力がある。" },
  { name: "牽牛星", keyword: "誇り・プロ意識・完璧主義", desc: "プロとしての誇りと完璧主義の星。技術・専門性・一流であることへの強いこだわりを持つ。職人・エキスパートに向く。" },
  { name: "龍高星", keyword: "自由・改革・知性", desc: "既存の枠を壊し、新しいものを作る改革者の星。知的好奇心が旺盛で、海外・異文化・先端分野に引き寄せられる。" },
  { name: "玉堂星", keyword: "伝統・継承・守護", desc: "先人の知恵や伝統を守り伝える星。家族・故郷・文化の継承に力を注ぐ。落ち着いた判断力と精神的な深みがある。" },
  { name: "調舒星", keyword: "感性・孤高・芸術", desc: "繊細な感性と孤独な深みを持つ芸術家の星。群れることを好まず、独自のスタイルで深く突き詰める。芸術・文学との高い親和性。" },
  { name: "鳳閣星", keyword: "自然体・おおらか・長寿", desc: "自然の流れに身をゆだねる鷹揚な星。こだわりが少なく、おおらかで長生きしやすいと言われる。無理をしないことが才能になる。" },
  { name: "石門星", keyword: "友情・集団・調和", desc: "仲間との絆を大切にする社交の星。グループのまとめ役・橋渡し役として力を発揮する。組織・コミュニティ運営との相性◎。" },
  { name: "車騎星", keyword: "行動・闘争・実行力", desc: "とにかく動く行動力の星。考えるより先に動き、現場で力を発揮する。体を使う仕事・スポーツ・営業・武道との親和性が高い。" },
];

export default function SanmeigakuPage() {
  return (
    <>
      <div className="grid border-b border-[#111111]" style={{ gridTemplateColumns: "52px 1fr" }}>
        <div className="border-r border-[#E0DDD6] flex items-center justify-center bg-[#F4F4F2]">
          <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#BBB", whiteSpace: "nowrap" }}>
            Sanmeigaku — MyJiku
          </span>
        </div>
        <div className="px-12 py-16">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#888888] mb-5">04 — Sanmeigaku</p>
          <h1 className="font-display font-light leading-[0.95]" style={{ fontSize: "clamp(44px,5.5vw,76px)" }}>
            算命学
          </h1>
          <p className="text-sm text-[#555555] leading-loose tracking-wider max-w-lg mt-6">
            中国の陰陽五行思想をベースに、日本で独自に発展した命理学。
            天干・地支・守護神の概念を組み合わせ、その人の先天的な気質と後天的な運の流れを立体的に読み解く。
            四柱推命と似て非なる、日本独自の占術体系。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Overview */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-display italic text-[#888888] text-lg mb-4">overview</p>
              <h2 className="font-display text-4xl font-light mb-6">算命学とは</h2>
              <p className="text-sm text-[#555555] leading-loose tracking-wider mb-4">
                算命学（さんめいがく）は、中国から伝来した命理学をもとに、日本で体系化された占術。
                生年月日から「天干・地支」を取り出し、10個の「宿命星（ほし）」を導く点で四柱推命と似ているが、
                算命学独自の「守護神」「位相法」「陰陽調和」などの概念を持ち、異なる体系として発展した。
              </p>
              <p className="text-sm text-[#555555] leading-loose tracking-wider mb-4">
                算命学の大きな特徴は「守護神」の概念。命式のバランスを整えるために必要な五行の「神」を特定し、
                それを意識した生き方をすることで運が整うとされる。
                言わば「自分の命式に足りないものを外から補う」という発想だ。
              </p>
              <p className="text-sm text-[#555555] leading-loose tracking-wider">
                また「陰占（いんせん）」と「陽占（ようせん）」の二つの側面から命式を読む点も特徴的。
                陰占が先天的な宿命の骨格を示し、陽占の宿命星・位相法が具体的な気質と人間関係のパターンを示す。
              </p>
            </div>
            <div className="space-y-4">
              <SanmeiBodyMap />
              <div className="bg-[#EAEAE6] p-8">
                <p className="text-xs tracking-[0.2em] text-[#888888] mb-4 uppercase">Structure</p>
                <div className="space-y-3">
                  {[
                    { term: "陰占（いんせん）", desc: "天干・地支による命式の骨格。先天的な宿命の枠組み。" },
                    { term: "陽占（ようせん）", desc: "10の宿命星・位相法・後天運による気質と運の具体的な読み。" },
                    { term: "守護神（しゅごじん）", desc: "命式のバランスを整える五行の「鍵」。意識することで運が整う。" },
                    { term: "位相法（いそうほう）", desc: "十二支同士の関係性（合・冲・害など）が示す人間関係のパターン。" },
                  ].map((item) => (
                    <div key={item.term} className="border-b border-[#D0CCC4] pb-3 last:border-0 last:pb-0">
                      <p className="text-sm font-display text-[#111111] mb-1">{item.term}</p>
                      <p className="text-xs text-[#888888] tracking-wider">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Difference from Shichusuimei */}
        <section className="mb-20">
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-10">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">vs. 四柱推命</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EAEAE6]">
            <div className="bg-[#F4F4F2] p-8">
              <p className="text-xs tracking-[0.2em] text-[#888888] mb-2 uppercase">算命学</p>
              <h3 className="font-display text-2xl font-light mb-4">Sanmeigaku</h3>
              <ul className="space-y-2">
                {[
                  "生年月日のみで計算（時刻不要）",
                  "10の宿命星（ほし）で気質を読む",
                  "守護神の概念を持つ",
                  "位相法による人間関係の読み",
                  "日本で体系化・発展",
                ].map((item) => (
                  <li key={item} className="flex gap-2 items-start text-xs text-[#888888] tracking-wider">
                    <span className="text-[#111111] mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#F4F4F2] p-8">
              <p className="text-xs tracking-[0.2em] text-[#888888] mb-2 uppercase">四柱推命</p>
              <h3 className="font-display text-2xl font-light mb-4">Four Pillars</h3>
              <ul className="space-y-2">
                {[
                  "生年月日＋時刻で四柱を構成",
                  "通変星（十神）で気質を読む",
                  "日主の旺衰が読みの核心",
                  "大運・流年の時間軸を重視",
                  "中国から直接継承・日本でも普及",
                ].map((item) => (
                  <li key={item} className="flex gap-2 items-start text-xs text-[#888888] tracking-wider">
                    <span className="text-[#111111] mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
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
          <SanmeiSim />
        </section>

        {/* Ten stars */}
        <section>
          <h2 className="font-display text-4xl font-light mb-2">10の宿命星</h2>
          <p className="text-sm text-[#888888] mb-10 tracking-wider">
            算命学では命式から10の宿命星を導く。この星の組み合わせと配置が、その人の気質・才能・人生のパターンを示す。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EAEAE6]">
            {tenGods.map((god) => (
              <div key={god.name} className="bg-[#F4F4F2] p-8">
                <h3 className="font-display text-2xl font-light mb-1">{god.name}</h3>
                <p className="text-xs text-[#111111] tracking-wider mb-3">{god.keyword}</p>
                <p className="text-sm text-[#555555] leading-loose tracking-wider">{god.desc}</p>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 border border-[#D0CCC4] p-8">
            <p className="text-xs tracking-[0.2em] text-[#111111] mb-3 uppercase">Note — 守護神について</p>
            <p className="text-sm text-[#555555] leading-loose tracking-wider">
              算命学の守護神とは、命式の五行バランスを整えるために必要な五行の「神」のこと。
              たとえば木のエネルギーが過剰な命式には、それを適度に剋する（切る）「金」が守護神になる場合がある。
              守護神を意識した環境・色・方角・仕事の選択が、命式の調和につながると考える。
              守護神の特定には命式全体の詳細な分析が必要なため、個別鑑定での確認を推奨する。
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
