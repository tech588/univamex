import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";

const nextSteps = [
  "Elige un programa o nivel académico.",
  "Revisa documentos y modalidad.",
  "Confirma horarios, grupos y disponibilidad con un asesor.",
] as const;

export function FinalContactCta() {
  return (
    <section className="bg-[#04215e] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <p className="text-sm font-bold text-[#e7a928]">
            Guía directa
          </p>
          <h2 className="mt-2 max-w-3xl font-heading text-[1.75rem] font-semibold leading-[1.04] tracking-normal sm:mt-3 sm:text-4xl sm:leading-[0.98] lg:text-5xl">
            Si ya tienes una carrera en mente, el siguiente paso es hablar con
            admisiones
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/78">
            Un asesor puede ayudarte a confirmar requisitos, disponibilidad,
            sede, modalidad y fechas de inicio para tu caso.
          </p>
        </div>

        <div className="border border-white/15 bg-white/8 p-4 sm:p-6">
          <ul className="grid gap-4">
            {nextSteps.map((step) => (
              <li className="flex gap-3 text-sm leading-6 text-white/82" key={step}>
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#e7a928]"
                />
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton
              label="Hablar con un asesor"
              source="CTA final"
              variant="light"
            />
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              href="/contacto"
            >
              Ver contacto
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
