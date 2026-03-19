"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// ─── Numerology ────────────────────────────────────────────────────
const PYTHAGOREAN: Record<string, number> = {
  a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
  j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
  s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8,
};
const VOWELS = new Set(["a","e","i","o","u"]);

function reduce(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  if (n < 10) return n;
  return reduce(String(n).split("").reduce((a, d) => a + Number(d), 0));
}
function calcLP(date: string): number {
  return reduce(date.replace(/-/g,"").split("").reduce((a,d) => a+Number(d), 0));
}
function calcName(name: string, filter: (c:string) => boolean): number {
  const chars = name.toLowerCase().replace(/[^a-z]/g,"").split("").filter(filter);
  return chars.length ? reduce(chars.reduce((a,c) => a+(PYTHAGOREAN[c]||0), 0)) : 0;
}

// ─── Nine Star Ki ─────────────────────────────────────────────────
function calcHonmeiNumber(year: number): number {
  let s = year;
  while (s >= 10) s = String(s).split("").reduce((acc,d) => acc+Number(d), 0);
  const result = 10 - s;
  return result === 0 ? 9 : result < 0 ? result + 9 : result;
}
function calcHonmei(year: number, month: number, beforeSetsubun: boolean): number {
  const y = (month === 1 || (month === 2 && beforeSetsubun)) ? year - 1 : year;
  return calcHonmeiNumber(y);
}
function calcGetsumei(honmei: number, month: number, beforeSetsubun: boolean): number {
  const adjMonth = (month === 2 && beforeSetsubun) ? 1 : month;
  const group = honmei % 3 === 1 ? 1 : honmei % 3 === 2 ? 2 : 0;
  const base = group === 1 ? 8 : group === 2 ? 5 : 2;
  const monthIndex = adjMonth === 1 ? 11 : adjMonth - 2;
  return ((base - 1 - monthIndex) % 9 + 9) % 9 + 1;
}

// ─── Signs ────────────────────────────────────────────────────────
type SignData = { name:string; en:string; keyword:string; desc:string; tags:string[] };
const SIGNS: SignData[] = [
  {name:"牡羊座",en:"Aries",keyword:"開拓・リーダーシップ・行動力",desc:"誰よりも早く動き、新しい可能性に飛び込む先駆者。強い意志と独立心。",tags:["leadership","expression"]},
  {name:"牡牛座",en:"Taurus",keyword:"安定・審美・持続力",desc:"着実に積み上げ、美しいものと豊かさを愛する。粘り強さと感覚的な洗練。",tags:["building","care"]},
  {name:"双子座",en:"Gemini",keyword:"知識・コミュニケーション・柔軟性",desc:"好奇心旺盛で情報の扱いに長け、多様な人と繋がる能力を持つ。",tags:["expression","connection"]},
  {name:"蟹座",en:"Cancer",keyword:"共感・育む・直感",desc:"深い共感力と直感で人を育て、安心できる場を作る。",tags:["care","intuition"]},
  {name:"獅子座",en:"Leo",keyword:"自己表現・リーダー・創造性",desc:"人前で輝き、創造的な自己表現でリーダーシップを発揮する。",tags:["expression","leadership"]},
  {name:"乙女座",en:"Virgo",keyword:"分析・実務・奉仕",desc:"細部を見抜く分析力と実務能力で、着実に積み上げながら人を支える。",tags:["analysis","building"]},
  {name:"天秤座",en:"Libra",keyword:"調和・対人関係・美",desc:"公正さと美意識で人間関係を整え、バランスを生み出す調整者。",tags:["connection","care"]},
  {name:"蠍座",en:"Scorpio",keyword:"深層・変容・洞察",desc:"表面の奥に潜む真実を見抜き、変容を通じて本質に迫る。",tags:["transformation","analysis"]},
  {name:"射手座",en:"Sagittarius",keyword:"探求・自由・哲学",desc:"広い視野で真実と意味を探し、自由に世界を冒険する哲学者。",tags:["leadership","analysis"]},
  {name:"山羊座",en:"Capricorn",keyword:"達成・構造・責任",desc:"長期的な目標に向けて着実に登り続ける。強い責任感と構造力を持つ。",tags:["building","leadership"]},
  {name:"水瓶座",en:"Aquarius",keyword:"革新・独自性・ビジョン",desc:"既存の枠にとらわれない独自のビジョンで、社会に新風を送る。",tags:["expression","transformation"]},
  {name:"魚座",en:"Pisces",keyword:"共感・直感・芸術",desc:"境界を超えた共感力と豊かな直感で、目に見えないものを感じ取る。",tags:["intuition","care"]},
];
function signFromLon(lon: number): SignData {
  return SIGNS[Math.floor(((lon % 360) + 360) % 360 / 30)];
}
function getSunSign(m: number, d: number): SignData {
  const md = m*100+d;
  if(md>=321&&md<=419) return SIGNS[0];
  if(md>=420&&md<=520) return SIGNS[1];
  if(md>=521&&md<=620) return SIGNS[2];
  if(md>=621&&md<=722) return SIGNS[3];
  if(md>=723&&md<=822) return SIGNS[4];
  if(md>=823&&md<=922) return SIGNS[5];
  if(md>=923&&md<=1022) return SIGNS[6];
  if(md>=1023&&md<=1121) return SIGNS[7];
  if(md>=1122&&md<=1221) return SIGNS[8];
  if(md>=1222||md<=119) return SIGNS[9];
  if(md>=120&&md<=218) return SIGNS[10];
  return SIGNS[11];
}

