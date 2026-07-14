import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProgramFinder } from "@/components/program-finder";
import { programs } from "@/data/programs";
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
            <h1 className="font-heading text-[2.5rem] font-semibold leading-[0.98] text-[#04215e] sm:text-5xl">
              {level}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {levelCopy[level]} Elige un programa y habla con un asesor para resolver dudas.
            </p>
          </div>
          <div className="mt-8">
            <ProgramFinder
              programs={programs}
              initialLevel={level}
              navigateOnLevelChange
            />
          </div>
        </div>
      </section>
    </main>
  );
}



