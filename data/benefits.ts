export interface Benefit {
  id: string;
  icon: string;
  title: string;
}

/** مزايا المشاركة في الهاكثون. */
export const benefits: Benefit[] = [
  {
    id: "cash-prizes",
    icon: "Banknote",
    title: "مكافآت مالية للمراكز الثلاثة الأولى",
  },
  {
    id: "completion-certificates",
    icon: "GraduationCap",
    title: "شهادات إتمام المعسكر التدريبي لجميع المشاركين",
  },
  {
    id: "attendance-certificates",
    icon: "ScrollText",
    title: "شهادات حضور للورش والفعاليات المصاحبة",
  },
  {
    id: "incubation",
    icon: "Rocket",
    title:
      "فرص للاستفادة من مساحات العمل المشتركة والاحتضان في مركز الابتكار وريادة الأعمال بجامعة المجمعة",
  },
];
