import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TargetAudience } from "@/components/sections/TargetAudience";
import { Objectives } from "@/components/sections/Objectives";
import { Tracks } from "@/components/sections/Tracks";
import { Timeline } from "@/components/sections/Timeline";
import { Benefits } from "@/components/sections/Benefits";
import { Prizes } from "@/components/sections/Prizes";
import { EvaluationCriteria } from "@/components/sections/EvaluationCriteria";
import { Program } from "@/components/sections/Program";
import { Partners } from "@/components/sections/Partners";
import { Faq } from "@/components/sections/Faq";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <TargetAudience />
        <Objectives />
        <Tracks />
        <Timeline />
        <Benefits />
        <Prizes />
        <EvaluationCriteria />
        <Program />
        <Partners />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
