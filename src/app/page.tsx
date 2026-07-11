import { Hero } from "@/components/hero";
import { ProgramLevelsBento } from "@/components/program-levels-bento";
import { StickyStorytelling } from "@/components/sticky-storytelling";

export default function Home() {
  return (
    <main className="home-main">
      <Hero />
      <ProgramLevelsBento />
      <StickyStorytelling />
    </main>
  );
}
