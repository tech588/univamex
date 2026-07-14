import { Hero } from "@/components/hero";
import { HomeCampusPreview } from "@/components/home-campus-preview";
import { HomeContactGuide } from "@/components/home-contact-guide";
import { HomeFaqPreview } from "@/components/home-faq-preview";
import { HomeInstitutional } from "@/components/home-institutional";
import { HomePathways } from "@/components/home-pathways";
import { ProgramLevelsPreview } from "@/components/program-levels-preview";

export default function Home() {
  return (
    <main className="home-main">
      <Hero />
      <ProgramLevelsPreview />
      <HomePathways />
      <HomeInstitutional />
      <HomeCampusPreview />
      <HomeFaqPreview />
      <HomeContactGuide />
    </main>
  );
}
