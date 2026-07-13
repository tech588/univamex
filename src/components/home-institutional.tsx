import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, HeartHandshake, Landmark } from "lucide-react";
import { institutionalSummary, valuePrinciples } from "@/data/institutional";

const pillarIcons = [Landmark, BadgeCheck, HeartHandshake] as const;

export function HomeInstitutional() {
  return (
    <section
      className="bg-[#f8fafc] px-5 py-16 text-[#071a3d] sm:px-8 sm:py-20 lg:px-10"
      id="quienes-somos"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-bold text-[#b45309]">
            {institutionalSummary.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-[2rem] font-semibold leading-[0.98] tracking-normal text-[#04215e] sm:text-4xl lg:text-5xl">
            {institutionalSummary.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {institutionalSummary.description}
          </p>

          <div className="mt-8 grid gap-3">
            {institutionalSummary.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? BadgeCheck;

              return (
                <article
                  className="border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5"
                  key={pillar.title}
                >
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#04215e]/20 text-[#04215e]">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-semibold leading-tight text-[#071a3d]">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[0.72fr_1fr] sm:items-end">
          <div className="relative min-h-[25rem] overflow-hidden bg-slate-200 sm:min-h-[32rem]">
            <Image
              src="/images/UNIVAMEX13.png"
              alt="Comunidad UNIVAMEX en actividad cultural dentro del campus"
              fill
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid gap-4">
            <div className="relative min-h-[14rem] overflow-hidden bg-slate-200 sm:min-h-[18rem]">
              <Image
                src="/images/UNIVAMEX17.png"
                alt="Equipo estudiantil de UNIVAMEX durante actividad universitaria"
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="bg-[#04215e] p-6 text-white">
              <h3 className="font-heading text-2xl font-semibold leading-tight">
                Ciencia, virtud y humanismo
              </h3>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/78">
                {valuePrinciples.slice(0, 3).map((principle) => (
                  <li className="border-l border-[#e7a928] pl-3" key={principle}>
                    {principle}
                  </li>
                ))}
              </ul>
              <Link
                className="mt-6 inline-flex min-h-11 items-center gap-2 border border-white/30 px-4 text-sm font-bold text-white transition hover:bg-white/10"
                href="/campus"
              >
                Conocer campus
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
