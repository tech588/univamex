import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ProgramLevelsBento } from "@/components/program-levels-bento";
import { StickyStorytelling } from "@/components/sticky-storytelling";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="home-main">
      <Hero />
      <ProgramLevelsBento />
      <StickyStorytelling />

      <section className="bg-[#F7F9FC] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg bg-[#061533] text-white shadow-2xl shadow-slate-950/20 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[280px] lg:min-h-[420px]">
            <Image
              src="/images/campus-ciudad-azteca.jpg"
              alt="Campus UNIVAMEX preparado para recibir aspirantes"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,21,51,0.1),rgba(6,21,51,0.44))]" />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase text-[#E7A928]">
              Siguiente paso
            </p>
            <h2 className="mt-4 max-w-xl font-heading text-[1.85rem] font-normal leading-[1.14] tracking-normal text-balance sm:text-[2.35rem]">
              Compara programas y empieza con claridad.
            </h2>
            <p className="mt-5 max-w-md text-[0.86rem] leading-[1.65] text-white/68 sm:text-sm sm:leading-6">
              Explora la oferta completa por nivel, revisa requisitos y pide
              orientación con el contexto de tu programa de interés.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton source="Cierre home" />
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#E7A928] hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7A928]"
                href="/oferta-academica"
              >
                Ver oferta académica
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