// ─── Number / star data ────────────────────────────────────────────
const NUM_DATA: Record<number, {keyword:string;talent:string;tags:string[]}> = {
  1:  {keyword:"開拓・先駆・独立",talent:"新しい道を切り拓くリーダー",tags:["leadership","expression"]},
  2:  {keyword:"調和・協力・感受性",talent:"繊細な共感力でつなぐ調停者",tags:["care","connection"]},
  3:  {keyword:"表現・創造・喜び",talent:"創造的な出力で人を喜ばせる表現者",tags:["expression","connection"]},
  4:  {keyword:"構築・実直・安定",talent:"着実に土台を築くビルダー",tags:["building","analysis"]},
  5:  {keyword:"自由・変化・冒険",talent:"変化の中で才能を開く探求者",tags:["expression","transformation"]},
  6:  {keyword:"奉仕・愛・責任",talent:"愛と責任で人を育てるナーチャラー",tags:["care","building"]},
  7:  {keyword:"探求・知性・精神性",talent:"深く掘り下げて真実を見つける哲学者",tags:["analysis","intuition"]},
  8:  {keyword:"達成・権力・豊かさ",talent:"大きな目標に向かって動くアチーバー",tags:["leadership","building"]},
  9:  {keyword:"完成・慈愛・解放",talent:"全体を見渡し愛で包む完成者",tags:["care","transformation"]},
  11: {keyword:"直感・インスピレーション・使命",talent:"インスピレーションを届けるビジョナリー",tags:["intuition","expression"]},
  22: {keyword:"実現・建設・変革",talent:"大きなビジョンを現実にするマスタービルダー",tags:["building","leadership"]},
  33: {keyword:"慈愛・奉仕・教え",talent:"純粋な愛で教えるマスターティーチャー",tags:["care","expression"]},
};

const STAR_DATA: Record<number, {name:string;keyword:string;tags:string[]}> = {
  1: {name:"一白水星",keyword:"知性・適応・洞察",tags:["analysis","connection"]},
  2: {name:"二黒土星",keyword:"勤勉・育む・継続",tags:["care","building"]},
  3: {name:"三碧木星",keyword:"行動力・革新・スピード",tags:["leadership","expression"]},
  4: {name:"四緑木星",keyword:"信頼・調和・ネットワーク",tags:["connection","care"]},
  5: {name:"五黄土星",keyword:"カリスマ・変革・中心力",tags:["leadership","transformation"]},
  6: {name:"六白金星",keyword:"権威・完璧主義・誇り",tags:["leadership","building"]},
  7: {name:"七赤金星",keyword:"弁才・喜び・社交性",tags:["expression","connection"]},
  8: {name:"八白土星",keyword:"変化・蓄積・粘り強さ",tags:["building","transformation"]},
  9: {name:"九紫火星",keyword:"直感・美・洞察",tags:["intuition","expression"]},
};

