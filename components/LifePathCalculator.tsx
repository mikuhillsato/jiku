"use client";

import { useState } from "react";

const meanings: Record<number, { keyword: string; desc: string }> = {
  1: { keyword: "開拓・先駆・独立", desc: "新しい道を切り拓くリーダー。自立心が強く、最初に動く勇気を持つ。人生テーマは「自分の道を自分で選ぶ」こと。" },
  2: { keyword: "調和・協力・感受性", desc: "人と人をつなぐ調停者。繊細な感受性と共感力で周囲の空気を読む。2の人生テーマは「関係性の中で本物の自分を保つ」こと。" },
  3: { keyword: "表現・創造・喜び", desc: "表現することで人を喜ばせるエンターテイナー。言葉・アート・音楽など、創造的な出力が人生の核になる。" },
  4: { keyword: "構築・実直・安定", desc: "着実に土台を築くビルダー。ルール・構造・コツコツとした積み上げを好む。4の使命は「揺るぎない基盤を作る」こと。" },
  5: { keyword: "自由・変化・冒険", desc: "変化と自由を愛するエクスプローラー。多様な経験を通じて成長する。5の人生テーマは「変化を恐れずに生きる」こと。" },
  6: { keyword: "奉仕・愛・責任", desc: "愛と責任で人を育てるナーチャラー。家族・コミュニティ・ケアが人生の中心軸になりやすい。" },
  7: { keyword: "探求・知性・精神性", desc: "真実を探求する哲学者。深く考え、分析し、内省する。7の使命は「表面の先にある真実を掘り下げる」こと。" },
  8: { keyword: "達成・権力・豊かさ", desc: "大きな目標に向かって動くアチーバー。リーダーシップ・財・権力の正しい使い方が人生のテーマ。" },
  9: { keyword: "完成・慈愛・解放", desc: "全体を見渡し、愛で包む完成者。人道的な使命感と広い視野を持つ。9の人生テーマは「手放すことで与える」こと。" },
  11: { keyword: "直感・インスピレーション・使命", desc: "マスターナンバー。高い直感力と霊的な感受性を持つ。11の使命は「インスピレーションを人々に届ける」こと。" },
  22: { keyword: "実現・建設・変革", desc: "マスターナンバー。大きなビジョンを現実に落とし込む「マスタービルダー」。社会を動かすスケールの仕事に引き寄せられる。" },
  33: { keyword: "慈愛・奉仕・教え", desc: "マスターナンバー。純粋な愛と慈悲で世界に奉仕する「マスターティーチャー」。その使命は大きく、精神的な成熟を要する。" },
};

function calcLifePath(dateStr: string): number | null {
  const digits = dateStr.replace(/-/g, "").split("").map(Number);
  if (digits.length !== 8 || digits.some(isNaN)) return null;

  // Sum all digits
  let sum = digits.reduce((a, b) => a + b, 0);

  // Reduce, but keep master numbers
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  return sum;
}

export default function LifePathCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    setResult(null);
    setSteps([]);

    if (!date) {
      setError("生年月日を入力してください");
      return;
    }

    const digits = date.replace(/-/g, "").split("").map(Number);
    const stepList: string[] = [];

    // Step 1
    const sum1 = digits.reduce((a, b) => a + b, 0);
    stepList.push(`${digits.join(" + ")} = ${sum1}`);

    let current = sum1;
    while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
      const d = String(current).split("").map(Number);
      const next = d.reduce((a, b) => a + b, 0);
      stepList.push(`${d.join(" + ")} = ${next}`);
      current = next;
    }

    setSteps(stepList);
    setResult(current);
  }

  const meaning = result !== null ? meanings[result] : null;

  return (
    <div className="bg-[#0D1028] text-[#E8E5F5] p-8 md:p-12">
      <p className="text-xs tracking-[0.2em] text-[#B8AEED] mb-3 uppercase">Calculator</p>
      <h3 className="font-display text-3xl font-light mb-2">ライフパスナンバーを調べる</h3>
      <p className="text-xs text-[#8888AA] tracking-wider mb-8">生年月日を入力してください</p>

      <div className="flex gap-3 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 bg-[#0A0B15] text-[#E8E5F5] border border-[#1E2240] px-4 py-3 text-sm tracking-wider focus:outline-none focus:border-[#8B7FCC] transition-colors"
        />
        <button
          onClick={calculate}
          className="px-6 py-3 bg-[#8B7FCC] text-[#E8E5F5] text-xs tracking-[0.2em] hover:bg-[#B8AEED] transition-colors duration-300 whitespace-nowrap"
        >
          計算する
        </button>
      </div>

      {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

      {steps.length > 0 && (
        <div className="bg-[#040509] p-5 mb-6 font-mono text-sm text-[#B8AEED] leading-loose">
          {steps.map((step, i) => (
            <p key={i} className={i === steps.length - 1 ? "text-[#E8E5F5] font-bold" : ""}>
              {step}
            </p>
          ))}
        </div>
      )}

      {result !== null && meaning && (
        <div className="border border-[#1E2240] p-6 animate-fade-in">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-display text-7xl text-[#B8AEED] font-light leading-none">
              {result}
            </span>
            <div>
              <p className="text-xs text-[#8888AA] tracking-wider mb-1">Life Path Number</p>
              <p className="text-sm text-[#B8AEED] tracking-wider">{meaning.keyword}</p>
            </div>
          </div>
          <p className="text-sm text-[#303860] leading-loose tracking-wider">{meaning.desc}</p>
        </div>
      )}
    </div>
  );
}
