"use client";

import Image from "next/image";
import Link from "next/link";
import type { Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BrainCircuit, FileCheck2, MapPin } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";

const stories = [
  {
    title: "IA en tu carrera",
    description:
      "Cada programa integra aplicaciones concretas de inteligencia artificial para estudiar, investigar, producir y decidir mejor dentro de tu campo.",
    image: "/images/ia-big-data.png",
    icon: BrainCircuit,
  },
  {
    title: "Admisiones sin vueltas",
    description:
      "Revisa requisitos por nivel, identifica documentos pendientes y recibe orientación clara sobre el siguiente paso de tu proceso.",
    image: "/images/campus-americas.jpg",
    icon: FileCheck2,
  },
  {
    title: "Campus y acompañamiento",
    description:
      "Espacios académicos, asesoría cercana y una oferta pensada para que compares opciones sin perder contexto.",
    image: "/images/campus-ciudad-azteca.jpg",
    icon: MapPin,
  },
] as const;

const panelVariants: Variants = {
  hidden: { filter: "blur(16px)", opacity: 0, y: 72 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: "easeOut" },
  },
};

export function StickyStorytelling() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#071A3D] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-[#E7A928]">
              Una ruta clara
            </p>
            <h2 className="mt-4 max-w-lg font-heading text-[1.85rem] font-normal leading-[1.14] tracking-normal text-balance sm:text-[2.35rem]">
              Elegir programa también debe sentirse acompañado.
            </h2>
            <p className="mt-5 max-w-md text-[0.86rem] leading-[1.65] text-white/68 sm:text-sm sm:leading-6">
              El home ya no es una lista plana: guía al aspirante por valor
              académico, proceso y campus antes de llevarlo a la oferta completa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <WhatsAppButton source="Historia home" />
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#E7A928] hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7A928]"
                href="/admisiones"
              >
                Ver admisiones
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:gap-8">
          {stories.map((story, index) => (
            <motion.article
              className="grid overflow-hidden rounded-lg border border-white/10 bg-white text-[#071A3D] shadow-2xl shadow-black/20 md:grid-cols-[0.95fr_1.05fr]"
              initial={reduceMotion ? false : "hidden"}
              key={story.title}
              variants={reduceMotion ? undefined : panelVariants}
              viewport={{ amount: 0.3, once: true }}
              whileInView="visible"
            >
              <div className="relative min-h-[230px] md:min-h-[310px]">
                <Image
                  src={story.image}
                  alt={`Escena de ${story.title.toLowerCase()} en UNIVAMEX`}
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,21,51,0.28),transparent)]" />
              </div>
              <div className="flex min-h-[260px] flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#061533] text-[#E7A928]">
                      <story.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="font-heading text-3xl font-normal text-[#E7A928]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 font-heading text-2xl font-normal leading-tight tracking-normal sm:text-3xl">
                    {story.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-[0.84rem] leading-[1.58] text-slate-600">
                    {story.description}
                  </p>
                </div>
                <Link
                  className="mt-7 inline-flex items-center gap-2 self-start border-b border-[#B45309] pb-1 text-sm font-bold text-[#071A3D] transition hover:text-[#B45309]"
                  href={index === 1 ? "/admisiones" : "/oferta-academica"}
                >
                  Conocer más
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
