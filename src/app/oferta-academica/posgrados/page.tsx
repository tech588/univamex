import type { Metadata } from "next";
import { ProgramFinder } from "@/components/program-finder";
import { SectionHeading } from "@/components/section-heading";
import { programs } from "@/data/programs";

export const metadata: Metadata = {
  title: "Posgrados en Ecatepec",
  description:
    "Maestrías y doctorado de UNIVAMEX en Ecatepec para profesionistas, docentes e investigadores.",
  alternates: { canonical: "/oferta-academica/posgrados" },
};

export default function PosgradosPage() {
  const posgrados = programs.filter(
    (program) => program.level === "Maestría" || program.level === "Doctorado",
  );

  return (
    <main>
      <section className="bg-[#F8FAFC] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Posgrados"
            description="Maestrías y doctorado para fortalecer tu práctica profesional, investigación e impacto educativo."
          />
          <div className="mt-8">
            <ProgramFinder programs={posgrados} />
          </div>
        </div>
      </section>
    </main>
  );
}



