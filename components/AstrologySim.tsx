"use client";

import { useState } from "react";
import ZodiacGlyph from "@/components/ZodiacGlyph";

// ─── Types ───────────────────────────────────────────────────────
type SignName = "牡羊座"|"牡牛座"|"双子座"|"蟹座"|"獅子座"|"乙女座"|
               "天秤座"|"蠍座"|"射手座"|"山羊座"|"水瓶座"|"魚座";

interface SignData {
  symbol: string; en: string; element: string; core: string;
  sun: string; moon: string; asc: string; mc: string; dsc: string;
}
interface PResult { sign: SignName; deg: number; element: string; symbol: string; }
interface Chart { sun: PResult; moon: PResult; asc: PResult; mc: PResult; dsc: PResult; }

// ─── Cities ──────────────────────────────────────────────────────
const CITIES = [
  { name: "東京",         lat: 35.6762, lon: 139.6503, tz: 9  },
  { name: "大阪",         lat: 34.6937, lon: 135.5023, tz: 9  },
  { name: "名古屋",       lat: 35.1815, lon: 136.9066, tz: 9  },
  { name: "福岡",         lat: 33.5904, lon: 130.4017, tz: 9  },
  { name: "札幌",         lat: 43.0642, lon: 141.3469, tz: 9  },
  { name: "那覇",         lat: 26.2124, lon: 127.6809, tz: 9  },
  { name: "ソウル",       lat: 37.5665, lon: 126.9780, tz: 9  },
  { name: "北京",         lat: 39.9042, lon: 116.4074, tz: 8  },
  { name: "上海",         lat: 31.2304, lon: 121.4737, tz: 8  },
  { name: "シンガポール", lat:  1.3521, lon: 103.8198, tz: 8  },
  { name: "バンコク",     lat: 13.7563, lon: 100.5018, tz: 7  },
  { name: "ドバイ",       lat: 25.2048, lon:  55.2708, tz: 4  },
  { name: "ロンドン",     lat: 51.5074, lon:  -0.1278, tz: 0  },
  { name: "パリ",         lat: 48.8566, lon:   2.3522, tz: 1  },
  { name: "ニューヨーク", lat: 40.7128, lon: -74.0060, tz: -5 },
  { name: "ロサンゼルス", lat: 34.0522, lon:-118.2437, tz: -8 },
  { name: "シドニー",     lat:-33.8688, lon: 151.2093, tz: 10 },
];

