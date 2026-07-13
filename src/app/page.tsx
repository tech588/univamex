import { Hero } from "@/components/hero";
import { FinalContactCta } from "@/components/final-contact-cta";
import { HomeInstitutional } from "@/components/home-institutional";
import { HomePathways } from "@/components/home-pathways";
import { ProgramLevelsBento } from "@/components/program-levels-bento";
import { StickyStorytelling } from "@/components/sticky-storytelling";

export default function Home() {
  return (
    <main className="home-main">
      <Hero />
      <HomeInstitutional />
      <ProgramLevelsBento />
      <HomePathways />
      <StickyStorytelling />
      <FinalContactCta />
    </main>
  );
}
