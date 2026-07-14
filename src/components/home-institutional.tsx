import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { institutionalSummary } from "@/data/institutional";

export function HomeInstitutional() {
  return (
    <section className="bg-[#f8fafc] px-5 py-14 text-[#071a3d] sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto grid max-w-7xl overflow-hidden border border-slate-200 bg-white lg:grid-cols-[0.78fr_1.22fr]">
        <div className="relative min-h-[20rem] bg-slate-200 lg:min-h-[31rem]">
          <Image
            src="/images/VIDA-UNIVERSITARIA.png"
            alt="Comunidad UNIVAMEX durante una actividad de vida universitaria"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,33,94,0.52),transparent_58%)]" />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
          <p className="text-sm font-bold text-[#b45309]">
            {institutionalSummary.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-[2rem] font-semibold leading-[1.02] text-[#04215e] sm:text-4xl lg:text-5xl">
            {institutionalSummary.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {institutionalSummary.description}
          </p>

          <dl className="mt-8 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-3">
            {institutionalSummary.facts.map((fact) => (
              <div className="bg-[#f8fafc] p-5" key={fact.value}>
                <dt className="font-heading text-2xl font-semibold text-[#04215e]">
                  {fact.value}
                </dt>
                <dd className="mt-1 text-sm leading-5 text-slate-600">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            className="mt-8 inline-flex min-h-12 w-fit items-center gap-3 border-b border-[#04215e] text-sm font-bold text-[#04215e] transition hover:border-[#e7a928]"
            href="/quienes-somos"
          >
            Conocer nuestra historia
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
