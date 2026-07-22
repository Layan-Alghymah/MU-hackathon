const INQUIRIES_GROUP_URL =
  "https://chat.whatsapp.com/FScVg49cb4R84O4mrIHdyJ?mode=gi_t";

/** أيقونة واتساب (SVG مضمّن — لا Emoji). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

/**
 * زر عائم ثابت للانضمام إلى قروب الاستفسارات على واتساب.
 * أسفل يسار الشاشة (مناسب لـ RTL)، دائري بالأيقونة على الجوال،
 * ويتوسّع لعرض النص على سطح المكتب. يراعي Safe Area في iPhone.
 */
export function WhatsAppFloatingButton() {
  return (
    <a
      href={INQUIRIES_GROUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="الانضمام إلى قروب الاستفسارات على واتساب"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      className="group fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-black/25 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 sm:bottom-6 sm:left-6 sm:py-3 sm:pe-4 sm:ps-3.5"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      {/* النص يظهر على سطح المكتب فقط، ويتبدّل عند المرور */}
      <span className="hidden whitespace-nowrap text-sm font-semibold sm:inline sm:group-hover:hidden">
        قروب الاستفسارات
      </span>
      <span className="hidden whitespace-nowrap text-sm font-semibold sm:group-hover:inline">
        انضم لقروب الاستفسارات
      </span>
    </a>
  );
}
