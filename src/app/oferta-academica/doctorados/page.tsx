import type { Metadata } from "next";
import { LevelPage } from "@/components/level-page";

export const metadata: Metadata = {
  title: "Doctorado en Educación y Neurociencias",
  description:
    "Conoce el Doctorado en Educación, Neurociencias y Perspectiva de Género de UNIVAMEX: modalidad, duración, RVOE y plan.",
  alternates: { canonical: "/oferta-academica/doctorados" },
};

export default function DoctoradosPage() {
  return <LevelPage level="Doctorado" />;
}
