import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import { FinalContactCta } from "@/components/final-contact-cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { VirtualTour } from "@/components/virtual-tour";
import { campusContact, campuses } from "@/data/campuses";

type CampusPageProps = {
  searchParams: Promise<{
    vista?: string;
  }>;
};

const campusGallery = [
  {
    image: "/images/EVENTOS3.png",
    alt: "Actividad cultural de estudiantes UNIVAMEX en campus",
    title: "Vida estudiantil",
  },
  {
    image: "/images/UNIVAMEX12.png",
    alt: "Altar y actividad cultural dentro de UNIVAMEX",
    title: "Tradición y comunidad",
  },
  {
    image: "/images/UNIVAMEX16.png",
    alt: "Estudiantes en evento universitario de UNIVAMEX",
    title: "Eventos con identidad",
  },
];

export const metadata: Metadata = {
  title: "Campus UNIVAMEX en Ecatepec",
  description:
    "Conoce Campus Ciudad Azteca y Campus Las Américas de UNIVAMEX en Ecatepec: direcciones, mapas, referencias y recorrido virtual 360.",
  alternates: { canonical: "/campus" },
};

export default async function CampusPage({ searchParams }: CampusPageProps) {
  const { vista } = await searchParams;

  return (
    <main>
      <PageHero
        title="Campus UNIVAMEX"
        description="Conoce sedes, referencias y espacios clave antes de iniciar tu proceso de admisión."
        image="/images/legacy/campus-americas-patio.jpg"
        imageClassName="object-[52%_center]"
      />

      <section className="bg-[#F8FAFC] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Sedes, referencias y espacios"
            description="La información de campus te ayuda a ubicar la sede correcta, revisar referencias y preparar tu visita con mejor contexto."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {campuses.map((campus) => (
              <article
                className="grid overflow-hidden border border-slate-200 bg-white shadow-sm shadow-slate-900/5 md:grid-cols-[0.95fr_1.05fr]"
                key={campus.name}
              >
                <div className="relative min-h-[17rem] bg-slate-200">
                  <Image
                    src={campus.image}
                    alt={campus.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <p className="text-xs font-bold text-[#b45309]">
                    {campus.shortName}
                  </p>
                  <h2 className="mt-2 font-editorial text-2xl font-semibold leading-snug text-[#071a3d]">
                    {campus.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {campus.reference}
                  </p>
                  <p className="mt-4 flex gap-2 text-sm leading-6 text-slate-700">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#1e40af]"
                    />
                    <span>{campus.address}</span>
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {campus.highlights.map((item) => (
                      <li
                        className="border border-slate-200 bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-slate-700"
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      className="inline-flex min-h-11 items-center gap-2 border border-[#cbd5e1] px-4 text-sm font-bold text-[#1e3a8a] transition hover:border-[#04215e] hover:bg-[#eff6ff]"
                      href={campus.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir mapa
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm shadow-slate-900/5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <Phone
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-[#1e40af]"
              />
              <p>
                Informes: {campusContact.phone}
              </p>
            </div>
            <Link
              className="inline-flex min-h-11 items-center justify-center border border-[#04215e] px-4 font-bold text-[#04215e] transition hover:bg-[#04215e] hover:text-white"
              href="/contacto"
            >
              Contactar admisiones
            </Link>
          </div>
        </div>
      </section>

      <section
        className="bg-white px-5 py-16 sm:px-8 lg:px-10"
        id="recorrido-360"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold text-[#b45309]">
              Recorrido virtual
            </p>
            <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-[0.98] tracking-normal text-[#04215e] sm:text-4xl lg:text-5xl">
              Explora el campus en 360
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Revisa vistas de la explanada y canchas desde el navegador antes
              de planear tu visita.
            </p>
          </div>

          <VirtualTour initialSceneId={vista} />
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Vida universitaria"
            description="La experiencia UNIVAMEX también se construye en actividades culturales, eventos académicos y comunidad estudiantil."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {campusGallery.map((item) => (
              <article
                className="overflow-hidden border border-slate-200 bg-white shadow-sm shadow-slate-900/5"
                key={item.image}
              >
                <div className="relative aspect-[4/3] bg-slate-200">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="p-5 font-editorial text-xl font-semibold leading-snug text-[#071a3d]">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalContactCta />
    </main>
  );
}
