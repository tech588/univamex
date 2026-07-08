"use client";

import Image from "next/image";
import Link from "next/link";
import type { Variants } from "framer-motion";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const levels = [
  {
    title: "Bachilleratos",
    description:
      "Formación integral con enfoque académico y humano para construir tu camino.",
    href: "/oferta-academica/bachilleratos",
    image: "/images/home-students.jpg",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Licenciaturas",
    description:
      "Carreras diseñadas para desarrollar tu talento y abrir más oportunidades.",
    href: "/oferta-academica/licenciaturas",
    image: "/images/negocios-estudiantes.png",
    className: "lg:col-span-2",
  },
  {
    title: "Maestrías",
    description:
      "Especialízate, lidera y transforma tu entorno profesional.",
    href: "/oferta-academica/maestrias",
    image: "/images/educacion-comunidad.png",
    className: "lg:col-span-1",
  },
  {
    title: "Doctorados",
    description:
      "Investigación, innovación y conocimiento para generar impacto.",
    href: "/oferta-academica/doctorados",
    image: "/images/ia-big-data.png",
    className: "lg:col-span-1",
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: "easeOut" },
  },
};

export function ProgramLevelsBento() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [72, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const exploreOpacity = useTransform(scrollYProgress, [0, 0.38, 0.68], [1, 1, 0]);

  return (
    <section
      className="relative z-20 -mt-[100svh] bg-[#061533] px-5 pb-20 pt-24 text-white sm:-mt-[100dvh] sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pb-28"
      id="programas"
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="hero-concave pointer-events-none absolute inset-x-0 -top-8 h-12 scale-x-110 bg-[#061533] sm:-top-12 sm:h-16"
      />
      <motion.a
        className="absolute top-[0.25rem] left-1/2 z-30 inline-flex items-center gap-2 whitespace-nowrap text-xs font-bold uppercase text-white/75 sm:-top-[0.9rem]"
        href="#programas"
        animate={{ y: reduceMotion ? 0 : [0, 7, 0] }}
        style={reduceMotion ? { x: "-50%" } : { x: "-50%", opacity: exploreOpacity }}
        transition={{
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        Explorar programas
        <ChevronDown aria-hidden="true" className="h-4 w-4" />
      </motion.a>
      <motion.div
        className="mx-auto max-w-7xl"
        style={reduceMotion ? undefined : { y, opacity }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-end">
            <h2 className="font-heading text-4xl font-normal leading-none tracking-normal sm:text-5xl">
              Programas
            </h2>
            <p className="max-w-sm border-l border-[#E7A928] pl-5 text-[0.84rem] leading-[1.55] text-white/72">
              Elige tu siguiente paso entre nuestras opciones académicas y
              construye tu futuro.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center gap-2 self-start border-b border-[#E7A928] pb-1 text-sm font-bold text-white transition hover:text-[#E7A928] md:self-auto"
            href="/oferta-academica"
          >
            Ver toda la oferta
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          className="mt-8 grid gap-4 lg:grid-cols-4 lg:grid-rows-2"
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-12% 0px" }}
        >
          {levels.map((level) => (
            <motion.article
              className={cn(
                "group relative min-h-[260px] overflow-hidden rounded-lg border border-white/10 bg-[#071A3D] shadow-2xl shadow-black/20 lg:min-h-[300px]",
                level.className,
              )}
              key={level.href}
              variants={reduceMotion ? undefined : tileVariants}
            >
              <Link
                className="relative block h-full min-h-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7A928]"
                href={level.href}
              >
                <Image
                  src={level.image}
                  alt={`Ambiente académico para ${level.title.toLowerCase()} en UNIVAMEX`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,21,51,0.96)_0%,rgba(6,21,51,0.74)_42%,rgba(6,21,51,0.2)_100%)]" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h3 className="font-heading text-3xl font-normal leading-none tracking-normal text-white sm:text-4xl">
                      {level.title}
                    </h3>
                    <span className="mt-4 block h-0.5 w-12 bg-[#E7A928]" />
                    <p className="mt-5 max-w-[16rem] text-[0.82rem] leading-[1.55] text-white/75">
                      {level.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-white transition group-hover:text-[#E7A928]">
                    Explorar oferta
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
