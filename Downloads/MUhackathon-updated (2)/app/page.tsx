import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Objectives } from "@/components/sections/Objectives";
import { Tracks } from "@/components/sections/Tracks";
import { Timeline } from "@/components/sections/Timeline";
import { Awards } from "@/components/sections/Awards";
import { Program } from "@/components/sections/Program";
import { Faq } from "@/components/sections/Faq";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Objectives />
        <Tracks />
        <Timeline />
        <Awards />
        <Program />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
