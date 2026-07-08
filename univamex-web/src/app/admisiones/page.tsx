import type { Metadata } from "next";
import { AdmissionsChecklist } from "@/components/admissions-checklist";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata: Metadata = {
  title: "Admisiones",
  description:
    "Requisitos de admisión por nivel en UNIVAMEX y contacto por WhatsApp para revisar documentos.",
};

export default function AdmisionesPage() {
  return (
    <main>
      <section className="bg-[#F8FAFC] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              title="Admisiones"
              description="Revisa los documentos que necesitas según tu nivel. Si tienes dudas sobre costos, becas, horarios, ubicación o fechas de inicio, escribenos por WhatsApp."
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
        <div className="mx-auto max-w-4xl rounded-lg border border-slate-200 p-6 shadow-sm sm:p-8">
          <h2 className="font-heading text-2xl font-bold text-[#0F172A]">
            Proceso recomendado
          </h2>
          <ol className="mt-6 grid gap-4">
            {[
              "Elige tu programa de interés.",
              "Revisa modalidad, duración, RVOE y campo laboral.",
              "Prepara los documentos de tu nivel.",
              "Escribe a WhatsApp para confirmar costos, horarios y siguiente paso.",
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



