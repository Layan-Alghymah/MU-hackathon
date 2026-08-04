import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// عند البناء لـ GitHub Pages يُضبط GITHUB_PAGES=true فيُضاف مسار المشروع الأساسي.
// محليًا يبقى فارغًا حتى يعمل الموقع على الجذر.
const isPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/MUhackathon";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // تصدير ثابت (HTML) مناسب لاستضافة GitHub Pages.
  output: "export",
  // روابط بشرطة نهائية لتوليد index.html داخل كل مسار (يخدمها Pages بثبات).
  trailingSlash: true,
  basePath: isPages ? repoBase : "",
  assetPrefix: isPages ? `${repoBase}/` : "",
  // يُمرَّر للعميل ليضيف بادئة المسار لصور public يدويًا
  // (next/image لا يضيف basePath للصور مع التصدير الثابت + unoptimized).
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? repoBase : "",
  },
  // حصر جذر تتبّع الملفات على مجلد المشروع (يوجد lockfile في المجلد الأب).
  outputFileTracingRoot: __dirname,
  images: {
    // مطلوب مع التصدير الثابت (لا خادم لتحسين الصور).
    unoptimized: true,
    remotePatterns: [],
  },
};

export default nextConfig;
