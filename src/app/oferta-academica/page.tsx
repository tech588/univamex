import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProgramFinder } from "@/components/program-finder";
import { SectionHeading } from "@/components/section-heading";
import { programs } from "@/data/programs";
import { parseProgramLevel } from "@/lib/program-levels";

export const metadata: Metadata = {
  title: "Oferta académica",
  description:
    "Explora bachilleratos, licenciaturas, maestrías y doctorado de UNIVAMEX por nivel, área y modalidad.",
};

type OfertaAcademicaPageProps = {
  searchParams: Promise<{ nivel?: string }>;
};

export default async function OfertaAcademicaPage({
  searchParams,
}: OfertaAcademicaPageProps) {
  const { nivel } = await searchParams;
  const initialLevel = parseProgramLevel(nivel);

  return (
    <main>
      <PageHero
        title="Oferta académica"
        description="Elige una ruta por nivel, área profesional y modalidad antes de hablar con admisiones."
        image="/images/legacy/estudiantes-campus.jpg"
        imageClassName="object-[50%_center]"
      />
      <section className="bg-[#F8FAFC] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Compara por nivel y área"
            description="Encuentra el programa correcto, revisa su ficha y llega a contacto con contexto de tu carrera de interés."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Bachilleratos",
                href: "/oferta-academica/bachilleratos",
                text: "Preparatorias técnicas con herramientas actuales.",
              },
              {
                label: "Licenciaturas",
                href: "/oferta-academica/licenciaturas",
                text: "Carreras para desarrollar tu ruta profesional.",
              },
              {
                label: "Maestrías",
                href: "/oferta-academica/maestrias",
                text: "Especialización para crecer profesionalmente.",
              },
              {
                label: "Doctorados",
                href: "/oferta-academica/doctorados",
                text: "Investigación avanzada con impacto académico.",
              },
            ].map((item) => (
              <Link
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1E40AF]"
                href={item.href}
                key={item.href}
              >
                <span className="font-editorial text-xl font-semibold leading-snug text-[#04215e]">
                  {item.label}
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">
                  {item.text}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1E3A8A]">
                  Ver programas
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <ProgramFinder
              programs={programs}
              initialLevel={initialLevel}
              syncLevelToUrl
            />
          </div>
        </div>
      </section>
    </main>
  );
}