// ─── Sign data ───────────────────────────────────────────────────
const SD: Record<SignName, SignData> = {
  "牡羊座": {
    symbol:"♈", en:"Aries", element:"火", core:"勇気・先駆・情熱",
    sun: "開拓者の魂を持ち、情熱と直感で新しい道を切り拓く。挑戦そのものに生きがいを感じる",
    moon:"感情は率直で即時的。自由と刺激の中で充電され、待つことが苦手",
    asc: "エネルギッシュで積極的な第一印象。行動力があり、自信にあふれた雰囲気",
    mc:  "先頭に立てるリーダー的な仕事で力を発揮。起業・スポーツ・競争的な分野",
    dsc: "穏やかで忍耐強いパートナーに惹かれる。自分にない安定と粘り強さを求める",
  },
  "牡牛座": {
    symbol:"♉", en:"Taurus", element:"地", core:"安定・美・実直",
    sun: "堅実に土台を築く。美と豊かさを愛し、時間をかけて積み上げることに喜びを感じる",
    moon:"感情は安定している。食・音楽・自然など感覚的な快楽によって深く満たされる",
    asc: "落ち着いた信頼感のある印象。穏やかで実直、頼れる人と見られやすい",
    mc:  "美・食・金融・農業など、価値あるものを扱う仕事で長期的な成果を出す",
    dsc: "知的で変化に富むパートナーに惹かれる。自分にない軽やかさや新鮮さを求める",
  },
  "双子座": {
    symbol:"♊", en:"Gemini", element:"風", core:"知性・変化・コミュニケーション",
    sun: "多様な関心と表現力を持つ。情報を扱い言葉で繋がることを通じて自分を表現する",
    moon:"感情は知性と結びつく。情報・会話・変化によって充電され、退屈が最大の敵",
    asc: "機知に富み会話が上手な印象。若々しく変化に富む雰囲気がある",
    mc:  "メディア・教育・執筆・コミュニケーション系の仕事で才能を発揮",
    dsc: "安定感と深みのあるパートナーに惹かれる。自分の移ろいやすさを支えてくれる人",
  },
  "蟹座": {
    symbol:"♋", en:"Cancer", element:"水", core:"感受性・守護・家庭",
    sun: "深い感受性と守護本能を持つ。家族や仲間を守り育てることに使命感を感じる",
    moon:"感情は深く波打つ。安心できる場所と信頼できる人の中でこそ本来の力を発揮する",
    asc: "柔らかく守ってくれそうな印象。感情豊かで人の気持ちに敏感な雰囲気",
    mc:  "ケア・教育・不動産・食・歴史に関わる仕事で真価を発揮",
    dsc: "安定感と社会的な地位を持つパートナーに惹かれる。現実的な柱となる存在を求める",
  },
  "獅子座": {
    symbol:"♌", en:"Leo", element:"火", core:"カリスマ・表現・誇り",
    sun: "舞台で輝くことを求める。自己表現と創造性によって人々を鼓舞し、誇りを持って生きる",
    moon:"感情は大きく劇的。愛情と承認で満たされ、自分らしく輝ける環境を必要とする",
    asc: "存在感があり華やかな印象。自信と温かさを同時に放つ目を引く雰囲気",
    mc:  "パフォーマー・リーダー・クリエイター系の仕事で本領を発揮",
    dsc: "謙虚で知的なパートナーに惹かれる。自分を地に足つけてくれる誠実な人を求める",
  },
  "乙女座": {
    symbol:"♍", en:"Virgo", element:"地", core:"分析・完璧主義・奉仕",
    sun: "分析力と精緻さで世界に貢献する。細部への注意と絶え間ない改善の追求が人生のテーマ",
    moon:"感情は内向きに向かいやすい。役に立てる・整っている状態で深く安心する",
    asc: "知的で誠実、整然とした印象。几帳面で頼れる人と見られやすい",
    mc:  "医療・分析・編集・サービス業など、精度と詳細が重視されるプロの仕事",
    dsc: "大らかで自由奔放なパートナーに惹かれる。完璧主義を解放させてくれる人を求める",
  },
  "天秤座": {
    symbol:"♎", en:"Libra", element:"風", core:"調和・美・パートナーシップ",
    sun: "美と公正さを愛する調停者。関係性の中で成長し、バランスと調和を保つことを求める",
    moon:"感情は関係性に強く影響される。調和と美しい環境・公正な状況で安定する",
    asc: "洗練されていてバランスのよい印象。上品で感じのよい雰囲気が漂う",
    mc:  "法律・外交・デザイン・アート・PR系の仕事で才能が開花",
    dsc: "情熱的で直接的なパートナーに惹かれる。自分の優柔不断を前に動かしてくれる人",
  },
  "蠍座": {
    symbol:"♏", en:"Scorpio", element:"水", core:"深化・変容・洞察",
    sun: "深層を見通す洞察力を持つ変革者。表面に惑わされず、本質と真実を追求し続ける",
    moon:"感情は深く激しい。強い絆と信頼の中でこそ開く。傷つくことを恐れながらも深く求める",
    asc: "ミステリアスで強い印象。目に見えない力を感じさせるオーラがある",
    mc:  "探偵・心理・研究・金融・医療など、深い調査と変容が伴う仕事",
    dsc: "明るく外向的なパートナーに惹かれる。社交性と開放感で自分を照らしてくれる人",
  },
  "射手座": {
    symbol:"♐", en:"Sagittarius", element:"火", core:"冒険・哲学・自由",
    sun: "真理と自由を探求する哲人。冒険と拡大を通じて人生の意味を見出し、遠くを目指す",
    moon:"感情は楽観的で自由。探求・旅・学びで満たされ、閉塞感が最大の敵",
    asc: "オープンで楽観的、海外や哲学的な雰囲気を漂わせる印象",
    mc:  "教育・出版・海外・法律・宗教など、意味と拡大に関わる仕事",
    dsc: "几帳面で実務的なパートナーに惹かれる。理想を現実に落とし込む力を持つ人",
  },
  "山羊座": {
    symbol:"♑", en:"Capricorn", element:"地", core:"野望・規律・達成",
    sun: "時間をかけて頂点を目指す。責任感と忍耐で社会的な地位と達成を積み上げていく",
    moon:"感情は内向きで管理されやすい。目標達成と社会的な認知によって深く満たされる",
    asc: "落ち着いた目標指向の印象。信頼感があり、仕事ができると見られやすい",
    mc:  "経営・政治・建設・金融など、長期的な構造構築が求められる分野で頭角を現す",
    dsc: "感受性豊かで感情的なパートナーに惹かれる。自分の硬さを溶かし温めてくれる人",
  },
  "水瓶座": {
    symbol:"♒", en:"Aquarius", element:"風", core:"革新・独立・人道",
    sun: "枠を超えて革新する。独自の視点と独立心で、人類の未来を先取りするような生き方を選ぶ",
    moon:"感情は知性的に処理される。仲間意識と社会的な理想・集合的な目標で充電される",
    asc: "個性的でユニーク、未来的な印象。人と違う何かを持つと見られやすい",
    mc:  "テクノロジー・社会活動・科学・メディアなど、革新的で前衛的な分野",
    dsc: "情熱的で個性的なパートナーに惹かれる。感情の熱量と自己表現力を持つ人",
  },
  "魚座": {
    symbol:"♓", en:"Pisces", element:"水", core:"共感・直感・夢想",
    sun: "深い共感と霊的な感受性を持つ夢想家。境界を超えて人と宇宙に溶け込む",
    moon:"感情は海のように深く広い。静かな空間・音楽・精神的なつながりで深く満たされる",
    asc: "夢のような柔らかい印象。謎めいていて芸術的な雰囲気がある",
    mc:  "音楽・映像・ケア・精神世界・海に関わる仕事で才能が開花",
    dsc: "現実的で几帳面なパートナーに惹かれる。自分の浮遊感を地に足つけてくれる人",
  },
};

