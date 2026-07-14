"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  MapPin,
  Pause,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";

const stories = [
  {
    title: "Aprendizaje aplicado",
    description:
      "La experiencia académica combina clases, espacios de práctica y proyectos que conectan el aula con decisiones reales.",
    image: "/images/UNIVAMEX14.png",
    imageAlt: "Estudiantes de UNIVAMEX en la Sala de Juicios Orales",
    icon: BadgeCheck,
    note: "Práctica con contexto",
    href: "/oferta-academica",
    cta: "Explorar programas",
  },
  {
    title: "Admisiones claras",
    description:
      "Ubica requisitos, documentos y tiempos para que el proceso de ingreso se sienta ordenado desde el primer contacto.",
    image: "/images/GRADOS2.png",
    imageAlt: "Graduadas y graduados de UNIVAMEX con documentos académicos",
    icon: FileCheck2,
    note: "Una ruta simple para avanzar",
    href: "/admisiones",
    cta: "Revisar admisiones",
  },
  {
    title: "Campus y acompañamiento",
    description:
      "Conoce los espacios académicos y las sedes para comparar opciones con calma y decidir con información completa.",
    image: "/images/CAMPUS CIUDAD AZTECA.png",
    imageAlt: "Fachada del Campus Ciudad Azteca de UNIVAMEX",
    icon: MapPin,
    note: "Cercanía durante la decisión",
    href: "/campus",
    cta: "Conocer los campus",
  },
] as const;

export function HomePathways() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeStory = stories[activeIndex];

  useEffect(() => {
    if (reduceMotion || isInteracting || isManuallyPaused) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % stories.length);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, isInteracting, isManuallyPaused, reduceMotion]);

  const goToPrevious = () => {
    setActiveIndex((index) => (index === 0 ? stories.length - 1 : index - 1));
  };

  const goToNext = () => {
    setActiveIndex((index) => (index + 1) % stories.length);
  };

  return (
    <section
      aria-label="Historias de la experiencia UNIVAMEX"
      className="bg-[#f3f6fb] px-5 py-12 text-[#071a3d] sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      onBlurCapture={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-center lg:gap-12">
        <div>
          <p className="text-sm font-bold text-[#b45309]">Tu ruta en UNIVAMEX</p>
          <h2 className="mt-3 max-w-none text-balance font-heading text-[2rem] font-semibold leading-[0.96] text-[#04215e] sm:max-w-[12ch] sm:text-5xl sm:leading-[0.98] lg:text-[3.45rem]">
            Elegir programa también debe sentirse acompañado
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:mt-6 sm:max-w-md sm:text-base sm:leading-7">
            Recorre el valor académico, el proceso de admisión y los campus sin
            perder el contexto de tu decisión.
          </p>

          <div className="mt-6 flex items-center gap-2 sm:mt-8">
            <button
              aria-label="Historia anterior"
              className="grid h-12 w-12 place-items-center border border-[#cbd5e1] bg-white text-[#04215e] transition duration-200 hover:border-[#04215e] hover:bg-[#04215e] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]"
              type="button"
              onClick={goToPrevious}
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              aria-label="Historia siguiente"
              className="grid h-12 w-12 place-items-center border border-[#cbd5e1] bg-white text-[#04215e] transition duration-200 hover:border-[#04215e] hover:bg-[#04215e] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]"
              type="button"
              onClick={goToNext}
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              aria-label={
                isManuallyPaused
                  ? "Reanudar avance automático"
                  : "Pausar avance automático"
              }
              aria-pressed={isManuallyPaused}
              className="grid h-12 w-12 place-items-center border border-[#cbd5e1] bg-white text-[#04215e] transition duration-200 hover:border-[#04215e] hover:bg-[#04215e] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]"
              type="button"
              onClick={() => setIsManuallyPaused((paused) => !paused)}
            >
              {isManuallyPaused ? (
                <Play aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Pause aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>

          <div aria-hidden="true" className="mt-6 grid grid-cols-3 gap-2 sm:mt-8">
            {stories.map((story, index) => (
              <span className="h-1 bg-slate-300" key={story.title}>
                <motion.span
                  className="block h-full origin-left bg-[#04215e]"
                  animate={{ scaleX: index === activeIndex ? 1 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                />
              </span>
            ))}
          </div>
        </div>

        <div
          aria-live="polite"
          className="relative min-h-[42rem] overflow-hidden bg-white shadow-2xl shadow-slate-950/10 sm:min-h-[43rem]"
        >
          <AnimatePresence initial={false} mode="sync">
            <motion.article
              className="absolute inset-0 grid md:grid-cols-[0.92fr_1.08fr]"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, x: 24 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, x: -18 }
              }
              key={activeStory.title}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative min-h-[15rem] overflow-hidden md:min-h-full">
                <Image
                  src={activeStory.image}
                  alt={activeStory.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,33,94,0.28),transparent_48%)]" />
              </div>

              <div className="flex min-h-[27rem] flex-col justify-between p-5 sm:min-h-[29rem] sm:p-8 lg:p-10">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center border border-[#04215e] text-[#04215e]">
                      <activeStory.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="font-editorial text-3xl font-semibold text-[#e7a928]">
                      0{activeIndex + 1}
                    </span>
                  </div>
                  <p className="mt-6 text-sm font-bold text-[#1e40af]/70 sm:mt-9">
                    {activeStory.note}
                  </p>
                  <h3 className="mt-3 max-w-[13ch] font-editorial text-[1.75rem] font-semibold leading-none text-[#04215e] sm:text-4xl">
                    {activeStory.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7">
                    {activeStory.description}
                  </p>
                  <Link
                    className="mt-4 inline-flex min-h-11 items-center gap-2 border-b border-[#e7a928] text-sm font-bold text-[#04215e] transition hover:border-[#04215e] sm:mt-6"
                    href={activeStory.href}
                  >
                    {activeStory.cta}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8">
                  {stories.map((story, index) => (
                    <button
                      aria-current={index === activeIndex ? "step" : undefined}
                      aria-label={`Seleccionar ${story.title.toLowerCase()}`}
                      className={`min-h-12 border px-2 text-left text-[0.68rem] font-bold leading-tight transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] sm:min-h-14 sm:px-3 sm:text-xs ${
                        index === activeIndex
                          ? "border-[#04215e] bg-[#04215e] text-white"
                          : "border-slate-200 bg-white text-slate-500 hover:border-[#04215e] hover:text-[#04215e]"
                      }`}
                      key={story.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                    >
                      {story.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
