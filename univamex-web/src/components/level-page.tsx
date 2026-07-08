import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProgramFinder } from "@/components/program-finder";
import { SectionHeading } from "@/components/section-heading";
import { getProgramsByLevel } from "@/data/programs";
import type { ProgramLevel } from "@/types/content";

const levelCopy: Record<ProgramLevel, string> = {
  Bachillerato:
    "Preparatorias técnicas para iniciar tu formación profesional desde antes de la universidad.",
  Licenciatura:
    "Carreras para construir una ruta profesional en tecnología, negocios, derecho, educación, creatividad y servicios.",
  Maestría:
    "Posgrados para actualizar tu práctica profesional y fortalecer tu toma de decisiones.",
  Doctorado:
    "Investigación de alto nivel con impacto educativo, científico y social.",
};

export function LevelPage({ level }: { level: ProgramLevel }) {
  const levelPrograms = getProgramsByLevel(level);

  return (
    <main>
      <section className="bg-[#F8FAFC] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1E3A8A]"
            href="/oferta-academica"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Volver a oferta académica
          </Link>
          <div className="mt-8">
            <SectionHeading
              title={level}
              description={`${levelCopy[level]} Elige un programa y habla con un asesor para resolver dudas.`}
            />
          </div>
          <div className="mt-8">
            <ProgramFinder programs={levelPrograms} initialLevel={level} />
          </div>
        </div>
      </section>
    </main>
  );
}



