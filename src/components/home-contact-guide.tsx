import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { GuidedWhatsAppForm } from "@/components/guided-whatsapp-form";
import { campuses } from "@/data/campuses";
import { programs } from "@/data/programs";
import { siteConfig } from "@/data/site";

export function HomeContactGuide() {
  return (
    <section className="bg-[#04215e] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10" id="solicitar-informes">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-bold text-[#e7a928]">Solicita orientación</p>
          <h2 className="mt-3 max-w-xl font-heading text-[2rem] font-semibold leading-[1.02] sm:text-4xl lg:text-5xl">
            Llega a admisiones con tu interés claro
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            Completa tres datos y prepararemos un mensaje para que el equipo pueda orientarte sobre requisitos, modalidad, horarios y fechas de inicio.
          </p>
          <div className="mt-7 flex gap-3 border-l-2 border-[#e7a928] pl-4 text-sm leading-6 text-white/75">
            <Clock3 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#e7a928]" />
            <p>Horario de atención: {siteConfig.serviceHours}.</p>
          </div>
          <Link
            className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-white/40 text-sm font-bold text-white"
            href="/contacto"
          >
            Ver todos los canales de contacto
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <GuidedWhatsAppForm
          programs={programs.map(({ name, level }) => ({ name, level }))}
          campuses={campuses.map(({ name }) => name)}
          source="Home"
        />
      </div>
    </section>
  );
}
