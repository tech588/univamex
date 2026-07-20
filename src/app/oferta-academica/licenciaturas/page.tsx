import type { Metadata } from "next";
import { LevelPage } from "@/components/level-page";

export const metadata: Metadata = {
  title: "Licenciaturas en Ecatepec",
  description:
    "Compara licenciaturas e ingenierías en Ecatepec por área, modalidad, duración, RVOE y plan de estudios en UNIVAMEX.",
  alternates: { canonical: "/oferta-academica/licenciaturas" },
};

export default function LicenciaturasPage() {
  return <LevelPage level="Licenciatura" />;
}