const TAG_LABELS: Record<string, string> = {
  leadership:     "リーダーシップ・開拓",
  expression:     "表現・伝達",
  care:           "育む・奉仕",
  analysis:       "分析・探求",
  building:       "構築・積み上げ",
  connection:     "繋ぐ・ネットワーク",
  transformation: "変革・変容",
  intuition:      "直感・洞察",
};

const TIMEZONES = [
  { label: "JST（東京・大阪・ソウル）",       value: "+09:00" },
  { label: "CST（上海・北京）",               value: "+08:00" },
  { label: "ICT（バンコク）",                 value: "+07:00" },
  { label: "IST（インド）",                   value: "+05:30" },
  { label: "GST（ドバイ）",                   value: "+04:00" },
  { label: "GMT（ロンドン冬）",               value: "+00:00" },
  { label: "BST（ロンドン夏）",               value: "+01:00" },
  { label: "CET（パリ・ベルリン冬）",         value: "+01:00" },
  { label: "CEST（パリ・ベルリン夏）",        value: "+02:00" },
  { label: "EST（ニューヨーク冬）",           value: "-05:00" },
  { label: "EDT（ニューヨーク夏）",           value: "-04:00" },
  { label: "CST（シカゴ冬）",                 value: "-06:00" },
  { label: "PST（ロサンゼルス冬）",           value: "-08:00" },
  { label: "PDT（ロサンゼルス夏）",           value: "-07:00" },
  { label: "AEST（シドニー冬）",              value: "+10:00" },
  { label: "AEDT（シドニー夏）",              value: "+11:00" },
];

// ─── Integration ──────────────────────────────────────────────────
const CONCLUSIONS: Record<string, string> = {
  "leadership,expression":     "「人の前に立ちビジョンを伝える」ことで最大の力が発揮される。コーチング・教育・発信・起業・組織のリーダーシップといった場で才能が開花しやすい。",
  "leadership,building":       "「大きな目標に向けて着実に仕組みを作る」ことで力が発揮される。経営・プロジェクト設計・専門職のトップとして才能が活きる。",
  "leadership,transformation": "「既存の枠を壊し新しい形を創る」役割で力を発揮する。起業・変革リーダー・新規事業・社会変革との親和性が高い。",
  "expression,connection":     "「伝えることで人を繋ぎ動かす」ことで力が発揮される。コンテンツ制作・PR・ファシリテーション・コーチングに高い適性がある。",
  "care,connection":            "「人と人の間に立ち、関係を豊かにする」ことで力が発揮される。カウンセリング・チームビルディング・コミュニティ運営で才能が開花する。",
  "care,building":              "「人を育てながら確かな基盤を作る」ことで力が発揮される。教育・人材開発・コーチング・長期的な組織づくりに才能がある。",
  "analysis,building":         "「深く理解した上で確かなものを積み上げる」ことで力が発揮される。専門職・研究・コンサルタント・設計の仕事に適性がある。",
  "analysis,intuition":        "「論理と直感の両方で真実を見抜く」ことで力が発揮される。カウンセリング・研究・コンサルティング・本質的な問いを扱う仕事に適性がある。",
  "intuition,expression":      "「見えないものを見える形にする」ことで力が発揮される。コーチング・カウンセリング・アート・コンテンツ制作・教育の場で才能が開花する。",
  "building,transformation":   "「変化の波をつかみながら確かなものを積み上げる」ことで力が発揮される。変革期のプロジェクト・再生事業・長期的な変容を扱う仕事に適性がある。",
  "care,transformation":        "「人の変容に寄り添いながら深く支える」ことで力が発揮される。コーチング・カウンセリング・ヒーリング・人材育成との深い親和性がある。",
  "connection,building":        "「信頼のネットワークを築きながら長期的な成果を上げる」ことで力が発揮される。人材・組織・コミュニティを設計・運営する仕事に適性がある。",
  "leadership,care":            "「人を引っ張りながら育てる」ことで力が発揮される。管理職・メンター・コーチ・チームリーダーとして才能が最大化する。",
  "analysis,connection":        "「深く理解した上で人と繋がる」ことで力が発揮される。カウンセリング・コンサルタント・調査・教育の場に高い適性がある。",
};

