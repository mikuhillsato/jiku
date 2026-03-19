// 四柱推命・算命学の計算ロジック（Pythonロジックを移植）

export const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const DIZHI   = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

export const WUXING_TIANGAN: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水",
};

export const WUXING_DIZHI: Record<string, string> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水",
};

export const DIZHI_ANIMAL: Record<string, string> = {
  子: "鼠", 丑: "牛", 寅: "虎", 卯: "兎", 辰: "龍", 巳: "蛇",
  午: "馬", 未: "羊", 申: "猿", 酉: "鶏", 戌: "犬", 亥: "猪",
};

const SOLAR_TERM_DAYS: Record<number, number> = {
  1: 6, 2: 4, 3: 6, 4: 5, 5: 6, 6: 6,
  7: 7, 8: 8, 9: 8, 10: 8, 11: 7, 12: 7,
};

const MONTH_TO_DIZHI: Record<number, number> = {
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
  7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 0,
};

function getMonthDizhiIndex(month: number, day: number): { dizhiIndex: number; adjMonth: number } {
  const termDay = SOLAR_TERM_DAYS[month] ?? 6;
  let adjMonth = month;
  if (day < termDay) {
    adjMonth = month === 1 ? 12 : month - 1;
  }
  return { dizhiIndex: MONTH_TO_DIZHI[adjMonth], adjMonth };
}

export function getYearPillar(date: Date) {
  let year = date.getFullYear();
  if (date.getMonth() === 0 || (date.getMonth() === 1 && date.getDate() < 4)) {
    year -= 1;
  }
  const offset = ((year - 1984) % 60 + 60) % 60;
  const tg = TIANGAN[offset % 10];
  const dz = DIZHI[offset % 12];
  return { tiangan: tg, dizhi: dz, combined: tg + dz };
}

export function getMonthPillar(date: Date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const { dizhiIndex } = getMonthDizhiIndex(m, d);
  const yearTg = getYearPillar(date).tiangan;
  const yearTgIdx = TIANGAN.indexOf(yearTg as typeof TIANGAN[number]);
  const monthTgBase: Record<number, number> = {
    0: 2, 1: 4, 2: 6, 3: 8, 4: 0,
    5: 2, 6: 4, 7: 6, 8: 8, 9: 0,
  };
  const base = monthTgBase[yearTgIdx] ?? 0;
  const monthOffset = ((dizhiIndex - 2) % 12 + 12) % 12;
  const tgIdx = (base + monthOffset) % 10;
  const tg = TIANGAN[tgIdx];
  const dz = DIZHI[dizhiIndex];
  return { tiangan: tg, dizhi: dz, combined: tg + dz };
}

export function getDayPillar(date: Date) {
  const baseDate = new Date(1900, 0, 1); // 1900-01-01
  const BASE_DAY = 10;
  const diff = Math.floor((date.getTime() - baseDate.getTime()) / 86400000);
  const cycle = ((BASE_DAY + diff) % 60 + 60) % 60;
  const tg = TIANGAN[cycle % 10];
  const dz = DIZHI[cycle % 12];
  return { tiangan: tg, dizhi: dz, combined: tg + dz };
}

export function getHourPillar(date: Date, hour: number) {
  let hourDizhiIndex: number;
  if (hour >= 23 || hour < 1) hourDizhiIndex = 0;
  else hourDizhiIndex = Math.floor((hour + 1) / 2);

  const dayTg = getDayPillar(date).tiangan;
  const dayTgIdx = TIANGAN.indexOf(dayTg as typeof TIANGAN[number]);
  const hourTgBase: Record<number, number> = {
    0: 0, 1: 2, 2: 4, 3: 6, 4: 8,
    5: 0, 6: 2, 7: 4, 8: 6, 9: 8,
  };
  const base = hourTgBase[dayTgIdx] ?? 0;
  const tg = TIANGAN[(base + hourDizhiIndex) % 10];
  const dz = DIZHI[hourDizhiIndex];
  return { tiangan: tg, dizhi: dz, combined: tg + dz };
}

export function getFourPillars(date: Date, hour = 12) {
  return {
    year: getYearPillar(date),
    month: getMonthPillar(date),
    day: getDayPillar(date),
    hour: getHourPillar(date, hour),
  };
}

export function calcWuxingBalance(pillars: ReturnType<typeof getFourPillars>) {
  const count: Record<string, number> = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  for (const p of [pillars.year, pillars.month, pillars.day, pillars.hour]) {
    count[WUXING_TIANGAN[p.tiangan]] = (count[WUXING_TIANGAN[p.tiangan]] ?? 0) + 1;
    count[WUXING_DIZHI[p.dizhi]] = (count[WUXING_DIZHI[p.dizhi]] ?? 0) + 1;
  }
  return count;
}
