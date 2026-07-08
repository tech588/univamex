import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, BrainCircuit } from "lucide-react";
import { Accordion } from "@/components/accordion";
import { AdmissionsChecklist } from "@/components/admissions-checklist";
import { ProgramCard } from "@/components/program-card";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  getProgramBySlug,
  getRelatedPrograms,
  programs,
} from "@/data/programs";

type ProgramPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    return {
      title: "Programa no encontrado",
    };
  }

  return {
    title: program.name,
    description: `${program.description} Solicita informes de ${program.name} en UNIVAMEX.`,
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const related = getRelatedPrograms(program);

  return (
    <main>
      <section className="bg-[#F8FAFC] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1E3A8A]"
            href="/oferta-academica"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Volver a oferta académica
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-[#B45309]">
                {program.level} · {program.area}
              </p>
              <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
                {program.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                {program.promise}
              </p>
              <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ["Modalidad", program.modality],
                  ["Duración", program.duration],
                  ["RVOE", program.rvoe],
                  ["Materias", program.subjects ?? "por confirmar"],
                ].map(([label, value]) => (
                  <div
                    className="rounded-lg border border-slate-200 bg-white p-4"
                    key={label}
                  >
                    <dt className="text-xs font-bold uppercase text-slate-500">
                      {label}
                    </dt>
                    <dd className="mt-1 font-semibold text-[#0F172A]">
                      {value}
                      {label === "RVOE" && program.rvoeStatus === "review" ? (
                        <span className="text-[#B45309]"> por confirmar</span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton program={program.name} />
                <Link
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#1E3A8A] transition hover:border-[#1E40AF] hover:bg-[#EFF6FF]"
                  href="/admisiones"
                >
                  Ver requisitos
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10">
              <Image
                src={program.image}
                alt={program.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="Resumen del programa"
            description={program.description}
          />
          <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-6">
            <h2 className="font-heading text-2xl font-bold text-[#0F172A]">
              Para quien es
            </h2>
            <ul className="mt-5 grid gap-3 text-slate-700">
              {(program.entryProfile ?? [
                "Aspirantes con interés en el área profesional del programa.",
                "Personas que buscan una ruta académica con aplicación práctica.",
                "Estudiantes que quieren resolver dudas con asesoria directa.",
              ]).map((item) => (
                <li className="rounded-lg bg-white px-4 py-3" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#EFF6FF] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <BrainCircuit
              aria-hidden="true"
              className="h-9 w-9 text-[#1E40AF]"
            />
            <SectionHeading
              title="IA en tu carrera"
              description="Aplicaciones concretas de inteligencia artificial conectadas con tu formación y campo laboral."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {program.aiApplications.map((application) => (
              <div
                className="rounded-lg border border-blue-100 bg-white p-5 font-semibold text-[#0F172A]"
                key={application}
              >
                {application}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <BriefcaseBusiness
              aria-hidden="true"
              className="h-9 w-9 text-[#1E40AF]"
            />
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#0F172A]">
              Perfil de egreso
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {program.graduateProfile.map((item) => (
                <li
                  className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-slate-700"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-[#0F172A]">
              Campo laboral
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {program.careerField.map((item) => (
                <li
                  className="rounded-lg bg-[#1E3A8A] px-4 py-3 text-sm font-semibold text-white"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="Plan de estudios"
            description="Contenido en formato escaneable para móvil. El asesor puede apoyarte con detalles de horarios, costos y grupos disponibles."
          />
          <Accordion items={program.studyPlan} />
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              title="Requisitos de admisión"
              description="Documentos solicitados para iniciar tu proceso."
            />
            <div className="mt-8">
              <WhatsAppButton
                label="Revisar documentos"
                program={program.name}
              />
            </div>
          </div>
          <AdmissionsChecklist level={program.requirementsLevel} />
        </div>
      </section>

      {related.length ? (
        <section className="bg-[#F8FAFC] px-5 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Programas relacionados"
              description="Compara opciones cercanas por área o nivel."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((candidate) => (
                <ProgramCard key={candidate.slug} program={candidate} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}



