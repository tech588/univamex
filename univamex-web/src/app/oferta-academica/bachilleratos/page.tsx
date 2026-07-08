import type { Metadata } from "next";
import { LevelPage } from "@/components/level-page";

export const metadata: Metadata = {
  title: "Bachilleratos",
  description:
    "Bachilleratos técnicos de UNIVAMEX en informática administrativa, trabajo social y turismo.",
};

export default function BachilleratosPage() {
  return <LevelPage level="Bachillerato" />;
}



