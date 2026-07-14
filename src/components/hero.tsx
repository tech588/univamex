"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";

const slides = [
  {
    src: "/images/legacy/estudiantes-campus.jpg",
    alt: "Estudiantes de UNIVAMEX conviviendo en el campus",
    position: "70% center",
  },
  {
    src: "/images/legacy/estudiantes-profesional.jpg",
    alt: "Estudiantes de nivel profesional con materiales de estudio",
    position: "64% center",
  },
  {
    src: "/images/legacy/estudiantes-bachillerato.jpg",
    alt: "Estudiantes de bachillerato con libros y carpetas",
    position: "58% center",
  },
] as const;

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [activeSlide, reduceMotion]);

  return (
    <section
      aria-label="Presentación de UNIVAMEX"
      aria-roledescription="carrusel"
      className="relative isolate min-h-[44rem] overflow-hidden bg-[#02183f] text-white sm:min-h-[46rem] lg:min-h-[42rem]"
    >
      <div aria-hidden="true" className="absolute inset-0">
        {slides.map((slide, index) => {
          const active = index === activeSlide;

          return (
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: active ? 1 : 0 }
                  : {
                      opacity: active ? 1 : 0,
                      scale: active ? 1.035 : 1,
                    }
              }
              key={slide.src}
              transition={{
                opacity: { duration: reduceMotion ? 0 : 1.15, ease: "easeInOut" },
                scale: { duration: 5.4, ease: "linear" },
              }}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "eager"}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.position }}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[#02183f]/12" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,24,63,0.68)_0%,rgba(2,24,63,0.55)_32%,rgba(2,24,63,0.26)_57%,rgba(2,24,63,0.06)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,24,63,0.55)_0%,rgba(2,24,63,0.08)_44%,rgba(2,24,63,0.45)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[44rem] max-w-7xl items-center px-5 pb-24 pt-[8.5rem] sm:min-h-[46rem] sm:px-8 sm:pb-28 sm:pt-[9rem] lg:min-h-[42rem] lg:px-10 lg:pb-24 lg:pt-[8rem]">
        <motion.div
          className="max-w-[46rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="flex flex-col items-start gap-[0.12em] text-[clamp(2.3rem,11vw,2.75rem)] font-medium leading-[0.92] tracking-[-0.035em] drop-shadow-[0_2px_12px_rgba(2,24,63,0.5)] [font-family:var(--font-soft-display)] sm:text-[clamp(4rem,7.2vw,6rem)]">
            <span className="whitespace-nowrap">Decídete a</span>
            <span className="whitespace-nowrap">llegar más lejos</span>
          </h1>
          <p className="mt-6 max-w-[38rem] text-base leading-7 text-white/88 sm:text-lg sm:leading-8">
            Bachilleratos, licenciaturas y posgrados en Ecatepec, con
            acompañamiento para elegir tu programa e iniciar tu proceso.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <WhatsAppButton
              className="min-h-12 px-6 py-3.5"
              label="Solicitar informes"
              source="Hero principal"
              variant="accent"
            />
            <Link
              className="group inline-flex min-h-12 items-center gap-3 border-b border-[#e7a928] px-0 text-sm font-bold text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7a928]"
              href="/oferta-academica"
            >
              Ver oferta académica
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-[#e7a928] transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </div>

      <div
        aria-label="Seleccionar imagen del hero"
        className="absolute bottom-12 right-5 z-20 flex items-center gap-1 sm:bottom-14 sm:right-8 lg:right-10"
        role="group"
      >
        {slides.map((slide, index) => (
          <button
            aria-current={index === activeSlide ? "true" : undefined}
            aria-label={`Mostrar imagen ${index + 1}: ${slide.alt}`}
            className="group grid min-h-11 min-w-11 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]"
            key={slide.src}
            type="button"
            onClick={() => setActiveSlide(index)}
          >
            <span
              className={cn(
                "block h-0.5 w-8 transition-colors duration-300",
                index === activeSlide
                  ? "bg-[#e7a928]"
                  : "bg-white/45 group-hover:bg-white",
              )}
            />
          </button>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-14 bg-[#f8fafc] [clip-path:polygon(0_72%,100%_28%,100%_100%,0_100%)] sm:h-20"
      />
    </section>
  );
}
