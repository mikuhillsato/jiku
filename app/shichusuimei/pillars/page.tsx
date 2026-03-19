import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "年柱・月柱・日柱・時柱 | 四柱推命",
  description: "四柱推命の四つの柱——年柱・月柱・日柱・時柱それぞれが表すテーマと、命式の読み方の基礎。",
};

const pillars = [
  {
    kanji: "年",
    name: "年柱",
    en: "Year Pillar",
    theme: "先祖・社会・先天的な宿命の枠組み",
    desc: "生まれた年から導く柱。祖父母・先祖から受け継いだ気質、社会的な背景、人生全体の「器」の大きさを表す。幼少期〜10代の環境にも関連する。先天的な運命の枠を示す柱だが、それが「制限」ではなく「素地（そじ）」として機能する。",
    selfQuestion: "私はどんな「時代と風土」に生まれたか？その影響を受け継いでいる部分はどこか？",
  },
  {
    kanji: "月",
    name: "月柱",
    en: "Month Pillar",
    theme: "親・環境・才能の出方",
    desc: "生まれた月から導く柱。両親（特に父親・母親との関係）、育った家庭環境、社会に出るための「手段・スキル」を表す。命式の中で才能と労働の傾向が最もよく出る柱とも言われ、20〜30代の仕事運とも連動する。",
    selfQuestion: "私が自然に身につけた資質・スキルは何か？原家族からどんな影響を受けているか？",
  },
  {
    kanji: "日",
    name: "日柱（日主）",
    en: "Day Pillar / Day Master",
    theme: "本質の自己・パートナーシップ",
    desc: "生まれた日から導く柱。四柱推命において最も重要な柱。日柱の天干（十干）が「日主」と呼ばれ、あなたの本質的な性質・気質・生き方の核心を表す。日柱の地支はパートナーや配偶者の傾向も示す。命式全体を日主の立場から読み解くのが四柱推命の基本。",
    selfQuestion: "私の本質は何か？自然体の私はどんな人間か？パートナーとどう関わる傾向があるか？",
  },
  {
    kanji: "時",
    name: "時柱",
    en: "Hour Pillar",
    theme: "子ども・晩年・内なる欲求",
    desc: "生まれた時刻（2時間区切り）から導く柱。子どもや部下との関係、晩年の運気、そして「自分の奥深くにある欲求・意志」を表す。命式の中で最も「未来・これから」の方向性を示す柱とも言われる。正確な出生時刻が必要なため、不明な場合はこの柱を省いて読む。",
    selfQuestion: "私が本当に追いかけたいものは何か？老後・晩年に向けて大切にしたいことは？",
  },
];

export default function PillarsPage() {
  return (
    <>
      <div className="border-b border-[#E0DDD6]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-xs text-[#888888] tracking-wider mb-4">
            <Link href="/shichusuimei" className="hover:text-[#111111] transition-colors">四柱推命</Link>
            <span>/</span>
            <span>年柱・月柱・日柱・時柱</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-[#111111] mb-4">
            四つの柱
          </h1>
          <p className="text-sm text-[#555555] leading-loose tracking-wider max-w-lg">
            四柱推命の「四柱」とは、年・月・日・時の四つの柱のこと。
            それぞれの柱に天干（十干）と地支（十二支）が配置され、計8文字の命式が生まれる。
            この命式が、その人の人生の設計図となる。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Visual of the four pillars */}
        <div className="mb-20">
          <div className="grid grid-cols-4 gap-px bg-[#EAEAE6] mb-4">
            {pillars.map((p) => (
              <div key={p.kanji} className="bg-[#111111] text-[#F9F9F7] p-6 text-center">
                <p className="font-display text-5xl text-[#888888] mb-2">{p.kanji}</p>
                <p className="text-xs tracking-widest text-[#888888]">柱</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-px bg-[#EAEAE6] mb-4">
            {["天干 (甲〜癸)", "天干 (甲〜癸)", "天干 (甲〜癸)", "天干 (甲〜癸)"].map((t, i) => (
              <div key={i} className="bg-[#F4F4F2] p-4 text-center">
                <p className="text-xs text-[#888888] tracking-wider">{t}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-px bg-[#EAEAE6]">
            {["地支 (子〜亥)", "地支 (子〜亥)", "地支 (子〜亥)", "地支 (子〜亥)"].map((t, i) => (
              <div key={i} className="bg-[#F4F4F2] p-4 text-center">
                <p className="text-xs text-[#888888] tracking-wider">{t}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#888888] tracking-wider text-center mt-4">
            計8文字（天干4文字 + 地支4文字）が命式を構成する
          </p>
        </div>

        {/* Each pillar */}
        <div className="space-y-px bg-[#EAEAE6]">
          {pillars.map((pillar) => (
            <div key={pillar.name} className="bg-[#F4F4F2] p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8">
                <div className="text-center md:text-left">
                  <p className="font-display text-7xl text-[#CCCCCC] font-light leading-none mb-2">
                    {pillar.kanji}
                  </p>
                  <p className="text-xs tracking-[0.2em] text-[#888888] uppercase">{pillar.en}</p>
                </div>
                <div>
                  <h2 className="font-display text-3xl font-light mb-2">{pillar.name}</h2>
                  <p className="text-xs text-[#111111] tracking-wider mb-5">{pillar.theme}</p>
                  <p className="text-sm text-[#555555] leading-loose tracking-wider mb-6">{pillar.desc}</p>
                  <div className="bg-[#EAEAE6] p-4">
                    <p className="text-xs tracking-[0.2em] text-[#888888] mb-2 uppercase">Self-reflection</p>
                    <p className="text-sm text-[#555555] leading-loose tracking-wider italic">{pillar.selfQuestion}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on day master */}
        <div className="mt-12 border border-[#D0CCC4] p-8">
          <p className="text-xs tracking-[0.2em] text-[#111111] mb-3 uppercase">Key Point — 日主について</p>
          <p className="text-sm text-[#555555] leading-loose tracking-wider">
            四柱推命で最も重要なのが「日主（にっしゅ）」——日柱の天干。
            命式全体は「日主がどんな状況にあるか」という視点で読み解く。
            日主が旺盛か（強い状態か）、衰弱か（弱い状態か）で、同じ星が出ていても意味が変わる。
            まずは自分の日主が何か（甲・乙・丙……のどれか）を知ることが、四柱推命を学ぶ最初の一歩。
          </p>
        </div>
      </div>
    </>
  );
}