function buildIntegration(
  lp: number, soul: number, honmei: number, getsumei: number,
  sun: SignData, moon?: SignData
) {
  const counts: Record<string, number> = {};
  const add = (tags: string[], w: number) => tags.forEach(t => counts[t] = (counts[t]||0)+w);

  add(NUM_DATA[lp]?.tags || [], 3);
  add(NUM_DATA[soul]?.tags || [], 2);
  add(STAR_DATA[honmei]?.tags || [], 2);
  add(sun.tags, 1);
  if (moon) add(moon.tags, 2); // 月星座は内面の動機として重要
  if (getsumei !== honmei) add(STAR_DATA[getsumei]?.tags || [], 1);

  const sorted = Object.entries(counts).sort(([,a],[,b]) => b-a);
  const t1 = sorted[0]?.[0];
  const t2 = sorted[1]?.[0];

  const conclusion =
    CONCLUSIONS[`${t1},${t2}`] || CONCLUSIONS[`${t2},${t1}`] ||
    "三つの占術が重なる場所——それがあなたの才能の核心。その交点を意識して仕事・活動・役割を選ぶことで、最も自然に力が発揮できる領域が見えてくる。";

  const moonLine = moon
    ? `月星座${moon.name}（${moon.keyword}）は感情・本能・安心の場所を示し、内側の動機に深く関わる。`
    : "月星座・金星・木星の情報を加えると、より立体的な鑑定が可能になる（出生時刻を入力）。";

  const paragraphs = [
    `三つの占術を重ねると、「${TAG_LABELS[t1]}」${t2 ? `と「${TAG_LABELS[t2]}」` : ""}という共通のテーマが浮かび上がる。これがあなたの才能の核心だ。`,
    `数秘術のライフパスナンバー${lp}は「${NUM_DATA[lp]?.keyword}」——人生全体の方向軸を示す。ソウルナンバー${soul}（${NUM_DATA[soul]?.keyword}）は外に見せる顔より深い内なる動機。この二つが重なることで、何のために力を使うかが見えてくる。`,
    `九星気学の本命星${STAR_DATA[honmei]?.name}は「才能が活きる環境と役割」を示し、月命星${STAR_DATA[getsumei]?.name}がその表現スタイルを加える。どんな場で、どのように動くときに最も力が出るかを示すのがこの二つの星だ。`,
    `西洋占星術の太陽星座${sun.name}（${sun.keyword}）は、外の世界との関わり方の基本姿勢を示す。${moonLine}`,
    conclusion,
  ];

  return { themes: [t1, t2].filter(Boolean), text: paragraphs.join("\n\n") };
}

// ─── Component ────────────────────────────────────────────────────
type PlanetSigns = { moon: SignData; venus: SignData; jupiter: SignData };
type Result = {
  lp: number; soul: number; dest: number; pers: number;
  honmei: number; getsumei: number;
  sun: SignData;
  planets?: PlanetSigns;
  integration: { themes: string[]; text: string };
};

