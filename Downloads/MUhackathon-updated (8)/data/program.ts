import { remoteWorkshops, onsiteWorkshops, closingStages } from "./workshops";
import { timeline } from "./timeline";
import type { ProgramItem, ProgramCategory } from "./types";

/*
 * برنامج الهاكثون كقائمة موحّدة قابلة للفلترة.
 * كل عنصر مشتق حصريًا من البيانات الرسمية الحالية (لا فعاليات مُخترعة).
 */

const intro = timeline.find((t) => t.id === "intro-meeting");

/** فئات الفلترة (مطابقة لفئات المحتوى الرسمي فقط). */
export const programFilters: { id: ProgramCategory | "all"; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "intro", label: "لقاء تعريفي" },
  { id: "remote", label: "ورش عن بُعد" },
  { id: "onsite", label: "ورش حضورية" },
  { id: "closing", label: "مراحل ختامية" },
];

export const program: ProgramItem[] = [
  ...(intro
    ? [
        {
          id: intro.id,
          date: intro.date,
          title: intro.title,
          icon: intro.icon,
          category: "intro" as const,
          order: 1,
        },
      ]
    : []),
  ...remoteWorkshops.map((w, i) => ({
    id: w.id,
    date: w.date,
    title: w.title,
    icon: w.icon,
    category: "remote" as const,
    order: 2 + i,
  })),
  {
    id: "onsite",
    date: onsiteWorkshops.date,
    title: "الورش الحضورية",
    icon: "CalendarClock",
    category: "onsite" as const,
    meta: onsiteWorkshops.time,
    order: 6,
  },
  ...closingStages.map((s, i) => ({
    id: `closing-${i}`,
    date: s.date,
    title: s.title,
    icon: s.icon,
    category: "closing" as const,
    order: 7 + i,
  })),
];
