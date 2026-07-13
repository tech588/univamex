"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const levels = [
  {
    title: "Bachilleratos",
    label: "Bachilleratos",
    description:
      "Base académica y formación técnica para avanzar con seguridad hacia la universidad.",
    href: "/oferta-academica/bachilleratos",
    image: "/images/GRADOS.png",
    detail: "3 años / presencial",
    accent: "Desde tu primer plan profesional",
  },
  {
    title: "Licenciaturas",
    label: "Licenciaturas",
    description:
      "Carreras con enfoque práctico, acompañamiento docente y áreas conectadas con el mercado actual.",
    href: "/oferta-academica/licenciaturas",
    image: "/images/GRADOS1.png",
    detail: "Escolarizada, mixta y presencial",
    accent: "Construye criterio profesional",
  },
  {
    title: "Maestrías",
    label: "Maestrías",
    description:
      "Posgrados para especializar tu experiencia, fortalecer liderazgo y abrir nuevas rutas laborales.",
    href: "/oferta-academica/maestrias",
    image: "/images/GRADOS2.png",
    detail: "1 año 8 meses",
    accent: "Profundiza con dirección",
  },
  {
    title: "Doctorados",
    label: "Doctorados",
    description:
      "Investigación aplicada, pensamiento crítico e impacto académico para transformar tu entorno.",
    href: "/oferta-academica/doctorados",
    image: "/images/UNIVAMEX22.png",
    detail: "Investigación y alto impacto",
    accent: "Genera conocimiento",
  },
] as const;

export function ProgramLevelsBento() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeLevel = levels[activeIndex];
  const nextLevel = useMemo(
    () => levels[(activeIndex + 1) % levels.length],
    [activeIndex],
  );

  return (
    <section
      className="relative z-20 bg-white px-0 pb-20 pt-14 text-[#07111f] sm:px-8 sm:pb-24 sm:pt-20 lg:px-10"
      id="programas"
    >
      <motion.div
        className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-12"
        initial={reduceMotion ? false : { opacity: 0, y: 56 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div className="px-3 sm:px-0 lg:pt-8">
          <h2 className="max-w-[11ch] text-[2rem] font-semibold leading-[0.96] tracking-normal text-[#04215e] [font-family:var(--font-soft-display)] sm:text-4xl lg:text-5xl">
            Oferta disponible
          </h2>
          <p className="mt-5 max-w-xs border-l-4 border-[#e7a928] pl-4 text-sm font-normal leading-6 text-slate-600">
            Elige un nivel y mira la ruta académica sin perder el contexto.
          </p>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:grid sm:gap-0 sm:overflow-visible sm:pb-0">
            {levels.map((level, index) => {
              const active = index === activeIndex;

              return (
                <button
                  className={cn(
                    "min-h-12 shrink-0 border-b px-3 text-left text-sm font-medium transition sm:w-full sm:border-b sm:px-0",
                    active
                      ? "border-[#04215e] text-[#04215e]"
                      : "border-slate-200 text-slate-500 hover:border-[#e7a928] hover:text-[#04215e]",
                  )}
                  key={level.href}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                >
                  {level.label}
                </button>
              );
            })}
          </div>
        </div>

        <LayoutGroup>
          <div className="grid gap-4 px-0 sm:px-0 lg:grid-cols-[minmax(0,1fr)_11rem] lg:items-end">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.article
                className="relative min-h-[34rem] overflow-hidden bg-[#04215e] text-white shadow-2xl shadow-slate-950/15 lg:min-h-[40rem]"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.98,
                        clipPath: "inset(0 10% 0 0)",
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  clipPath: "inset(0 0% 0 0)",
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        scale: 0.98,
                        clipPath: "inset(0 0 0 12%)",
                      }
                }
                key={activeLevel.href}
                layoutId={
                  reduceMotion ? undefined : `program-card-${activeLevel.href}`
                }
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  className="group relative block h-full min-h-[34rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] lg:min-h-[40rem]"
                  href={activeLevel.href}
                >
                  <Image
                    src={activeLevel.image}
                    alt={`Ambiente académico para ${activeLevel.label.toLowerCase()} en UNIVAMEX`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,33,94,0.94)_0%,rgba(4,33,94,0.66)_48%,rgba(4,33,94,0.2)_100%)]" />
                  <div className="absolute inset-0 flex min-w-0 flex-col justify-between p-5 sm:p-8 lg:p-10">
                    <span className="text-sm font-medium text-white/72">
                      0{activeIndex + 1}
                    </span>
                    <div className="w-full min-w-0 max-w-full">
                      <p className="mb-4 max-w-[calc(100vw-2.5rem)] whitespace-normal break-words text-sm font-medium text-[#e7a928] sm:max-w-xs">
                        {activeLevel.accent}
                      </p>
                      <h3 className="max-w-[calc(100vw-2.5rem)] whitespace-normal break-words text-[1.8rem] font-semibold leading-[1] tracking-normal [font-family:var(--font-soft-display)] sm:max-w-[14ch] sm:text-3xl lg:text-[2.35rem]">
                        {activeLevel.title}
                      </h3>
                      <p className="mt-5 w-full max-w-[calc(100vw-2.5rem)] whitespace-normal break-words text-sm font-normal leading-6 text-white/78 sm:max-w-md">
                        {activeLevel.description}
                      </p>
                      <p className="mt-6 w-full max-w-[calc(100vw-2.5rem)] whitespace-normal break-words border-t border-white/25 pt-4 text-xs font-medium text-white/70 sm:max-w-md">
                        {activeLevel.detail}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            </AnimatePresence>

            <motion.button
              aria-label={`Ver ${nextLevel.label}`}
              className="group relative hidden h-[16rem] w-[11rem] overflow-hidden border border-slate-200 bg-slate-50 text-left text-white shadow-xl shadow-slate-950/10 lg:block"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              key={nextLevel.href}
              layoutId={
                reduceMotion ? undefined : `program-card-${nextLevel.href}`
              }
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              type="button"
              onClick={() => setActiveIndex((activeIndex + 1) % levels.length)}
            >
              <Image
                src={nextLevel.image}
                alt={`Vista previa de ${nextLevel.label.toLowerCase()}`}
                fill
                sizes="11rem"
                className="scale-110 object-cover blur-[2px] transition duration-700 group-hover:scale-[1.16] group-hover:blur-[1px]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,33,94,0.88),rgba(4,33,94,0.36))]" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="mb-2 text-[0.7rem] font-medium text-white/68">
                  Siguiente
                </span>
                <p className="max-w-[9ch] text-[1.15rem] font-semibold leading-none [font-family:var(--font-soft-display)]">
                  {nextLevel.title}
                </p>
              </div>
            </motion.button>
          </div>
        </LayoutGroup>
      </motion.div>
    </section>
  );
}
