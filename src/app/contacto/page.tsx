import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { campuses } from "@/data/campuses";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a UNIVAMEX por teléfono, WhatsApp, correo o Facebook para solicitar informes.",
};

export default function ContactoPage() {
  return (
    <main>
      <PageHero
        title="Contacto"
        description="Confirma inscripciones, costos, becas, horarios, grupos y ubicación con el equipo de UNIVAMEX."
        image="/images/UNIVAMEX5.png"
        imageClassName="object-[50%_center]"
      />
      <section className="bg-[#F8FAFC] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              title="Habla con admisiones"
              description="Usa el canal que prefieras. Para temas de costos, becas, horarios o grupos disponibles, confirma siempre la información directamente con un asesor."
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
              {
                label: "Teléfono alterno",
                value: siteConfig.phoneSecondary,
                icon: Phone,
              },
              { label: "Correo", value: siteConfig.email, icon: Mail },
              { label: "Facebook", value: siteConfig.facebook, icon: Share2 },
            ].map((item) => (
              <article
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5"
                key={item.label}
              >
                <item.icon
                  aria-hidden="true"
                  className="h-6 w-6 text-[#1E40AF]"
                />
                <h2 className="mt-4 font-heading text-lg font-semibold leading-tight text-[#04215e]">
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

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="Campus y referencias"
            description="Si necesitas visitar una sede, revisa la referencia y abre el mapa antes de salir. La disponibilidad de atención debe confirmarse con admisiones."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {campuses.map((campus) => (
              <article
                className="border border-slate-200 bg-[#F8FAFC] p-6"
                key={campus.name}
              >
                <MapPin aria-hidden="true" className="h-6 w-6 text-[#1E40AF]" />
                <h2 className="mt-4 font-heading text-xl font-semibold leading-tight text-[#04215e]">
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
            <h2 className="font-heading text-2xl font-semibold leading-tight text-[#04215e]">
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



