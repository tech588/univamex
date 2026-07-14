import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs } from "@/data/programs";
import type { ProgramLevel } from "@/types/content";

const levelCards: Array<{
  level: ProgramLevel;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  layout: string;
  sizes: string;
}> = [
  {
    level: "Bachillerato",
    title: "Bachilleratos",
    description:
      "Formación media superior con preparación técnica en informática administrativa, trabajo social o turismo.",
    href: "/oferta-academica/bachilleratos",
    image: "/images/BACHILLERATO.png",
    imageAlt: "Graduada de bachillerato recibiendo un reconocimiento en UNIVAMEX",
    layout: "xl:col-span-5 xl:row-span-2 xl:min-h-[41rem]",
    sizes: "(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    level: "Licenciatura",
    title: "Licenciaturas",
    description:
      "Programas en tecnología, negocios, derecho, educación, creatividad, medios y turismo.",
    href: "/oferta-academica/licenciaturas",
    image: "/images/LICENCIATURAS.png",
    imageAlt: "Comunidad de licenciaturas durante una ceremonia académica de UNIVAMEX",
    layout: "xl:col-span-7 xl:min-h-[20rem]",
    sizes: "(min-width: 1280px) 58vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    level: "Maestría",
    title: "Maestrías",
    description:
      "Educación y Juicios Orales para fortalecer la práctica y actualización profesional.",
    href: "/oferta-academica/maestrias",
    image: "/images/MAESTRIAS.png",
    imageAlt: "Estudiante de maestría de UNIVAMEX",
    layout: "xl:col-span-4 xl:min-h-[20rem]",
    sizes: "(min-width: 1280px) 34vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    level: "Doctorado",
    title: "Doctorado",
    description:
      "Investigación en educación, neurociencias y perspectiva de género.",
    href: "/oferta-academica/doctorados",
    image: "/images/UNIVAMEX22.png",
    imageAlt: "Actividad académica de posgrado en UNIVAMEX",
    layout: "xl:col-span-3 xl:min-h-[20rem]",
    sizes: "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw",
  },
];

export function ProgramLevelsPreview() {
  return (
    <section
      className="relative z-10 -mt-px bg-[#f8fafc] px-5 py-16 text-[#071a3d] sm:px-8 sm:py-20 lg:px-10"
      id="oferta"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#b45309]">
              Oferta académica vigente
            </p>
            <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.02] sm:text-4xl lg:text-5xl">
              Elige el nivel que quieres estudiar
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Explora cada nivel y continúa a su página para conocer programas,
              modalidades y fichas académicas.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 w-fit items-center gap-2 border border-[#04215e] px-5 text-sm font-bold text-[#04215e] transition duration-200 hover:bg-[#04215e] hover:text-white"
            href="/oferta-academica"
          >
            Ver toda la oferta
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-12 xl:grid-rows-2">
          {levelCards.map((card) => {
            const count = programs.filter(
              (program) => program.level === card.level,
            ).length;

            return (
              <article
                className={`group relative min-h-[22rem] min-w-0 overflow-hidden border border-slate-200 bg-[#071a3d] ${card.layout}`}
                key={card.level}
              >
                <Link
                  className="relative flex h-full min-h-[inherit] flex-col justify-between overflow-hidden p-6 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-[#f2bd46] sm:p-8"
                  href={card.href}
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes={card.sizes}
                    className="object-cover transition duration-300 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,94,0.12)_0%,rgba(4,33,94,0.46)_45%,rgba(3,19,49,0.96)_100%)]" />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <span className="border border-white/35 bg-[#04215e]/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                      {count} {count === 1 ? "programa" : "programas"}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-6 w-6 text-[#f2bd46] transition duration-200 group-hover:translate-x-1"
                    />
                  </div>

                  <div className="relative z-10 max-w-xl">
                    <h3 className="font-editorial text-[1.8rem] font-semibold leading-none text-white sm:text-[2.15rem]">
                      {card.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-white/78 sm:text-base">
                      {card.description}
                    </p>
                    <span className="mt-5 inline-flex min-h-11 items-center border-b border-[#f2bd46] text-sm font-bold text-white">
                      Explorar {card.title.toLowerCase()}
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