export default function IntegratedSim() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tz, setTz] = useState("+09:00");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const d = searchParams.get("date");
    const t = searchParams.get("time");
    const z = searchParams.get("tz");
    const n = searchParams.get("name");
    if (d) setDate(d);
    if (t) setTime(t);
    if (z) setTz(z);
    if (n) setName(n);

    // 全項目揃っていれば自動計算
    if (d && n && /[a-zA-Z]/.test(n)) {
      // state の更新を待つため microtask で実行
      Promise.resolve().then(() => {
        const [y, m, day] = d.split("-").map(Number);
        const isBeforeSetsubun = m === 1 || (m === 2 && day <= 3);
        const lp       = calcLP(d);
        const soul     = calcName(n, c => VOWELS.has(c));
        const dest     = calcName(n, () => true);
        const pers     = calcName(n, c => !VOWELS.has(c));
        const honmei   = calcHonmei(y, m, isBeforeSetsubun);
        const getsumei = calcGetsumei(honmei, m, isBeforeSetsubun);
        const sun      = getSunSign(m, day);

        const doCalc = async () => {
          let planets: PlanetSigns | undefined;
          const timeVal = t || "";
          const tzVal   = z || "+09:00";
          if (timeVal) {
            const Astronomy = await import("astronomy-engine");
            const utcDate = new Date(`${d}T${timeVal}:00${tzVal}`);
            const astroTime = Astronomy.MakeTime(utcDate);
            const moonEcl    = Astronomy.EclipticGeoMoon(astroTime);
            const venusEcl   = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Venus, astroTime, false));
            const jupiterEcl = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Jupiter, astroTime, false));
            planets = {
              moon:    signFromLon(moonEcl.lon),
              venus:   signFromLon(venusEcl.elon),
              jupiter: signFromLon(jupiterEcl.elon),
            };
          }
          const integration = buildIntegration(lp, soul || lp, honmei, getsumei, sun, planets?.moon);
          setResult({ lp, soul, dest, pers, honmei, getsumei, sun, planets, integration });
        };
        doCalc();
      });
    }
  }, [searchParams]);

  async function calculate() {
    setError("");
    if (!date) { setError("生年月日を入力してください"); return; }
    if (!name.trim() || !/[a-zA-Z]/.test(name)) {
      setError("名前をアルファベットで入力してください（例: Miku Sato）"); return;
    }

    setLoading(true);
    try {
      const [y, m, d] = date.split("-").map(Number);
      const isBeforeSetsubun = m === 1 || (m === 2 && d <= 3);

      const lp       = calcLP(date);
      const soul     = calcName(name, c => VOWELS.has(c));
      const dest     = calcName(name, () => true);
      const pers     = calcName(name, c => !VOWELS.has(c));
      const honmei   = calcHonmei(y, m, isBeforeSetsubun);
      const getsumei = calcGetsumei(honmei, m, isBeforeSetsubun);
      const sun      = getSunSign(m, d);

      let planets: PlanetSigns | undefined;
      if (time) {
        const Astronomy = await import("astronomy-engine");
        const utcDate = new Date(`${date}T${time}:00${tz}`);
        const astroTime = Astronomy.MakeTime(utcDate);

        const moonEcl = Astronomy.EclipticGeoMoon(astroTime);
        const venusEcl = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Venus, astroTime, false));
        const jupiterEcl = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Jupiter, astroTime, false));

        planets = {
          moon:    signFromLon(moonEcl.lon),
          venus:   signFromLon(venusEcl.elon),
          jupiter: signFromLon(jupiterEcl.elon),
        };
      }

      const integration = buildIntegration(lp, soul || lp, honmei, getsumei, sun, planets?.moon);
      setResult({ lp, soul, dest, pers, honmei, getsumei, sun, planets, integration });
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "w-full border border-[#E0DDD6] bg-white px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#111111]";

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="bg-[#F4F4F2] p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">生年月日</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">
              名前（アルファベット）
            </label>
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="例: Miku Sato"
              className={`${inputCls} placeholder:text-[#CCC]`}
            />
            <p className="text-[9px] text-[#AAAAAA] mt-1 tracking-wide">名姓の順・スペース有無は影響しません</p>
          </div>
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">
              出生時刻 <span className="text-[#CCCCCC] normal-case tracking-normal">（月星座・金星・木星に必要）</span>
            </label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">タイムゾーン</label>
            <select
              value={tz} onChange={e => setTz(e.target.value)}
              className="w-full border border-[#E0DDD6] bg-white px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
            >
              {TIMEZONES.map(z => (
                <option key={z.label} value={z.value}>{z.label}</option>
              ))}
            </select>
          </div>
        </div>
        {error && <p className="text-xs text-red-500 mb-4">{error}</p>}
        <button
          onClick={calculate}
          disabled={loading}
          className="bg-[#111111] text-[#F9F9F7] px-8 py-3 text-[9px] tracking-[0.3em] uppercase hover:opacity-70 transition-opacity disabled:opacity-40"
        >
          {loading ? "計算中..." : "鑑定する"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Three system cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAEAE6]">

            {/* 数秘術 */}
            <div className="bg-[#F4F4F2] p-6">
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#AAAAAA] mb-4">Numerology</p>
              <h3 className="font-display text-lg font-light mb-5 text-[#111111]">数秘術</h3>
              {[
                { label:"Life Path",   sub:"人生のテーマ",  num:result.lp },
                { label:"Soul",        sub:"内なる動機",    num:result.soul },
                { label:"Destiny",     sub:"果たす使命",    num:result.dest },
                { label:"Personality", sub:"外への印象",    num:result.pers },
              ].map(row => row.num > 0 ? (
                <div key={row.label} className="flex items-start gap-4 mb-4">
                  <span className="font-display text-2xl text-[#111111] font-light w-8 shrink-0 leading-none mt-0.5">{row.num}</span>
                  <div>
                    <p className="text-[8px] tracking-[0.2em] uppercase text-[#888888]">{row.label} — {row.sub}</p>
                    <p className="text-xs text-[#555555] mt-0.5">{NUM_DATA[row.num]?.keyword}</p>
                  </div>
                </div>
              ) : null)}
            </div>

            {/* 九星気学 */}
            <div className="bg-[#F4F4F2] p-6">
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#AAAAAA] mb-4">Nine Star Ki</p>
              <h3 className="font-display text-lg font-light mb-5 text-[#111111]">九星気学</h3>
              {[
                { label:"本命星", sub:"核心の資質",    num:result.honmei },
                { label:"月命星", sub:"表現スタイル",  num:result.getsumei },
              ].map(row => (
                <div key={row.label} className="flex items-start gap-4 mb-4">
                  <span className="font-display text-2xl text-[#111111] font-light w-8 shrink-0 leading-none mt-0.5">{row.num}</span>
                  <div>
                    <p className="text-[8px] tracking-[0.2em] uppercase text-[#888888]">{row.label} — {row.sub}</p>
                    <p className="text-xs text-[#555555] mt-0.5">{STAR_DATA[row.num]?.name}</p>
                    <p className="text-xs text-[#888888] mt-0.5">{STAR_DATA[row.num]?.keyword}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 西洋占星術 */}
            <div className="bg-[#F4F4F2] p-6">
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#AAAAAA] mb-4">Western Astrology</p>
              <h3 className="font-display text-lg font-light mb-5 text-[#111111]">西洋占星術</h3>

              {[
                { label:"☉ 太陽星座", sub:"意識・自己表現",    sign:result.sun },
                ...(result.planets ? [
                  { label:"☽ 月星座",   sub:"感情・本能・安心",  sign:result.planets.moon },
                  { label:"♀ 金星",     sub:"愛と対人のスタイル", sign:result.planets.venus },
                  { label:"♃ 木星",     sub:"運とチャンスの分野", sign:result.planets.jupiter },
                ] : []),
              ].map(row => (
                <div key={row.label} className="mb-4">
                  <p className="text-[8px] tracking-[0.2em] uppercase text-[#888888] mb-1">{row.label} — {row.sub}</p>
                  <p className="text-sm font-display font-light text-[#111111]">{row.sign.name}</p>
                  <p className="text-xs text-[#888888] mt-0.5">{row.sign.keyword}</p>
                </div>
              ))}

              {!result.planets && (
                <p className="text-[9px] text-[#CCCCCC] tracking-wide mt-4">
                  出生時刻を入力すると月星座・金星・木星も表示されます
                </p>
              )}
            </div>

          </div>

          {/* Integration reading */}
          <div className="bg-[#111111] text-[#F9F9F7] p-8 md:p-12">
            <p className="text-[8px] tracking-[0.4em] uppercase text-[#555555] mb-4">Integrated Reading</p>
            <h3 className="font-display text-3xl font-light mb-8">あなたの才能の核心</h3>
            <div className="flex gap-3 mb-8 flex-wrap">
              {result.integration.themes.map(t => (
                <span key={t} className="border border-[#333333] px-4 py-1.5 text-[9px] tracking-[0.2em] text-[#CCCCCC]">
                  {TAG_LABELS[t]}
                </span>
              ))}
            </div>
            <div className="space-y-5">
              {result.integration.text.split("\n\n").map((para, i) => (
                <p key={i} className={`leading-loose tracking-wider ${i === 0 ? "text-base text-[#F9F9F7]" : "text-sm text-[#AAAAAA]"}`}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
