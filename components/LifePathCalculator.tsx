"use client";

import { useState } from "react";

// ── Pythagorean chart ──────────────────────────────────────────────────────
const PYTHAGOREAN: Record<string, number> = {
  a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
  j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
  s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8,
};
const VOWELS = new Set(["a","e","i","o","u"]);

// ── Core meanings (shared base, role interpreted in reading) ───────────────
const meanings: Record<number, { keyword: string; lifePath: string; destiny: string; soul: string; personality: string }> = {
  1: {
    keyword: "開拓・先駆・独立",
    lifePath: "新しい道を自分で切り拓くことが人生のテーマ。リーダーシップと自立心が問われ、他者に依存せず自らの判断で進む力を育てることが使命。",
    destiny: "先駆者・開拓者としての役割を外の世界で担う。独自の視点でゼロから生み出すことで本領を発揮する。",
    soul:    "魂の奥底では「誰よりも先に動きたい」「自分だけの道を歩みたい」という渇望が燃えている。",
    personality: "他者には「自信があり、意志が強く、独立心が高い人」として映る。リーダー的な雰囲気を自然と放ち、初対面でも存在感を示す。",
  },
  2: {
    keyword: "調和・協力・感受性",
    lifePath: "人間関係と協調の中で学び、成長することが人生テーマ。繊細な感受性と共感力を磨き、「関係性の中で本物の自分を保つ」ことが使命。",
    destiny: "橋渡し役・調停者として、対立を和らげ人々をつなぐことを求められる。",
    soul:    "魂が求めているのは「深くつながること」「誰かとともに在ること」という温かな一体感。",
    personality: "他者には「穏やか・気配り上手・話しやすい人」として映る。第一印象は柔らかく、人を安心させる空気を持つ。",
  },
  3: {
    keyword: "表現・創造・喜び",
    lifePath: "表現と創造を通じて世界に喜びをもたらすことが使命。言葉・アート・音楽など、あらゆる創造的な出力が人生の核になる。",
    destiny: "エンターテイナー・クリエイターとして、作ることや伝えることで人々を明るくする役割を持つ。",
    soul:    "魂の渇望は「自分を表現すること」「作り出す喜び」への純粋な衝動。",
    personality: "他者には「明るく、ユニークで、話が面白い人」として映る。エネルギッシュな印象を与え、その場の空気を明るくする存在感がある。",
  },
  4: {
    keyword: "構築・実直・安定",
    lifePath: "着実に土台を築くことが人生テーマ。ルール・構造・地道な積み上げを通じて「揺るぎない基盤を作る」使命を持つ。",
    destiny: "社会の仕組みや組織を支える実務家として、信頼される基盤を構築する役割を担う。",
    soul:    "魂が真に求めているのは「安定」「確かなもの」「揺らがない土台」への安心感。",
    personality: "他者には「真面目・誠実・頼れる人」として映る。落ち着きと責任感が外見に滲み出し、信頼を得やすい第一印象を持つ。",
  },
  5: {
    keyword: "自由・変化・冒険",
    lifePath: "変化と多様な経験を通じて成長することが人生テーマ。「変化を恐れずに生きる」ことが使命で、自由の中に意味を見出す。",
    destiny: "旅人・変革者として、新しい風を吹き込み固定観念を破る役割を持つ。",
    soul:    "魂が求めているのは「縛られない自由」「次の体験への好奇心」という解放感。",
    personality: "他者には「自由奔放・魅力的・予測不能な人」として映る。型にはまらない雰囲気が独特の引力を生む。",
  },
  6: {
    keyword: "奉仕・愛・責任",
    lifePath: "愛と責任で人を育て支えることが人生テーマ。家族・コミュニティへのケアが人生の中心軸になる。",
    destiny: "ヒーラー・養育者として、人を癒し育てることで外の世界に貢献する使命を持つ。",
    soul:    "魂が求めているのは「誰かの役に立つこと」「愛し愛されること」という温かい繋がり。",
    personality: "他者には「温かく、面倒見がよく、安心感を与える人」として映る。自然と母性・父性的な包容力が外に滲み出す。",
  },
  7: {
    keyword: "探求・知性・精神性",
    lifePath: "真実の探求と内省が人生テーマ。「表面の先にある真実を掘り下げる」ことが使命で、哲学・分析・精神性に導かれる。",
    destiny: "研究者・哲学者として、深い洞察を外の世界にもたらす役割を持つ。",
    soul:    "魂の渇望は「本当のことを知ること」「真実の核に触れること」への止まらない探求心。",
    personality: "他者には「ミステリアス・知的・近づきがたい」として映ることが多い。内省的な雰囲気が「何か深いものを知っている人」という印象を生む。",
  },
  8: {
    keyword: "達成・権力・豊かさ",
    lifePath: "大きな目標に向かって邁進することが人生テーマ。リーダーシップと財、権力の正しい使い方を学ぶ。",
    destiny: "経営者・アチーバーとして、物質的・社会的な成果を通じて世界に影響を与える使命を担う。",
    soul:    "魂が求めているのは「達成感」「影響力を持つこと」「本物の力を手に入れること」。",
    personality: "他者には「力強く、自信に満ち、成功者の雰囲気を持つ人」として映る。存在感と威圧感が混在し、有能さが外側に滲み出る。",
  },
  9: {
    keyword: "完成・慈愛・解放",
    lifePath: "全体を愛で包む「完成者」として生きることが人生テーマ。「手放すことで与える」ことを学ぶ使命を持つ。",
    destiny: "人道的なビジョンを持つ啓発者として、広い愛と叡智を社会に還元する役割を持つ。",
    soul:    "魂が求めているのは「すべてを受け入れること」「人類と繋がる感覚」という境界のない愛。",
    personality: "他者には「大らか・包容力がある・老成した雰囲気の人」として映る。年齢に関わらず、深みのある落ち着きが漂う。",
  },
  11: {
    keyword: "直感・インスピレーション・使命",
    lifePath: "高い直感力と霊的感受性で人々にインスピレーションを届けることが使命。マスターナンバーゆえのプレッシャーとともに、大きな影響力を持つ。",
    destiny: "ビジョナリー・インスピレーターとして、見えない世界のメッセージを人々に届ける役割を担う。",
    soul:    "魂の渇望は「より高次なものとつながること」「直感が示す道を歩むこと」。",
    personality: "他者には「独特のオーラがあり、何か特別な人」として映る。近寄りがたさと引力が共存し、忘れられない印象を残す。",
  },
  22: {
    keyword: "実現・建設・変革",
    lifePath: "大きなビジョンを現実に落とし込む「マスタービルダー」の使命を持つ。社会を動かすスケールの仕事と共鳴する。",
    destiny: "理想を現実に変える建設者として、社会に永続的な構造物（仕組み・組織・作品）を残す役割を持つ。",
    soul:    "魂が求めているのは「壮大な夢を実現させること」「世界を変える何かを作り上げること」。",
    personality: "他者には「スケールが大きく、実行力があり、頼りになる人」として映る。言葉より行動で信頼を積み上げるタイプ。",
  },
  33: {
    keyword: "慈愛・奉仕・教え",
    lifePath: "純粋な愛と慈悲で世界に奉仕する「マスターティーチャー」の使命。稀な数字で、精神的な成熟を要する。",
    destiny: "教師・治癒者として、愛の力で人々の魂に光を届ける最高位の使命を担う。",
    soul:    "魂の渇望は「すべての存在を等しく愛すること」「愛そのものとして在ること」。",
    personality: "他者には「慈悲深く、温かく、近くにいると安らぐ人」として映る。無条件の優しさが外に溢れ出し、多くの人を引き寄せる。",
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────
function reduceNumber(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return n;
}

function calcLifePath(dateStr: string): { result: number; steps: string[] } | null {
  const digits = dateStr.replace(/-/g, "").split("").map(Number);
  if (digits.length !== 8 || digits.some(isNaN)) return null;

  const steps: string[] = [];
  let current = digits.reduce((a, b) => a + b, 0);
  steps.push(`${digits.join(" + ")} = ${current}`);

  while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
    const d = String(current).split("").map(Number);
    const next = d.reduce((a, b) => a + b, 0);
    steps.push(`${d.join(" + ")} = ${next}`);
    current = next;
  }
  return { result: current, steps };
}

function calcDestiny(name: string): number | null {
  const letters = name.toLowerCase().replace(/[^a-z]/g, "").split("");
  if (letters.length === 0) return null;
  const sum = letters.reduce((a, l) => a + (PYTHAGOREAN[l] ?? 0), 0);
  return reduceNumber(sum);
}

function calcSoul(name: string): number | null {
  const letters = name.toLowerCase().split("").filter(l => VOWELS.has(l));
  if (letters.length === 0) return null;
  const sum = letters.reduce((a, l) => a + (PYTHAGOREAN[l] ?? 0), 0);
  return reduceNumber(sum);
}

function calcPersonality(name: string): number | null {
  const letters = name.toLowerCase().replace(/[^a-z]/g, "").split("").filter(l => !VOWELS.has(l));
  if (letters.length === 0) return null;
  const sum = letters.reduce((a, l) => a + (PYTHAGOREAN[l] ?? 0), 0);
  return reduceNumber(sum);
}

function buildIntegration(lp: number, dest: number, soul: number, pers: number): string {
  const lpKw   = meanings[lp]?.keyword.split("・")[0]   ?? "";
  const destKw = meanings[dest]?.keyword.split("・")[0] ?? "";
  const soulKw = meanings[soul]?.keyword.split("・")[0] ?? "";
  const persKw = meanings[pers]?.keyword.split("・")[0] ?? "";

  let dynamic = "";
  if (lp === dest && dest === soul) {
    dynamic = `ライフパス・デスティニー・ソウルがすべて${lp}に収束している。これは極めて稀な一致で、人生テーマ・外的使命・魂の渇望が完全に統合されていることを意味する。迷いが少ない反面、その一つの軸への集中が人生全体の方向性を決定づける。`;
  } else if (lp === soul) {
    dynamic = `ライフパスとソウルが同じ${lp}は、人生のテーマと魂の渇望が一致していることを意味する。モチベーションの源泉と人生の方向性が重なり、デスティニー${dest}が求める外の役割を担うほどに内側が満たされる構造にある。`;
  } else if (dest === soul) {
    dynamic = `デスティニーとソウルが同じ${dest}であることは、外への使命と内なる渇望が同じ方向を向いていることを意味する。「やりたいこと」と「求められること」のズレが少なく、ライフパス${lp}の学びを深めるにつれてその一致した軸がさらに力を持つ。`;
  } else if (lp === dest) {
    dynamic = `ライフパスとデスティニーが同じ${lp}は、人生テーマと社会での役割が自然に重なることを意味する。ソウル${soul}が示す「${soulKw}」への内なる渇望を大切にすることが、外側の成果をより深い充実に変えるカギとなる。`;
  } else {
    dynamic = `ライフパス・デスティニー・ソウルがそれぞれ異なる方向を示しているが、これは矛盾ではなく多層的な豊かさだ。「${lpKw}」という人生の学び、「${destKw}」という外への使命、「${soulKw}」という内なる渇望——この三つを意識しながら生きることで、立体的な人生が開かれる。`;
  }

  const persDiff = pers !== soul
    ? `パーソナリティ${pers}が示す「${persKw}」という外からの印象はソウルの内面と異なるが、そのギャップ自体が他者を惹きつける深みになる。`
    : `パーソナリティとソウルが同じ${pers}であることは、内面と外からの印象が自然に一致していることを意味する。「見たまま」の人という信頼感が人間関係の土台になる。`;

  return (
    `ライフパス${lp}は「${lpKw}」というテーマで人生を歩む方向性を示す。` +
    `デスティニー${dest}は外の世界で「${destKw}」を体現する役割を求め、` +
    `ソウル${soul}の根底には「${soulKw}」への深い渇望が流れている。` +
    dynamic +
    persDiff
  );
}

// ── Component ──────────────────────────────────────────────────────────────
export default function LifePathCalculator() {
  const [date,   setDate]   = useState("");
  const [name,   setName]   = useState("");
  const [lpData,      setLpData]      = useState<{ result: number; steps: string[] } | null>(null);
  const [destiny,     setDestiny]     = useState<number | null>(null);
  const [soul,        setSoul]        = useState<number | null>(null);
  const [personality, setPersonality] = useState<number | null>(null);
  const [error,       setError]       = useState("");

  function calculate() {
    setError("");
    setLpData(null);
    setDestiny(null);
    setSoul(null);
    setPersonality(null);

    if (!date) { setError("生年月日を入力してください"); return; }

    const lp = calcLifePath(date);
    if (!lp) { setError("正しい日付を入力してください"); return; }
    setLpData(lp);

    if (name.trim()) {
      setDestiny(calcDestiny(name));
      setSoul(calcSoul(name));
      setPersonality(calcPersonality(name));
    }
  }

  const lpNum   = lpData?.result ?? null;
  const hasName = destiny !== null && soul !== null && personality !== null;
  const integration = lpNum !== null && hasName
    ? buildIntegration(lpNum, destiny!, soul!, personality!)
    : null;

  return (
    <div className="border border-[#E0DDD6]">
      {/* Header */}
      <div className="flex items-center h-[38px] border-b border-[#111111] px-5">
        <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-4">数秘術 計算</span>
        <div className="flex-1 h-px bg-[#E0DDD6]" />
        <span className="text-[8px] tracking-[0.3em] text-[#CCC] ml-4">Numerology</span>
      </div>

      <div className="p-6 md:p-8">
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">
              生年月日
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-[#E0DDD6] px-3 py-2.5 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">
              フルネーム（ローマ字） <span className="text-[#BBBBBB] normal-case">— ソウル・デスティニー用・任意</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="例: YUKI TANAKA"
              className="w-full border border-[#E0DDD6] px-3 py-2.5 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors placeholder:text-[#CCCCCC]"
            />
            <p className="text-[9px] text-[#AAAAAA] tracking-wider mt-1.5">
              姓名の順番・スペースの有無は結果に影響しません
            </p>
          </div>
        </div>
        <button
          onClick={calculate}
          className="mt-4 px-6 py-2.5 bg-[#111111] text-[#F9F9F7] text-[9px] tracking-[0.3em] uppercase hover:bg-[#333] transition-colors"
        >
          計算する
        </button>

        {error && <p className="text-xs text-red-500 mt-3">{error}</p>}

        {/* Life Path calculation steps */}
        {lpData && (
          <div className="mt-6 bg-[#F4F4F2] p-4 font-mono text-sm text-[#888888] leading-loose">
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#AAAAAA] mb-2">Life Path — 計算過程</p>
            {lpData.steps.map((step, i) => (
              <p key={i} className={i === lpData.steps.length - 1 ? "text-[#111111] font-bold" : ""}>
                {step}
              </p>
            ))}
          </div>
        )}

        {/* Four numbers */}
        {lpNum !== null && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E0DDD6]">
            <NumberCard num={lpNum} label="Life Path" labelJa="ライフパス" role="lifePath" />
            {hasName ? (
              <NumberCard num={destiny!} label="Destiny" labelJa="デスティニー" role="destiny" />
            ) : (
              <EmptyCard label="Destiny" labelJa="デスティニー" hint="名前を入力" />
            )}
            {hasName ? (
              <NumberCard num={soul!} label="Soul" labelJa="ソウル" role="soul" />
            ) : (
              <EmptyCard label="Soul" labelJa="ソウル" hint="母音から計算" />
            )}
            {hasName ? (
              <NumberCard num={personality!} label="Personality" labelJa="パーソナリティ" role="personality" />
            ) : (
              <EmptyCard label="Personality" labelJa="パーソナリティ" hint="子音から計算" />
            )}
          </div>
        )}

        {/* Integration reading */}
        {integration && (
          <div className="mt-6 bg-[#111111] p-6 md:p-8">
            <p className="text-[8px] tracking-[0.5em] uppercase mb-5 text-[#555555]">
              Integration — 三つの数字が語ること
            </p>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "15px", fontWeight: 300, lineHeight: 2.1,
              letterSpacing: "0.04em", color: "#C8C4B8",
            }}>
              {integration}
            </p>
            <p className="text-[8px] tracking-[0.3em] mt-5 pt-4 border-t border-[#222222] text-[#333333]">
              ※ ライフパス：生年月日 / デスティニー：全文字 / ソウル：母音 / パーソナリティ：子音（ピタゴラス式）
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────
function NumberCard({
  num, label, labelJa, role,
}: {
  num: number;
  label: string;
  labelJa: string;
  role: "lifePath" | "destiny" | "soul" | "personality";
}) {
  const m = meanings[num];
  return (
    <div className="bg-[#F4F4F2] p-6">
      <p className="text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-0.5">{label}</p>
      <p className="text-[9px] tracking-wider text-[#AAAAAA] mb-3">{labelJa}</p>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-display text-6xl font-light text-[#CCCCCC] leading-none">{num}</span>
        <span className="text-xs text-[#111111] tracking-wider">{m?.keyword}</span>
      </div>
      <p className="text-sm text-[#555555] leading-loose tracking-wider">{m?.[role]}</p>
    </div>
  );
}

function EmptyCard({ label, labelJa, hint }: { label: string; labelJa: string; hint: string }) {
  return (
    <div className="bg-[#F9F9F7] p-6 flex flex-col justify-center">
      <p className="text-[8px] tracking-[0.3em] uppercase text-[#CCCCCC] mb-0.5">{label}</p>
      <p className="text-[9px] tracking-wider text-[#DDDDDD] mb-3">{labelJa}</p>
      <p className="text-xs text-[#CCCCCC] tracking-wider leading-loose">{hint}</p>
    </div>
  );
}