const SIGN_ORDER: SignName[] = [
  "牡羊座","牡牛座","双子座","蟹座","獅子座","乙女座",
  "天秤座","蠍座","射手座","山羊座","水瓶座","魚座",
];

// ─── Astronomy ───────────────────────────────────────────────────
function nd(d: number) { return ((d % 360) + 360) % 360; }

function toJD(y: number, m: number, d: number, h: number, min: number) {
  if (m <= 2) { y--; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5 + (h + min / 60) / 24;
}

function sunLon(jd: number) {
  const D = jd - 2451545;
  const g = nd(357.529 + 0.98560028 * D) * Math.PI / 180;
  return nd(280.459 + 0.98564736 * D + 1.9148 * Math.sin(g) + 0.02 * Math.sin(2 * g));
}

function moonLon(jd: number) {
  const T = (jd - 2451545) / 36525;
  const r = Math.PI / 180;
  const Lp = 218.3164477 + 481267.88123421 * T;
  const Mp = nd(134.9633964 + 477198.8676313 * T) * r;
  const M  = nd(357.5291092 +  35999.0502909 * T) * r;
  const F  = nd( 93.2720950 + 483202.0175233 * T) * r;
  const Dp = nd(297.8501921 + 445267.1114034 * T) * r;
  const σ  = 6.288774*Math.sin(Mp) + 1.274027*Math.sin(2*Dp-Mp)
           + 0.658314*Math.sin(2*Dp) + 0.213618*Math.sin(2*Mp)
           - 0.185116*Math.sin(M)   - 0.114332*Math.sin(2*F);
  return nd(Lp + σ);
}

function gst(jd: number) {
  const T = (jd - 2451545) / 36525;
  return nd(280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T);
}

function obliquity(jd: number) {
  return 23.4392911 - 0.0130042 * (jd - 2451545) / 36525;
}

function mcLon(ramc: number, eps: number) {
  const r = ramc * Math.PI / 180, e = eps * Math.PI / 180;
  return nd(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(e)) * 180 / Math.PI);
}

