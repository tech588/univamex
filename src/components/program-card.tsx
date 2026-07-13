import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Program } from "@/types/content";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-[#1E40AF]/40 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 text-[#1E40AF]">
            {program.level}
          </span>
          <span className="rounded-md bg-[#FEF3C7] px-2.5 py-1 text-[#92400E]">
            {program.modality}
          </span>
        </div>
        <h3 className="mt-4 font-heading text-xl font-semibold leading-7 text-[#04215e]">
          <Link href={`/programas/${program.slug}`}>{program.name}</Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {program.description}
        </p>
        <dl className="mt-5 grid gap-2 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 text-[#1E40AF]"
            />
            <div>
              <dt className="sr-only">Duración</dt>
              <dd>{program.duration}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 text-[#1E40AF]"
            />
            <div>
              <dt className="sr-only">RVOE</dt>
              <dd>
                RVOE {program.rvoe}
                {program.rvoeStatus === "review" ? (
                  <span className="font-semibold text-[#B45309]">
                    {" "}
                    por confirmar
                  </span>
                ) : null}
              </dd>
            </div>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#CBD5E1] px-4 py-3 text-sm font-semibold text-[#1E3A8A] transition hover:border-[#1E40AF] hover:bg-[#EFF6FF]"
            href={`/programas/${program.slug}`}
          >
            Ver programa
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <WhatsAppButton
            className="px-4"
            label="Informes"
            program={program.name}
          />
        </div>
      </div>
    </article>
  );
}



