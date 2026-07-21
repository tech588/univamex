import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { AdmissionsChecklist } from "@/components/admissions-checklist";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { academicSchedules } from "@/data/admissions";

export const metadata: Metadata = {
  title: "Admisiones UNIVAMEX en Ecatepec",
  description:
    "Requisitos, horarios generales, inicios y proceso de admisión por nivel en UNIVAMEX Ecatepec.",
  alternates: { canonical: "/admisiones" },
};

export default function AdmisionesPage() {
  return (
    <main>
      <PageHero
        title="Admisiones"
        description="Prepara tu ingreso con documentos claros, pasos simples y orientación desde el primer contacto."
        image="/images/GRADOS.png"
        imageClassName="object-[58%_center]"
      />
      <section className="bg-[#F8FAFC] px-4 py-9 sm:px-6 sm:py-12 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div>
            <SectionHeading
              title="Documentos por nivel"
              description="Revisa lo que necesitas para bachillerato, licenciatura, maestría o doctorado. Horarios, ubicación y fechas de inicio deben confirmarse con un asesor."
            />
            <div className="mt-5 sm:mt-8">
              <WhatsAppButton
                label="Revisar mis documentos"
                question="admisiones y documentos"
              />
            </div>
          </div>
          <AdmissionsChecklist />
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Modalidades, horarios e inicios"
            description="Consulta una referencia general por nivel. La disponibilidad de grupos debe confirmarse directamente con admisiones."
          />
          <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
            {academicSchedules.map((item) => (
              <article className="border border-slate-200 bg-[#f8fafc] p-3 sm:p-5" key={item.level}>
                <h2 className="font-editorial text-lg font-semibold leading-snug text-[#04215e] sm:text-2xl">
                  {item.level}
                </h2>
                <dl className="mt-3 grid gap-2 text-xs leading-5 text-slate-600 sm:mt-5 sm:gap-4 sm:text-sm sm:leading-6">
                  <div>
                    <dt className="flex items-center gap-2 font-bold text-[#071a3d]">
                      <Clock3 aria-hidden="true" className="h-4 w-4 text-[#1e40af]" />
                      Horario y modalidad
                    </dt>
                    <dd className="mt-1">{item.schedule}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#071a3d]">Duración general</dt>
                    <dd className="mt-1">{item.duration}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-bold text-[#071a3d]">
                      <CalendarDays aria-hidden="true" className="h-4 w-4 text-[#1e40af]" />
                      Inicios de clases
                    </dt>
                    <dd className="mt-1">{item.starts}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 border-l-4 border-[#e7a928] bg-[#f8fafc] p-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
            <p className="text-sm leading-6 text-slate-600">
              ¿Aún no eliges programa? Compara primero la oferta y vuelve a esta página con una opción en mente.
            </p>
            <Link className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[#04215e]" href="/oferta-academica">
              Explorar programas
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-4xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
          <h2 className="font-editorial text-2xl font-semibold leading-snug text-[#04215e]">
            Proceso recomendado
          </h2>
          <ol className="mt-4 grid gap-3 sm:mt-6 sm:gap-4">
            {[
              "Elige tu programa de interés.",
              "Revisa modalidad, duración, RVOE y campo laboral.",
              "Prepara los documentos de tu nivel.",
              "Solicita orientación para confirmar horarios, disponibilidad y siguiente paso.",
            ].map((step, index) => (
              <li className="flex gap-3 text-sm leading-5 text-slate-700 sm:gap-4 sm:text-base sm:leading-6" key={step}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#1E3A8A] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}



