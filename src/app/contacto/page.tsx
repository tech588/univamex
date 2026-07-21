import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import { GuidedWhatsAppForm } from "@/components/guided-whatsapp-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { campuses } from "@/data/campuses";
import { programs } from "@/data/programs";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto y campus UNIVAMEX Ecatepec",
  description:
    "Contacta admisiones UNIVAMEX en Ecatepec por teléfono, WhatsApp o correo. Consulta horarios y ubicación de Ciudad Azteca y Las Américas.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <main>
      <PageHero
        title="Contacto"
        description="Confirma inscripciones, horarios, grupos y ubicación con el equipo de UNIVAMEX."
        image="/images/UNIVAMEX5.png"
        imageClassName="object-[50%_center]"
      />
      <section className="bg-[#F8FAFC] px-4 py-9 sm:px-6 sm:py-12 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div>
            <SectionHeading
              title="Habla con admisiones"
              description="Usa el canal que prefieras. Para confirmar horarios, grupos disponibles o datos de inscripción, comunícate directamente con un asesor."
            />
            <div className="mt-5 sm:mt-8">
              <WhatsAppButton label="Escribir por WhatsApp" source="Contacto" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-5">
            {[
              {
                label: "WhatsApp",
                value: siteConfig.whatsappDisplay,
                icon: MessageCircle,
              },
              { label: "Teléfono", value: siteConfig.phone, icon: Phone },
              { label: "Correo", value: siteConfig.email, icon: Mail },
              {
                label: "Horario de atención",
                value: siteConfig.serviceHours,
                icon: Clock3,
              },
              { label: "Facebook", value: siteConfig.facebook, icon: Share2 },
              {
                label: "Instagram",
                value: "@univamex_oficial",
                icon: Camera,
              },
            ].map((item) => (
              <article
                className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm shadow-slate-900/5 sm:p-5"
                key={item.label}
              >
                <item.icon
                  aria-hidden="true"
                  className="h-5 w-5 text-[#1E40AF] sm:h-6 sm:w-6"
                />
                <h2 className="mt-2 font-editorial text-base font-semibold leading-snug text-[#04215e] sm:mt-4 sm:text-lg">
                  {item.label}
                </h2>
                <p className="mt-1 break-words text-xs leading-5 text-slate-600 sm:mt-2 sm:text-sm sm:leading-6">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#04215e] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
          <div>
            <p className="text-sm font-bold text-[#e7a928]">Mensaje guiado</p>
            <h2 className="mt-2 font-heading text-[1.75rem] font-semibold leading-[1.04] sm:mt-3 sm:text-4xl sm:leading-[1.02] lg:text-5xl">
              Cuéntanos qué quieres estudiar
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:mt-5 sm:text-base sm:leading-7">
              Prepara un mensaje con tu programa y campus de interés para que admisiones pueda orientarte con mayor precisión.
            </p>
          </div>
          <GuidedWhatsAppForm
            programs={programs.map(({ name, level }) => ({ name, level }))}
            campuses={campuses.map(({ name }) => name)}
            source="Contacto"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <SectionHeading
            title="Campus y referencias"
            description="Si necesitas visitar una sede, revisa la referencia y abre el mapa antes de salir. El horario general de atención es de lunes a sábado, de 8:00 a 18:00 h."
          />
          <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
            {campuses.map((campus) => (
              <article
                className="border border-slate-200 bg-[#F8FAFC] p-4 sm:p-6"
                key={campus.name}
              >
                <MapPin aria-hidden="true" className="h-6 w-6 text-[#1E40AF]" />
                <h2 className="mt-3 font-editorial text-lg font-semibold leading-snug text-[#04215e] sm:mt-4 sm:text-xl">
                  {campus.name}
                </h2>
                <p className="mt-2 text-sm leading-5 text-slate-600 sm:mt-3 sm:leading-6">
                  {campus.address}
                </p>
                <Link
                  className="mt-3 inline-flex min-h-11 items-center gap-2 border border-[#CBD5E1] bg-white px-4 text-sm font-bold text-[#1E3A8A] transition hover:border-[#1E40AF] hover:bg-[#EFF6FF] sm:mt-5"
                  href={campus.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir mapa
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:gap-6 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-editorial text-2xl font-semibold leading-snug text-[#04215e]">
              Antes de escribir, puedes resolver dudas rápidas
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              RVOE, duración, documentos, modalidades, campus y recorrido
              virtual están resumidos en preguntas frecuentes.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#04215e] px-5 py-3 text-sm font-bold text-[#04215e] transition hover:bg-[#04215e] hover:text-white"
            href="/faq"
          >
            Ver FAQ
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}



