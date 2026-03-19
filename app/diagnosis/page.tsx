import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import IntegratedSim from "@/components/IntegratedSim";

export const metadata: Metadata = {
  title: "統合才能鑑定 | MyJiku",
  description: "西洋占星術・数秘術・九星気学の三つを組み合わせ、あなたの才能の核心を多角的に読み解く統合鑑定。",
};

const systems = [
  {
    system: "数秘術",
    en: "Numerology",
    role: "何のために生きるか",
    desc: "ライフパス・ソウルナンバーから人生のテーマと魂の動機を読む。「使命の軸」を示す占術。",
  },
  {
    system: "九星気学",
    en: "Nine Star Ki",
    role: "どんな環境で才能が活きるか",
    desc: "本命星・月命星から才能が最大化する役割と環境を示す。「才能の場所」を示す占術。",
  },
  {
    system: "西洋占星術",
    en: "Western Astrology",
    role: "どんな気質・心理を持つか",
    desc: "太陽星座から外の世界との関わり方と心理的な深層を読む。「才能の器」を示す占術。",
  },
];

export default function DiagnosisPage() {
  return (
    <>
      <div className="grid border-b border-[#111111]" style={{ gridTemplateColumns: "52px 1fr" }}>
        <div className="border-r border-[#E0DDD6] flex items-center justify-center bg-[#F4F4F2]">
          <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#BBB", whiteSpace: "nowrap" }}>
            Integrated Reading — MyJiku
          </span>
        </div>
        <div className="px-4 md:px-12 py-8 md:py-16">
          <h1 className="font-display font-light leading-[0.95]" style={{ fontSize: "clamp(36px,4.5vw,68px)" }}>
            統合才能鑑定
          </h1>
          <p className="text-sm text-[#555555] leading-loose tracking-wider max-w-lg mt-6">
            西洋占星術・数秘術・九星気学——三つの占術を重ね合わせることで、一つでは見えなかった才能の核心が浮かび上がる。
            生年月日と名前を入力するだけで、複数の視点を統合した鑑定結果を提供する。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Three systems */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAEAE6]">
            {systems.map(item => (
              <div key={item.system} className="bg-[#F9F9F7] p-6">
                <p className="text-[8px] tracking-[0.35em] uppercase text-[#AAAAAA] mb-2">{item.en}</p>
                <h3 className="font-display text-lg font-light mb-1">{item.system}</h3>
                <p className="text-xs text-[#111111] tracking-wider mb-3">{item.role}</p>
                <p className="text-xs text-[#888888] leading-loose">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Simulator */}
        <section className="mb-20">
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-8">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">統合鑑定</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
            <span className="text-[8px] tracking-[0.3em] text-[#CCC] mr-5">Try it</span>
          </div>
          <Suspense fallback={<div className="h-40 bg-[#F4F4F2] animate-pulse" />}>
            <IntegratedSim />
          </Suspense>
        </section>

        {/* Links to individual systems */}
        <section>
          <div className="flex items-center h-[38px] border-t border-b border-[#111111] mb-0">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-5">各占術を深く学ぶ</span>
            <div className="flex-1 h-px bg-[#E0DDD6]" />
          </div>
          {[
            { href: "/astrology",  title: "西洋占星術", titleEn: "Western Astrology", desc: "惑星・星座・ハウスの三層構造。ホロスコープが示す深層心理と人生テーマ。" },
            { href: "/numerology", title: "数秘術",     titleEn: "Numerology",        desc: "生年月日と名前を数字に還元し、ライフパス・ソウル・デスティニーを読む。" },
            { href: "/kyusei",     title: "九星気学",   titleEn: "Nine Star Ki",       desc: "洛書をルーツに持つ九星気学。本命星・月命星が示す才能と環境適性。" },
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
