import type { Metadata } from "next";
import { LevelPage } from "@/components/level-page";

export const metadata: Metadata = {
  title: "Maestrías en Ecatepec",
  description:
    "Explora la Maestría en Educación y la Maestría en Juicios Orales de UNIVAMEX en Ecatepec.",
  alternates: { canonical: "/oferta-academica/maestrias" },
};

export default function MaestriasPage() {
  return <LevelPage level="Maestría" />;
}
