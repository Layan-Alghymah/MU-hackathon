export interface EvaluationCriterion {
  id: string;
  icon: string;
  title: string;
}

/** معايير تقييم المشاريع المشاركة — ثمانية معايير. */
export const evaluationCriteria: EvaluationCriterion[] = [
  { id: "innovation", icon: "Lightbulb", title: "الابتكار والأصالة" },
  { id: "applicability", icon: "Wrench", title: "القابلية للتطبيق" },
  { id: "business-model", icon: "Recycle", title: "نموذج العمل والاستدامة" },
  { id: "presentation", icon: "Presentation", title: "جودة العرض والتقديم" },
  { id: "value-impact", icon: "TrendingUp", title: "القيمة والأثر" },
  { id: "emerging-tech", icon: "Cpu", title: "استخدام التقنيات الناشئة" },
  { id: "integration", icon: "Workflow", title: "التكامل والجاهزية" },
  { id: "prototype-quality", icon: "FlaskConical", title: "جودة النموذج الأولي" },
];
