import type { Metadata } from "next";
import LifePathCalculator from "@/components/LifePathCalculator";

export const metadata: Metadata = {
  title: "数秘術",
  description: "生年月日と名前を数字に還元し、人生のテーマと使命を読み解く数秘術（ニューメロロジー）の基礎。",
};

const lifePathMeanings = [
  { number: 1, keyword: "開拓・先駆・独立", desc: "新しい道を切り拓くリーダー。自立心が強く、最初に動く勇気を持つ。ナンバー1の人生テーマは「自分の道を自分で選ぶ」こと。" },
  { number: 2, keyword: "調和・協力・感受性", desc: "人と人をつなぐ調停者。繊細な感受性と共感力で、周囲の空気を読む。2の人生テーマは「関係性の中で本物の自分を保つ」こと。" },
  { number: 3, keyword: "表現・創造・喜び", desc: "表現することで人を喜ばせるエンターテイナー。言葉・アート・音楽など、創造的な出力が人生の核になる。" },
  { number: 4, keyword: "構築・実直・安定", desc: "着実に土台を築くビルダー。ルール・構造・コツコツとした積み上げを好む。4の使命は「揺るぎない基盤を作る」こと。" },
  { number: 5, keyword: "自由・変化・冒険", desc: "変化と自由を愛するエクスプローラー。多様な経験を通じて成長する。5の人生テーマは「変化を恐れずに生きる」こと。" },
  { number: 6, keyword: "奉仕・愛・責任", desc: "愛と責任で人を育てるナーチャラー。家族・コミュニティ・ケアが人生の中心軸になりやすい。" },
  { number: 7, keyword: "探求・知性・精神性", desc: "真実を探求する哲学者。深く考え、分析し、内省する。7の使命は「表面の先にある真実を掘り下げる」こと。" },
  { number: 8, keyword: "達成・権力・豊かさ", desc: "大きな目標に向かって動くアチーバー。リーダーシップ・財・権力の正しい使い方が人生のテーマ。" },
  { number: 9, keyword: "完成・慈愛・解放", desc: "全体を見渡し、愛で包む完成者。人道的な使命感と広い視野を持つ。9の人生テーマは「手放すことで与える」こと。" },
  { number: 11, keyword: "直感・インスピレーション・使命", desc: "マスターナンバー。高い直感力と霊的な感受性を持つ。11の使命は「インスピレーションを人々に届ける」こと。プレッシャーを伴うが、影響力が大きい。" },
  { number: 22, keyword: "実現・建設・変革", desc: "マスターナンバー。大きなビジョンを現実に落とし込む力を持つ「マスタービルダー」。社会を動かすスケールの仕事に引き寄せられる。" },
  { number: 33, keyword: "慈愛・奉仕・教え", desc: "マスターナンバー。純粋な愛と慈悲で世界に奉仕する「マスターティーチャー」。稀な数字で、その使命は大きく、精神的な成熟を要する。" },
];

function HowToCalculate() {
  return (
    <div className="bg-[#111111] text-[#F9F9F7] p-8 md:p-12">
      <p className="text-xs tracking-[0.2em] text-[#888888] mb-4 uppercase">How to Calculate</p>
      <h3 className="font-display text-3xl font-light mb-6">ライフパスナンバーの計算法</h3>
      <p className="text-sm text-[#888888] leading-loose tracking-wider mb-8">
        生年月日のすべての数字を足し合わせ、1桁（または11・22・33）になるまで繰り返す。
      </p>
      <div className="bg-[#F9F9F7] p-6 font-mono text-sm text-[#888888] leading-loose">
        <p className="text-[#888888] text-xs mb-2">例：1990年3月15日生まれの場合</p>
        <p>1 + 9 + 9 + 0 + 0 + 3 + 1 + 5 = 28</p>
        <p>2 + 8 = <span className="text-[#111111] font-bold">10</span></p>
        <p>1 + 0 = <span className="text-[#111111] font-bold">1</span></p>
        <p className="mt-4 text-[#111111]">→ ライフパスナンバーは <span className="text-[#888888]">1</span></p>
      </div>
      <p className="text-xs text-[#888888] tracking-wider mt-4">
        ※ 途中で11・22・33が出た場合はそのまま保持する（マスターナンバー）
      </p>
    </div>
  );
}

