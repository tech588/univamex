import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { HomeCampusPreview } from "@/components/home-campus-preview";
import { HomeContactGuide } from "@/components/home-contact-guide";
import { HomeFaqPreview } from "@/components/home-faq-preview";
import { HomeInstitutional } from "@/components/home-institutional";
import { HomePathways } from "@/components/home-pathways";
import { ProgramLevelsPreview } from "@/components/program-levels-preview";

export const metadata: Metadata = {
  title: "Universidad en Ecatepec | UNIVAMEX",
  description: "Estudia bachillerato, licenciatura, maestría o doctorado en UNIVAMEX Ecatepec. Compara programas, modalidades, RVOE, planes y colegiaturas.",
  alternates: { canonical: "/" },
};

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
