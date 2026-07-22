/**
 * الشركاء — لا يُعرض القسم إلا عند اعتماد بيانات رسمية وتفعيل featureFlags.showPartners.
 * القائمة فارغة عمدًا (لا شعارات أو تصنيفات مُخترعة).
 */
export interface Partner {
  name: string;
  category: string;
  logo: string | null;
  url?: string | null;
}

export const partners: Partner[] = [];

/** الجهة المنظّمة (تظهر في التذييل). */
export const organizer = {
  name: "جامعة المجمعة",
  logo: "/logos/majmaah-university.png",
  url: "https://www.mu.edu.sa",
};
