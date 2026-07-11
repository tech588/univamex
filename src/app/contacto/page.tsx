import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, Share2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
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
        description="Resuelve dudas sobre inscripciones, costos, becas, horarios y ubicación con un asesor de UNIVAMEX."
        image="/images/campus-americas.jpg"
        imageClassName="object-center"
      />
      <section className="bg-[#F8FAFC] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              title="Contacto"
              description="Cualquier información o duda sobre inscripción, costos, becas, horarios o ubicación debe confirmarse con un asesor por WhatsApp."
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
                <h2 className="mt-4 font-heading text-lg font-bold text-[#0F172A]">
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
    </main>
  );
}



