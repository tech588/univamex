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
      <section className="bg-[#F8FAFC] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              title="Habla con admisiones"
              description="Usa el canal que prefieras. Para confirmar horarios, grupos disponibles o datos de inscripción, comunícate directamente con un asesor."
            />
            <div className="mt-8">
              <WhatsAppButton label="Escribir por WhatsApp" source="Contacto" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
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
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5"
                key={item.label}
              >
                <item.icon
                  aria-hidden="true"
                  className="h-6 w-6 text-[#1E40AF]"
                />
                <h2 className="mt-4 font-editorial text-lg font-semibold leading-snug text-[#04215e]">
                  {item.label}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#04215e] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-bold text-[#e7a928]">Mensaje guiado</p>
            <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.02] sm:text-4xl lg:text-5xl">
              Cuéntanos qué quieres estudiar
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
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

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="Campus y referencias"
            description="Si necesitas visitar una sede, revisa la referencia y abre el mapa antes de salir. El horario general de atención es de lunes a sábado, de 8:00 a 18:00 h."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {campuses.map((campus) => (
              <article
                className="border border-slate-200 bg-[#F8FAFC] p-6"
                key={campus.name}
              >
                <MapPin aria-hidden="true" className="h-6 w-6 text-[#1E40AF]" />
                <h2 className="mt-4 font-editorial text-xl font-semibold leading-snug text-[#04215e]">
                  {campus.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {campus.address}
                </p>
                <Link
                  className="mt-5 inline-flex min-h-11 items-center gap-2 border border-[#CBD5E1] bg-white px-4 text-sm font-bold text-[#1E3A8A] transition hover:border-[#1E40AF] hover:bg-[#EFF6FF]"
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

      <section className="bg-[#F8FAFC] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 md:flex-row md:items-center md:justify-between">
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



