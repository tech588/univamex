import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { ProgramCard } from "@/components/program-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { campuses } from "@/data/campuses";
import { programs } from "@/data/programs";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Universidad en Ecatepec | Licenciaturas y posgrados",
  description: "Conoce UNIVAMEX en Ecatepec: bachilleratos, licenciaturas, maestrías, doctorado, horarios, campus, recorrido 360 y admisiones.",
  alternates: { canonical: "/universidad-en-ecatepec" },
};

const featured = programs.filter(({ slug }) => ["ingenieria-ia-big-data", "licenciatura-derecho", "licenciatura-psicologia", "licenciatura-pedagogia", "licenciatura-administracion", "ingenieria-sistemas-computacionales"].includes(slug));

export default function UniversidadEnEcatepecPage() {
  return (
    <main>
      <section className="bg-[#04215e] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold text-[#e7a928]">UNIVAMEX · Ciudad Azteca</p>
            <h1 className="mt-3 font-heading text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">Universidad en Ecatepec con bachilleratos, licenciaturas y posgrados</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">Estudia en una institución con 50 años de experiencia. Compara programas, modalidades, horarios, RVOE, planes de estudio y costos antes de iniciar tu proceso.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><WhatsAppButton label="Solicitar informes" question="la oferta académica en Ecatepec" source="Universidad en Ecatepec" /><Link className="inline-flex min-h-11 items-center justify-center border border-white/40 px-5 py-3 text-sm font-bold text-white hover:bg-white hover:text-[#04215e]" href="/oferta-academica">Ver programas</Link></div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-800"><Image src="/images/CAMPUS CIUDAD AZTECA.png" alt="Campus Ciudad Azteca de UNIVAMEX en Ecatepec" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /></div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-3xl font-semibold text-[#04215e]">Información para estudiar en Ecatepec</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="border border-slate-200 p-6"><MapPin className="h-6 w-6 text-[#1E40AF]" aria-hidden="true" /><h3 className="mt-4 font-editorial text-xl font-semibold text-[#071a3d]">Campus Ciudad Azteca</h3><p className="mt-3 text-sm leading-6 text-slate-600">{campuses[0].address}</p><Link className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-[#1E3A8A]" href="/campus">Mapa y recorrido 360 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>
            <article className="border border-slate-200 p-6"><Clock3 className="h-6 w-6 text-[#1E40AF]" aria-hidden="true" /><h3 className="mt-4 font-editorial text-xl font-semibold text-[#071a3d]">Atención e inscripciones</h3><p className="mt-3 text-sm leading-6 text-slate-600">{siteConfig.serviceHours}. Las inscripciones pueden realizarse dentro del horario de atención.</p><Link className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-[#1E3A8A]" href="/admisiones">Revisar requisitos <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>
            <article className="border border-slate-200 p-6"><h3 className="font-editorial text-xl font-semibold text-[#071a3d]">Modalidades e inicios</h3><p className="mt-3 text-sm leading-6 text-slate-600">Hay rutas escolarizadas, sabatinas y en línea según el nivel y programa. Los inicios generales indicados son enero, mayo y septiembre; bachillerato inicia en agosto o septiembre.</p><Link className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-[#1E3A8A]" href="/faq">Resolver dudas <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-5 py-16 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold text-[#B45309]">Programas prioritarios</p><h2 className="mt-3 font-heading text-3xl font-semibold text-[#04215e]">Carreras y posgrados con ficha completa</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">Cada ficha reúne plan de estudios en HTML, perfil, campo laboral, modalidad, duración, RVOE y requisitos.</p><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{featured.map((program) => <ProgramCard key={program.slug} program={program} />)}</div></div></section>
    </main>
  );
}

