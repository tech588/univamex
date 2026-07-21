import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { Hero, type HeroSlide } from "@/components/hero";
import { ProgramCard } from "@/components/program-card";
import { SectionHeading } from "@/components/section-heading";
import { campuses } from "@/data/campuses";
import { programs } from "@/data/programs";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Universidad en Ecatepec | Licenciaturas y posgrados",
  description:
    "Conoce UNIVAMEX en Ecatepec: bachilleratos, licenciaturas, maestrías, doctorado, horarios, campus, recorrido 360 y admisiones.",
  alternates: { canonical: "/universidad-en-ecatepec" },
};

const featured = programs.filter(({ slug }) =>
  [
    "ingenieria-ia-big-data",
    "licenciatura-derecho",
    "licenciatura-psicologia",
    "licenciatura-pedagogia",
    "licenciatura-administracion",
    "ingenieria-sistemas-computacionales",
  ].includes(slug),
);

const campusSlides = [
  {
    src: "/images/CAMPUS CIUDAD AZTECA.png",
    alt: "Fachada principal del Campus Ciudad Azteca de UNIVAMEX",
    position: "center center",
  },
  {
    src: "/images/campus-americas.jpg",
    alt: "Fachada del Campus Las Américas de UNIVAMEX",
    position: "center 58%",
  },
  {
    src: "/images/campus-ciudad-azteca.jpg",
    alt: "Patio y cancha del Campus Ciudad Azteca de UNIVAMEX",
    position: "center center",
  },
] satisfies readonly HeroSlide[];

export default function UniversidadEnEcatepecPage() {
  return (
    <main>
      <Hero
        titleLines={["Universidad", "en Ecatepec"]}
        description="Bachilleratos, licenciaturas y posgrados con acompañamiento para comparar modalidades y planes de estudio antes de iniciar tu proceso."
        slides={campusSlides}
        whatsappQuestion="la oferta académica en Ecatepec"
        whatsappSource="Universidad en Ecatepec"
      />

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <SectionHeading
            title="Información para estudiar en Ecatepec"
            description="UNIVAMEX reúne su oferta académica, proceso de admisión, sedes y documentos de cada programa para ayudarte a comparar opciones."
          />
          <p className="max-w-xl text-base leading-7 text-slate-600 lg:justify-self-end">
            Revisa ubicación, horarios generales y requisitos, o continúa con la ficha del programa que te interesa.
          </p>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 sm:gap-5 md:grid-cols-3">
            <article className="border border-slate-200 bg-white p-4 sm:p-6">
              <MapPin
                className="h-6 w-6 text-[#1E40AF]"
                aria-hidden="true"
              />
              <h2 className="mt-4 font-editorial text-xl font-semibold text-[#071a3d]">
                Campus Ciudad Azteca
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {campuses[0].address}
              </p>
              <Link
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-[#1E3A8A]"
                href="/campus"
              >
                Mapas, rutas e instalaciones
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
            <article className="border border-slate-200 bg-white p-4 sm:p-6">
              <Clock3
                className="h-6 w-6 text-[#1E40AF]"
                aria-hidden="true"
              />
              <h2 className="mt-4 font-editorial text-xl font-semibold text-[#071a3d]">
                Atención e inscripciones
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {siteConfig.serviceHours}. Las inscripciones pueden realizarse
                dentro del horario de atención.
              </p>
              <Link
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-[#1E3A8A]"
                href="/admisiones"
              >
                Revisar requisitos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
            <article className="border border-slate-200 bg-white p-4 sm:p-6">
              <h2 className="font-editorial text-xl font-semibold text-[#071a3d]">
                Modalidades e inicios
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Hay rutas escolarizadas, sabatinas y en línea según el nivel y
                programa. La disponibilidad depende del programa y del grupo.
              </p>
              <Link
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-[#1E3A8A]"
                href="/faq"
              >
                Resolver dudas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Carreras y posgrados con ficha completa"
            description="Cada ficha reúne plan de estudios, perfil, campo laboral, modalidad, duración, RVOE y requisitos."
          />
          <div className="mt-5 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