function ascLon(ramc: number, eps: number, lat: number) {
  const r = ramc * Math.PI / 180, e = eps * Math.PI / 180, p = lat * Math.PI / 180;
  return nd(Math.atan2(Math.cos(r), -(Math.sin(r) * Math.cos(e) + Math.tan(p) * Math.sin(e))) * 180 / Math.PI);
}

function toSign(lon: number): PResult {
  const sign = SIGN_ORDER[Math.floor(lon / 30)];
  return { sign, deg: Math.floor(lon % 30), element: SD[sign].element, symbol: SD[sign].symbol };
}

// ─── Reading generator ───────────────────────────────────────────
function reading(c: Chart): string {
  return (
    `太陽は${c.sun.sign}（${c.sun.deg}°）に位置し、${SD[c.sun.sign].sun}。` +
    `月は${c.moon.sign}（${c.moon.deg}°）にあり、${SD[c.moon.sign].moon}。` +
    `${c.asc.sign}のアセンダントが示すように、${SD[c.asc.sign].asc}。` +
    `MCは${c.mc.sign}（${c.mc.deg}°）を指し、${SD[c.mc.sign].mc}。` +
    `ディセンダントの${c.dsc.sign}が関係性のテーマを語る——${SD[c.dsc.sign].dsc}。`
  );
}

