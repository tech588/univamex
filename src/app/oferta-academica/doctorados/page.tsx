import type { Metadata } from "next";
import { LevelPage } from "@/components/level-page";

export const metadata: Metadata = {
  title: "Doctorados",
  description:
    "Explora los doctorados de UNIVAMEX por modalidad, duración y área de investigación.",
};

export default function DoctoradosPage() {
  return <LevelPage level="Doctorado" />;
}
