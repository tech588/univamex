"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  MapPin,
} from "lucide-react";
import { useState } from "react";

const stories = [
  {
    title: "Aprendizaje aplicado",
    description:
      "La experiencia académica combina clases, espacios de práctica y proyectos que conectan el aula con decisiones reales.",
    image: "/images/UNIVAMEX14.png",
    icon: BadgeCheck,
    note: "Práctica con contexto",
  },
  {
    title: "Admisiones claras",
    description:
      "Te ayudamos a ubicar requisitos, documentos y tiempos para que el proceso de ingreso se sienta ordenado desde el primer contacto.",
    image: "/images/GRADOS2.png",
    icon: FileCheck2,
    note: "Ruta simple para avanzar",
  },
  {
    title: "Campus y acompañamiento",
    description:
      "Espacios académicos, asesoría cercana y una oferta pensada para comparar opciones con calma y decidir con contexto.",
    image: "/images/UNIVAMEX19.png",
    icon: MapPin,
    note: "Cercanía durante la decisión",
  },
] as const;

export function StickyStorytelling() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeStory = stories[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((index) => (index === 0 ? stories.length - 1 : index - 1));
  };

  const goToNext = () => {
    setActiveIndex((index) => (index + 1) % stories.length);
  };

  return (
    <section className="bg-[#f3f6fb] px-0 py-[4.5rem] text-[#07111f] sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-center lg:gap-12">
        <div className="px-3 sm:px-0">
          <h2 className="max-w-[18ch] font-editorial text-[2rem] font-semibold leading-[0.98] tracking-normal text-[#04215e] sm:text-4xl lg:max-w-[19ch] lg:text-5xl">
            <span className="block">Elegir programa</span>
            <span className="block">también debe</span>
            <span className="block">sentirse acompañado</span>
          </h2>
          <p className="mt-6 max-w-md text-sm font-normal leading-6 text-slate-600">
            El recorrido combina valor académico, proceso y campus para que la
            decisión no se sienta aislada.
          </p>

          <div className="mt-8 flex items-center gap-2">
            <button
              aria-label="Historia anterior"
              className="grid h-12 w-12 place-items-center border border-[#cdd6e5] bg-white text-[#04215e] transition hover:border-[#04215e] hover:bg-[#04215e] hover:text-white"
              type="button"
              onClick={goToPrevious}
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              aria-label="Historia siguiente"
              className="grid h-12 w-12 place-items-center border border-[#cdd6e5] bg-white text-[#04215e] transition hover:border-[#04215e] hover:bg-[#04215e] hover:text-white"
              type="button"
              onClick={goToNext}
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2">
            {stories.map((story, index) => (
              <button
                aria-label={`Ver ${story.title.toLowerCase()}`}
                className="h-1 bg-slate-300 transition"
                key={story.title}
                type="button"
                onClick={() => setActiveIndex(index)}
              >
                <span
                  className={
                    index === activeIndex
                      ? "block h-full bg-[#04215e]"
                      : "block h-full bg-transparent"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[34rem] overflow-hidden bg-white shadow-2xl shadow-slate-950/10">
          <AnimatePresence mode="wait">
            <motion.article
              className="absolute inset-0 grid md:grid-cols-[0.92fr_1.08fr]"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, x: 42, clipPath: "inset(0 0 0 18%)" }
              }
              animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0%)" }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, x: -42, clipPath: "inset(0 18% 0 0)" }
              }
              transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
              key={activeStory.title}
            >
              <div className="relative min-h-[16rem] md:min-h-full">
                <Image
                  src={activeStory.image}
                  alt={`Escena de ${activeStory.title.toLowerCase()} en UNIVAMEX`}
                  fill
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,33,94,0.32),transparent)]" />
              </div>

              <div className="flex min-h-[18rem] flex-col justify-between p-5 sm:p-8 lg:p-10">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center border border-[#04215e] text-[#04215e]">
                      <activeStory.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="font-editorial text-3xl font-semibold text-[#e7a928]">
                      0{activeIndex + 1}
                    </span>
                  </div>
                  <p className="mt-9 text-xs font-medium text-[#04215e]/60">
                    {activeStory.note}
                  </p>
                  <h3 className="mt-3 max-w-[12ch] font-editorial text-[1.85rem] font-semibold leading-none tracking-normal text-[#04215e] sm:text-4xl">
                    {activeStory.title}
                  </h3>
                  <p className="mt-5 max-w-md text-sm font-normal leading-6 text-slate-600">
                    {activeStory.description}
                  </p>
                </div>

                <div className="mt-8 flex gap-2">
                  {stories.map((story, index) => (
                    <button
                      aria-label={`Seleccionar ${story.title.toLowerCase()}`}
                      className={`h-14 flex-1 border px-2 text-left text-[0.68rem] font-bold leading-tight transition ${
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
