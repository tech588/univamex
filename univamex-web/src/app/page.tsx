import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  FileCheck2,
  GraduationCap,
} from "lucide-react";
import { AdmissionsChecklist } from "@/components/admissions-checklist";
import { Hero } from "@/components/hero";
import { ProgramCard } from "@/components/program-card";
import { ProgramFinder } from "@/components/program-finder";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { programs } from "@/data/programs";

export default function Home() {
  const featuredPrograms = programs.filter((program) => program.featured);

  return (
    <main>
      <Hero />

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Oferta clara",
                text: "Explora bachilleratos, licenciaturas y posgrados con datos de modalidad, duración y RVOE.",
                icon: GraduationCap,
              },
              {
                title: "IA aplicada",
                text: "Cada programa muestra usos concretos de inteligencia artificial vinculados a tu campo profesional.",
                icon: BrainCircuit,
              },
              {
                title: "Admisiones simples",
                text: "Revisa tus documentos por nivel y conversa con un asesor para resolver dudas.",
                icon: FileCheck2,
              },
            ].map((item) => (
              <article
                className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-6"
                key={item.title}
              >
                <item.icon
                  aria-hidden="true"
                  className="h-8 w-8 text-[#1E40AF]"
                />
                <h2 className="mt-5 font-heading text-xl font-bold text-[#0F172A]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              title="Oferta académica"
              description="Filtra por nivel, área y modalidad para encontrar el programa que mejor se adapta a tu ruta."
            />
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#1E3A8A] transition hover:border-[#1E40AF] hover:bg-[#EFF6FF]"
              href="/oferta-academica"
            >
              Ver todo
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8">
            <ProgramFinder programs={programs} />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              title="IA en tu carrera"
              description="UNIVAMEX convierte la inteligencia artificial en herramientas prácticas para estudiar, investigar, producir y decidir mejor."
            />
            <div className="mt-8">
              <WhatsAppButton
                label="Preguntar por IA en mi carrera"
                question="la inteligencia artificial aplicada a las carreras"
              />
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featuredPrograms.slice(0, 4).map((program) => (
              <article
                className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5"
                key={program.slug}
              >
                <p className="text-xs font-bold uppercase text-[#B45309]">
                  {program.shortName}
                </p>
                <h3 className="mt-2 font-heading text-lg font-bold text-[#0F172A]">
                  {program.aiApplications[0]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {program.promise}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EFF6FF] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="Admisiones sin vueltas"
            description="Prepara tus documentos por nivel. Si te falta algo o no sabes por donde empezar, un asesor puede revisarlo contigo por WhatsApp."
          />
          <AdmissionsChecklist />
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Programas destacados"
            description="Rutas con alta demanda para aspirantes que quieren combinar formación académica, empleabilidad y herramientas actuales."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredPrograms.slice(0, 6).map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}



