import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleHelp } from "lucide-react";
import { FinalContactCta } from "@/components/final-contact-cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { faqItems } from "@/data/faq";

const supportLinks = [
  {
    label: "Ver oferta académica",
    href: "/oferta-academica",
    text: "Compara programas por nivel, área y modalidad.",
  },
  {
    label: "Revisar admisiones",
    href: "/admisiones",
    text: "Consulta documentos necesarios para iniciar.",
  },
  {
    label: "Conocer campus",
    href: "/campus",
    text: "Ubica sedes y abre el recorrido virtual.",
  },
  {
    label: "Contactar asesor",
    href: "/contacto",
    text: "Confirma costos, fechas, horarios y grupos.",
  },
] as const;

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Preguntas frecuentes sobre RVOE, duración, admisiones, campus y horarios en UNIVAMEX.",
};

export default function FaqPage() {
  return (
    <main>
      <PageHero
        title="Preguntas frecuentes"
        description="Resuelve dudas clave antes de elegir programa, revisar documentos o hablar con admisiones."
        image="/images/EVENTOS1.png"
        imageClassName="object-[55%_center]"
      />

      <section className="bg-[#F8FAFC] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionHeading
              title="Respuestas rápidas para decidir"
              description="El objetivo de esta página es quitar fricción: primero resuelve lo básico, luego compara programas o confirma detalles con un asesor."
            />
            <div className="mt-8 grid gap-3">
              {supportLinks.map((item) => (
                <Link
                  className="group border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition hover:border-[#04215e]/40 hover:shadow-md"
                  href={item.href}
                  key={item.href}
                >
                  <span className="font-editorial text-xl font-semibold leading-snug text-[#071a3d]">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {item.text}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1e3a8a]">
                    Abrir
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {faqItems.map((item) => (
              <details
                className="group border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 open:border-[#04215e]/35"
                key={item.question}
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left font-editorial text-xl font-semibold leading-snug text-[#071a3d] marker:hidden">
                  <span>{item.question}</span>
                  <CircleHelp
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-[#1e40af] transition group-open:rotate-45"
                  />
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalContactCta />
    </main>
  );
}
