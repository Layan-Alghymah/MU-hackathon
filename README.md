# هاكثون الجامعة الذكية — جامعة المجمعة

موقع تسويقي رسمي مستقل لـ**هاكثون الجامعة الذكية** الذي تنظمه جامعة المجمعة.
عربي بالكامل، اتجاه RTL، Mobile‑First، وأداء عالٍ.

## التقنيات

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (حركات خفيفة تحترم `prefers-reduced-motion`)
- **Lucide Icons**

## التشغيل

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # بناء الإنتاج
npm run start    # تشغيل الإنتاج
```

## البنية

```
app/            # App Router: الصفحة الرئيسية + صفحات المسارات /tracks/[slug]
components/      # مكونات الواجهة (layout / sections / ui)
data/            # كل المحتوى منفصل عن الواجهة (site, objectives, tracks, timeline, workshops, faq)
lib/             # أدوات مساعدة ومنطق التواريخ/العدّاد
public/          # الأصول (شعار الجامعة)
```

## تعديل المحتوى

كل النصوص والمواعيد والمسارات في مجلد `data/`:

- `data/site.ts` — الإعدادات المركزية + **Feature Flags** + روابط التنقل.
- `data/objectives.ts` — الأهداف.
- `data/tracks.ts` — المسارات الثلاثة وأمثلة مجالات التحديات.
- `data/timeline.ts` — البرنامج الزمني.
- `data/workshops.ts` — الورش عن بُعد والحضورية والمراحل الختامية.
- `data/faq.ts` — الأسئلة الشائعة.

### بيانات تُعتمد لاحقًا

القيم غير المعلنة رسميًا تبقى `null` فتُخفى من الواجهة بدل عرض بيانات وهمية:

- **السنة:** `siteConfig.year` — عيّنها لتفعيل العدّاد التنازلي (حتى ذلك تُعرض التواريخ نصيًا).
- **رابط التسجيل:** `siteConfig.registrationUrl`.
- **الدليل الإرشادي:** `siteConfig.guideUrl`.

### الهوية البصرية

ألوان الهوية مُعرّفة كـ CSS Variables في `app/globals.css` (أخضر `#536830` وذهبي `#a5893f`) وقابلة للاستبدال بالهوية الرسمية بسهولة. شعار الهاكثون مكانه محجوز (Placeholder) دون اختراع شعار رسمي.
