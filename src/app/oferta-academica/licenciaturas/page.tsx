import type { Metadata } from "next";
import { LevelPage } from "@/components/level-page";

export const metadata: Metadata = {
  title: "Licenciaturas",
  description:
    "Licenciaturas e ingenierías de UNIVAMEX por área profesional, modalidad y duración.",
};

export default function LicenciaturasPage() {
  return <LevelPage level="Licenciatura" />;
}



