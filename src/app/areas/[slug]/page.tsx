import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleHelp } from "lucide-react";
import { ProgramCard } from "@/components/program-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { academicAreas, getAreaBySlug } from "@/data/areas";
import { programs } from "@/data/programs";

type AreaPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return academicAreas.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const area = getAreaBySlug((await params).slug);
  if (!area) return { title: "Área académica no encontrada" };

  return {
    title: area.title,
    description: area.description,
    alternates: { canonical: `/areas/${area.slug}` },
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const area = getAreaBySlug((await params).slug);
  if (!area) notFound();
  const areaPrograms = programs.filter((program) => program.area === area.name);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.univamex.com/" },
      { "@type": "ListItem", position: 2, name: "Oferta académica", item: "https://www.univamex.com/oferta-academica" },
      { "@type": "ListItem", position: 3, name: area.title, item: `https://www.univamex.com/areas/${area.slug}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
      <section className="bg-[#F8FAFC] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1E3A8A]" href="/oferta-academica">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Oferta académica
          </Link>
          <p className="mt-8 text-sm font-bold text-[#B45309]">Área académica · Ecatepec</p>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-semibold leading-[1.02] text-[#04215e] sm:text-5xl">{area.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{area.description}</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{area.decisionCopy}</p>
          <div className="mt-8"><WhatsAppButton label="Pedir orientación" question={`programas de ${area.name} en Ecatepec`} source={`Área ${area.name}`} /></div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-3xl font-semibold text-[#04215e]">Programas relacionados</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{areaPrograms.map((program) => <ProgramCard key={program.slug} program={program} />)}</div>
        </div>
      </section>

      <section className="bg-[#EFF6FF] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-3xl font-semibold text-[#04215e]">Preguntas para comparar tu ruta</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">{area.relatedQuestions.map((question) => (
            <article className="border border-blue-100 bg-white p-5" key={question}>
              <CircleHelp aria-hidden="true" className="h-5 w-5 text-[#1E40AF]" />
              <h3 className="mt-4 font-editorial text-xl font-semibold text-[#071a3d]">{question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Revisa las fichas, el plan de estudios, la modalidad, la duración y el RVOE antes de decidir.</p>
            </article>
          ))}</div>
          <Link className="mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-[#1E3A8A]" href="/admisiones">Revisar admisiones <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}

