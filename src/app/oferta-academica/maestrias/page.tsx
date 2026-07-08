import type { Metadata } from "next";
import { LevelPage } from "@/components/level-page";

export const metadata: Metadata = {
  title: "Maestrías",
  description:
    "Explora las maestrías de UNIVAMEX por modalidad, duración y área profesional.",
};

export default function MaestriasPage() {
  return <LevelPage level="Maestría" />;
}