// ─── Component ───────────────────────────────────────────────────
const YEARS  = Array.from({ length: 86 }, (_, i) => 1940 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS   = Array.from({ length: 31 }, (_, i) => i + 1);

export default function AstrologySim() {
  const [year,    setYear]    = useState<number>(1990);
  const [month,   setMonth]   = useState<number>(1);
  const [day,     setDay]     = useState<number>(1);
  const [time,    setTime]    = useState("");
  const [cityIdx, setCityIdx] = useState(0);
  const [chart,   setChart]   = useState<Chart | null>(null);
  const [err,     setErr]     = useState("");

  function calculate() {
    setErr("");
    if (!time) { setErr("出生時刻を入力してください。"); return; }
    const city = CITIES[cityIdx];
    const [h, mn] = time.split(":").map(Number);

    let utH = h - city.tz, utD = day, utMo = month, utY = year;
    if (utH < 0)   { utH += 24; utD--; }
    if (utH >= 24) { utH -= 24; utD++; }
    const daysInMonth = new Date(utY, utMo, 0).getDate();
    if (utD < 1)         { utMo--; if (utMo < 1)  { utMo = 12; utY--; } utD = new Date(utY, utMo, 0).getDate(); }
    if (utD > daysInMonth) { utD = 1; utMo++; if (utMo > 12) { utMo = 1; utY++; } }

    const jd   = toJD(utY, utMo, utD, utH, mn);
    const eps  = obliquity(jd);
    const ramc = nd(gst(jd) + city.lon);

    setChart({
      sun:  toSign(sunLon(jd)),
      moon: toSign(moonLon(jd)),
      asc:  toSign(ascLon(ramc, eps, city.lat)),
      mc:   toSign(mcLon(ramc, eps)),
      dsc:  toSign(nd(ascLon(ramc, eps, city.lat) + 180)),
    });
  }

  const rows = chart ? [
    { glyph:"☉", label:"太陽",        en:"Sun",        key:"sun"  as const, desc: SD[chart.sun.sign].sun  },
    { glyph:"☽", label:"月",          en:"Moon",       key:"moon" as const, desc: SD[chart.moon.sign].moon},
    { glyph:"AC",label:"ASC（上昇宮）",en:"Ascendant",  key:"asc"  as const, desc: SD[chart.asc.sign].asc  },
    { glyph:"MC",label:"MC（天頂）",   en:"Midheaven",  key:"mc"   as const, desc: SD[chart.mc.sign].mc    },
    { glyph:"DC",label:"DSC（下降宮）",en:"Descendant", key:"dsc"  as const, desc: SD[chart.dsc.sign].dsc  },
  ] : [];

  const selectCls = "border border-[#E0DDD6] px-2 py-2 text-sm text-[#111111] bg-[#F9F9F7] focus:outline-none focus:border-[#111111] transition-colors";

  return (
    <div className="border border-[#E0DDD6]">
      {/* Header */}
      <div className="flex items-center h-[38px] border-b border-[#111111] px-5">
        <span className="text-[8px] tracking-[0.5em] uppercase text-[#888888] mr-4">ホロスコープ簡易計算</span>
        <div className="flex-1 h-px bg-[#E0DDD6]" />
        <span className="text-[8px] tracking-[0.3em] text-[#CCC] ml-4">Western Astrology</span>
      </div>

      <div className="p-6">
        {/* Form */}
        <div className="flex flex-wrap gap-3 mb-5 items-end">
          {/* Date: 年/月/日 */}
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">生年月日</label>
            <div className="flex gap-1 items-center">
              <select value={year} onChange={e => setYear(Number(e.target.value))} className={selectCls}>
                {YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
              </select>
              <select value={month} onChange={e => setMonth(Number(e.target.value))} className={selectCls}>
                {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
              </select>
              <select value={day} onChange={e => setDay(Number(e.target.value))} className={selectCls}>
                {DAYS.map(d => <option key={d} value={d}>{d}日</option>)}
              </select>
            </div>
          </div>
          {/* Time */}
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">出生時刻</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)}
              className={`w-32 ${selectCls}`} />
          </div>
          {/* City */}
          <div>
            <label className="block text-[8px] tracking-[0.3em] uppercase text-[#888888] mb-2">出生地</label>
            <select value={cityIdx} onChange={e => setCityIdx(Number(e.target.value))} className={selectCls}>
              {CITIES.map((c, i) => <option key={i} value={i}>{c.name}</option>)}
            </select>
          </div>
          {/* Button */}
          <button onClick={calculate}
            className="px-6 py-2 bg-[#111111] text-[#F9F9F7] text-[9px] tracking-[0.3em] uppercase hover:bg-[#333333] transition-colors">
            計算
          </button>
        </div>
        {err && <p className="text-xs tracking-wider mb-4 text-[#888888]">{err}</p>}

        {/* Results */}
        {chart && (
          <div className="border-t border-[#E0DDD6] pt-6 space-y-5">

            {/* Top grid: 5 angles */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#E0DDD6]">
              {rows.map(r => {
                const p = chart[r.key];
                return (
                  <div key={r.key} className="bg-[#F4F4F2] p-4">
                    <p className="font-display text-[11px] text-[#888888] mb-2">{r.glyph}</p>
                    <div className="mb-1"><ZodiacGlyph sign={p.sign} size={36} color="#111111" /></div>
                    <p className="font-display text-[13px] font-light text-[#111111] leading-tight">{p.sign}</p>
                    <p className="text-[8px] text-[#888888] mt-0.5">{p.deg}° {p.element}</p>
                    <p className="text-[9px] text-[#555555] leading-relaxed tracking-wider mt-2 hidden md:block">
                      {SD[p.sign].core}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Description rows */}
            <div className="space-y-px bg-[#E0DDD6]">
              {rows.map(r => {
                const p = chart[r.key];
                return (
                  <div key={r.key} className="bg-[#F9F9F7] p-4 flex gap-4 items-start">
                    <div className="w-28 shrink-0">
                      <p className="text-[8px] tracking-[0.25em] uppercase text-[#888888]">{r.en}</p>
                      <p className="font-display text-sm font-light text-[#111111] mt-0.5">{r.label}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <ZodiacGlyph sign={p.sign} size={22} color="#111111" />
                        <span className="font-display text-base font-light text-[#111111]">{p.sign}</span>
                        <span className="text-[9px] text-[#CCC]">{p.deg}°</span>
                      </div>
                      <p className="text-xs text-[#555555] leading-relaxed tracking-wider">{r.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reading */}
            <div style={{ backgroundColor: "#111111" }} className="p-6">
              <p className="text-[8px] tracking-[0.5em] uppercase mb-5" style={{ color: "#555555" }}>
                Reading — 星の配置が語ること
              </p>
              <p style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "15px", fontWeight: 300, lineHeight: 2.1,
                letterSpacing: "0.04em", color: "#C8C4B8",
              }}>
                {reading(chart)}
              </p>
              <p className="text-[8px] tracking-[0.3em] mt-5 pt-4 border-t"
                 style={{ color: "#333333", borderColor: "#222222" }}>
                ※ 簡易天文計算による近似値（誤差±1〜5°程度）。月・ASC・MCは出生時刻の精度に依存します。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