export default function NumerologyPage() {
  return (
    <>
      <div className="grid border-b border-[#111111]" style={{ gridTemplateColumns: "52px 1fr" }}>
        <div className="border-r border-[#E0DDD6] flex items-center justify-center bg-[#F4F4F2]">
          <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#BBB", whiteSpace: "nowrap" }}>
            Numerology — MyJiku
          </span>
        </div>
        <div className="px-4 md:px-12 py-8 md:py-16">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#888888] mb-5">02 — Numerology</p>
          <h1 className="font-display font-light leading-[0.95]" style={{ fontSize: "clamp(44px,5.5vw,76px)" }}>
            数秘術
          </h1>
          <p className="text-sm text-[#555555] leading-loose tracking-wider max-w-lg mt-6">
            ピタゴラスに遡る数の哲学をルーツに持つ、数秘術（ニューメロロジー）。
            生年月日と名前を数字に還元することで、人生のテーマ・使命・魂の欲求を読み解く。
            シンプルな計算の先に、驚くほど核心を突く自己像が浮かび上がる。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Overview */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-display italic text-[#888888] text-lg mb-4">overview</p>
              <h2 className="font-display text-4xl font-light mb-6">数秘術とは</h2>
              <p className="text-sm text-[#555555] leading-loose tracking-wider mb-4">
                数秘術（すうひじゅつ）は、「数字には固有の振動数と意味がある」という哲学に基づく。
                生年月日の各数字を足して一桁（または特定の二桁）に還元することで、
                「ライフパスナンバー」と呼ばれる最重要数が導き出される。
              </p>
              <p className="text-sm text-[#555555] leading-loose tracking-wider mb-4">
                ライフパスナンバー以外にも、「名前から導く魂の数字（ソウルナンバー）」
                「外側への表現（パーソナリティナンバー）」「人生全体の使命（デスティニーナンバー）」など、
                複数の数字を組み合わせてより立体的な自己像を描くことができる。
              </p>
            </div>
            <HowToCalculate />
          </div>
        </section>

        {/* Simulation */}
        <section className="mb-20">
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-8">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">シミュレーション</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
            <span className="text-[8px] tracking-[0.3em] text-[#CCC] mr-5">Try it</span>
          </div>
          <LifePathCalculator />
        </section>

        {/* Key numbers */}
        <section className="mb-20">
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-10">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">core numbers</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
          </div>
          <h2 className="font-display text-4xl font-light mb-10 text-center">主要な数字の種類</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EAEAE6]">
            {[
              {
                name: "ライフパスナンバー",
                en: "Life Path Number",
                source: "生年月日から計算",
                desc: "数秘術で最も重要な数字。その人が今世で歩む人生のテーマ・使命・方向性を示す。困難にぶつかったとき、この数字に立ち返ることで本来の軸を思い出せる。",
              },
              {
                name: "デスティニーナンバー",
                en: "Destiny Number",
                source: "フルネームから計算（ゲマトリア）",
                desc: "名前の各アルファベットに対応する数字を合計して導く。人生全体で「果たすべき役割・表現すべき使命」を示す。名前に込められた宿命の数字。",
              },
              {
                name: "ソウルナンバー",
                en: "Soul Urge Number",
                source: "名前の母音から計算",
                desc: "名前の母音のみを使って計算する。外には見えにくい「魂が本当に欲しているもの・内なる動機」を表す。モチベーションの源泉を知るための数字。",
              },
              {
                name: "パーソナリティナンバー",
                en: "Personality Number",
                source: "名前の子音から計算",
                desc: "名前の子音から計算し、他者があなたを「どう見るか・どう感じるか」という外側への印象を示す。ライフパスナンバーとの違いがペルソナの厚みを教えてくれる。",
              },
            ].map((item) => (
              <div key={item.name} className="bg-[#F4F4F2] p-8">
                <p className="text-xs tracking-[0.2em] text-[#888888] mb-1 uppercase">{item.en}</p>
                <h3 className="font-display text-2xl font-light mb-2">{item.name}</h3>
                <p className="text-xs text-[#111111] tracking-wider mb-4">導出元：{item.source}</p>
                <p className="text-sm text-[#555555] leading-loose tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Life path numbers */}
        <section>
          <h2 className="font-display text-4xl font-light mb-2">ライフパスナンバーの意味</h2>
          <p className="text-sm text-[#888888] mb-10 tracking-wider">1〜9、そしてマスターナンバー11・22・33</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAEAE6]">
            {lifePathMeanings.map((item) => (
              <div key={item.number} className="bg-[#F4F4F2] p-8">
                <p className="font-display text-6xl text-[#CCCCCC] font-light mb-3 leading-none">
                  {item.number}
                </p>
                <p className="text-xs text-[#111111] tracking-wider mb-3">{item.keyword}</p>
                <p className="text-sm text-[#555555] leading-loose tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
