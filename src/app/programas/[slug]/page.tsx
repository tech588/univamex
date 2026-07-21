import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdmissionsChecklist } from "@/components/admissions-checklist";
import { BreadcrumbTrail } from "@/components/breadcrumb-trail";
import { ProgramCard } from "@/components/program-card";
import { ProgramInsights } from "@/components/program-insights";
import { SectionHeading } from "@/components/section-heading";
import { StudyPlan, StudyPlanOverview } from "@/components/study-plan";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { seoConfig } from "@/data/seo";
import {
  getProgramBySlug,
  getRelatedPrograms,
  programs,
} from "@/data/programs";
import { programLevelRoutes } from "@/lib/program-levels";

type ProgramPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    return {
      title: "Programa no encontrado",
    };
  }

  return {
    title: `${program.shortName} en Ecatepec`,
    description: `${program.description} Consulta modalidad, duración, RVOE, plan de estudios y admisiones de ${program.name} en Ecatepec.`,
    alternates: {
      canonical: `/programas/${program.slug}`,
    },
    openGraph: {
      title: `${program.name} | UNIVAMEX`,
      description: program.promise,
      url: `/programas/${program.slug}`,
      siteName: "UNIVAMEX",
      images: [
        {
          url: seoConfig.socialImage,
          width: 1200,
          height: 630,
          alt: "UNIVAMEX, oferta academica y admisiones",
        },
      ],
      locale: "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${program.name} | UNIVAMEX`,
      description: program.promise,
      images: [seoConfig.socialImage],
    },
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const related = getRelatedPrograms(program);
  const programUrl = `https://www.univamex.com/programas/${program.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: program.name,
      description: program.description,
      url: programUrl,
      provider: {
        "@type": "CollegeOrUniversity",
        name: "Colegio Universitario del Valle de México - UNIVAMEX",
        url: "https://www.univamex.com/",
      },
      educationalLevel: program.level,
      availableLanguage: "es-MX",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.univamex.com/" },
        { "@type": "ListItem", position: 2, name: "Oferta académica", item: "https://www.univamex.com/oferta-academica" },
        { "@type": "ListItem", position: 3, name: program.name, item: programUrl },
      ],
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="bg-[#F8FAFC] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <BreadcrumbTrail
            backHref={programLevelRoutes[program.level]}
            compact
            items={[
              { href: "/", label: "Inicio" },
              { href: "/oferta-academica", label: "Oferta académica" },
              { href: programLevelRoutes[program.level], label: program.level },
              { label: program.shortName },
            ]}
          />

          <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-10">
            <div className="contents lg:block">
              <div className="order-0">
                <p className="text-sm font-bold text-[#B45309]">
                  {program.level} · {program.area}
                </p>
                <h1 className="mt-2 font-heading text-[2rem] font-semibold leading-[1.02] tracking-normal text-[#04215e] sm:mt-3 sm:text-5xl sm:leading-[0.98]">
                  {program.name}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-6 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
                  {program.promise}
                </p>
              </div>
              <dl className="order-2 grid grid-cols-2 gap-2 sm:gap-3 lg:mt-8">
                {[
                  ["Modalidad", program.modality],
                  ["Duración", program.duration],
                  ["RVOE", program.rvoe],
                  ["Materias", program.subjects ?? "por confirmar"],
                ].map(([label, value]) => (
                  <div
                    className="min-w-0 rounded-lg border border-slate-200 bg-white p-2.5 sm:p-4"
                    key={label}
                  >
                    <dt className="text-xs font-bold text-slate-500">
                      {label}
                    </dt>
                    <dd className="mt-1 break-words text-sm font-semibold leading-5 text-[#0F172A] sm:text-base sm:leading-6">
                      {value}
                      {label === "RVOE" && program.rvoeStatus === "review" ? (
                        <span className="text-[#B45309]"> por confirmar</span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="order-3 grid grid-cols-2 gap-2 sm:flex sm:gap-3 lg:mt-8">
                <WhatsAppButton program={program.name} />
                <Link
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#CBD5E1] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A] transition hover:border-[#1E40AF] hover:bg-[#EFF6FF] sm:px-5 sm:py-3"
                  href="/admisiones"
                >
                  Ver requisitos
                </Link>
              </div>
            </div>

            <div className="relative order-1 aspect-[16/10] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10 lg:order-none lg:aspect-[4/3]">
              <Image
                src={program.image}
                alt={program.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <SectionHeading
            title="Resumen del programa"
            description={program.description}
          />
          <details className="group border-y border-slate-200 bg-[#F8FAFC]" open>
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-3 font-editorial text-lg font-semibold text-[#04215e] marker:hidden sm:min-h-14 sm:px-4 sm:text-xl">
              <span>¿Este programa es para ti?</span>
              <span aria-hidden="true" className="text-2xl font-normal leading-none text-[#1e40af] transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="divide-y divide-slate-200 border-t border-slate-200 px-3 sm:px-4">
              {(program.entryProfile ?? [
                "Aspirantes con interés en el área profesional del programa.",
                "Personas que buscan una ruta académica con aplicación práctica.",
                "Estudiantes que quieren resolver dudas con asesoría directa.",
              ]).map((item, index) => (
                <li className="grid grid-cols-[1.75rem_1fr] gap-2 py-2.5 text-sm leading-5 text-slate-700 sm:py-3" key={item}>
                  <span className="font-editorial font-semibold tabular-nums text-[#1e40af]">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div>
            <SectionHeading
              title="Plan de estudios"
              description="Consulta todas las asignaturas del programa, organizadas según el periodo y la etapa formativa indicados en su documento académico."
            />
            <StudyPlanOverview items={program.studyPlan} />
          </div>
          <StudyPlan
            items={program.studyPlan}
            pdfHref={`/pdf/planes-estudio/${program.slug}.pdf`}
            programName={program.name}
          />
        </div>
      </section>

      <section className="bg-[#EFF6FF] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <ProgramInsights
            aiApplications={program.aiApplications}
            careerField={program.careerField}
            graduateProfile={program.graduateProfile}
            programName={program.name}
          />
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <SectionHeading title={`${program.shortName} en Ecatepec`} description={`Estudia ${program.name} en UNIVAMEX. La ficha reúne la información académica disponible para comparar esta opción con otros programas de ${program.area.toLowerCase()}.`} />
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <Link className="border border-slate-200 bg-[#F8FAFC] p-5" href="/campus"><h2 className="font-editorial text-xl font-semibold text-[#04215e]">Campus</h2><p className="mt-2 text-sm leading-6 text-slate-600">Consulta direcciones, mapas, rutas, espacios y el recorrido virtual 360.</p></Link>
            <Link className="border border-slate-200 bg-[#F8FAFC] p-5" href="/rvoe"><h2 className="font-editorial text-xl font-semibold text-[#04215e]">RVOE y validez académica</h2><p className="mt-2 text-sm leading-6 text-slate-600">Compara las claves publicadas junto con la modalidad y duración de cada programa.</p></Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div>
            <SectionHeading
              title="Requisitos de admisión"
              description="Documentos solicitados para iniciar tu proceso."
            />
            <div className="mt-5 sm:mt-8">
              <WhatsAppButton
                label="Revisar documentos"
                program={program.name}
              />
            </div>
          </div>
          <AdmissionsChecklist level={program.requirementsLevel} />
        </div>
      </section>

      {related.length ? (
        <section className="bg-[#F8FAFC] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Programas relacionados"
              description="Compara opciones cercanas por área o nivel."
            />
            <div className="mt-5 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((candidate) => (
                <ProgramCard key={candidate.slug} program={candidate} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}



