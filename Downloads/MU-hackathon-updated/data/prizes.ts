export interface Prize {
  id: string;
  rank: number;
  emoji: string;
  title: string;
  amount: number;
}

/** إجمالي الجوائز المالية (بالريال السعودي). */
export const totalPrizeAmount = 30_000;

/** جوائز المراكز الخمسة الأولى — مرتّبة تصاعديًا حسب المركز. */
export const prizes: Prize[] = [
  { id: "first", rank: 1, emoji: "🥇", title: "المركز الأول", amount: 5_000 },
  { id: "second", rank: 2, emoji: "🥈", title: "المركز الثاني", amount: 4_000 },
  { id: "third", rank: 3, emoji: "🥉", title: "المركز الثالث", amount: 3_000 },
  { id: "fourth", rank: 4, emoji: "🏅", title: "المركز الرابع", amount: 2_000 },
  { id: "fifth", rank: 5, emoji: "🎖️", title: "المركز الخامس", amount: 1_000 },
];
