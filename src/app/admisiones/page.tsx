import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { AdmissionsChecklist } from "@/components/admissions-checklist";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { academicSchedules } from "@/data/admissions";

export const metadata: Metadata = {
  title: "Admisiones",
  description:
    "Requisitos de admisión por nivel en UNIVAMEX y contacto para revisar documentos.",
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
      <section className="bg-[#F8FAFC] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              title="Documentos por nivel"
              description="Revisa lo que necesitas para bachillerato, licenciatura, maestría o doctorado. Costos, becas, horarios, ubicación y fechas de inicio deben confirmarse con un asesor."
            />
            <div className="mt-8">
              <WhatsAppButton
                label="Revisar mis documentos"
                question="admisiones y documentos"
              />
            </div>
          </div>
          <AdmissionsChecklist />
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Modalidades, horarios e inicios"
            description="Consulta una referencia general por nivel. La disponibilidad de grupos debe confirmarse directamente con admisiones."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {academicSchedules.map((item) => (
              <article className="border border-slate-200 bg-[#f8fafc] p-5" key={item.level}>
                <h2 className="font-editorial text-2xl font-semibold text-[#04215e]">
                  {item.level}
                </h2>
                <dl className="mt-5 grid gap-4 text-sm leading-6 text-slate-600">
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
          <div className="mt-6 flex flex-col gap-4 border-l-4 border-[#e7a928] bg-[#f8fafc] p-5 sm:flex-row sm:items-center sm:justify-between">
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

      <section className="bg-[#f8fafc] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-editorial text-2xl font-semibold leading-snug text-[#04215e]">
            Proceso recomendado
          </h2>
          <ol className="mt-6 grid gap-4">
            {[
              "Elige tu programa de interés.",
              "Revisa modalidad, duración, RVOE y campo laboral.",
              "Prepara los documentos de tu nivel.",
              "Solicita orientación para confirmar costos, horarios y siguiente paso.",
            ].map((step, index) => (
              <li className="flex gap-4 text-slate-700" key={step}>
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



