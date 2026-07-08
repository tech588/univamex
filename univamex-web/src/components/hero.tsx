import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { programs } from "@/data/programs";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Hero() {
  const featuredPrograms = programs.filter((program) => program.featured).slice(0, 4);

  return (
    <section className="overflow-hidden bg-[#F8FAFC]">
      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:py-16">
        <div>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-normal text-[#0F172A] sm:text-5xl lg:text-6xl">
            Decidete a llegar mas lejos
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Encuentra tu programa, revisa requisitos y habla con un asesor por
            WhatsApp para iniciar tu proceso en UNIVAMEX.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton source="Hero" />
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#1E3A8A] transition hover:border-[#1E40AF] hover:bg-[#EFF6FF]"
              href="/oferta-academica"
            >
              Ver oferta académica
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E3A8A]">
              <Search aria-hidden="true" className="h-4 w-4" />
              Programas destacados
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {featuredPrograms.map((program) => (
                <Link
                  className="rounded-lg border border-slate-200 p-4 transition hover:border-[#1E40AF] hover:bg-[#F8FAFC]"
                  href={`/programas/${program.slug}`}
                  key={program.slug}
                >
                  <span className="text-xs font-bold uppercase text-[#B45309]">
                    {program.level}
                  </span>
                  <span className="mt-1 block font-heading text-base font-bold text-[#0F172A]">
                    {program.shortName}
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">
                    {program.duration}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10 lg:aspect-[5/6]">
            <Image
              src="/images/campus-hero.png"
              alt="Estudiantes de UNIVAMEX en un ambiente universitario moderno"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-5 right-5 rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10">
            <p className="text-sm font-bold text-[#1E3A8A]">
              IA aplicada a tu carrera
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Cada programa muestra usos concretos de inteligencia artificial
              conectados con empleabilidad y proyectos reales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



