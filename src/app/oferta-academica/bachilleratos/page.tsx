import type { Metadata } from "next";
import { LevelPage } from "@/components/level-page";

export const metadata: Metadata = {
  title: "Bachilleratos tecnológicos en Ecatepec",
  description:
    "Bachilleratos tecnológicos en Ecatepec: Informática Administrativa, Trabajo Social y Turismo en UNIVAMEX.",
  alternates: { canonical: "/oferta-academica/bachilleratos" },
};

export default function BachilleratosPage() {
  return <LevelPage level="Bachillerato" />;
}



