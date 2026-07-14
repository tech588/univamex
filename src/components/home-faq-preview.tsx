import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { faqItems } from "@/data/faq";

export function HomeFaqPreview() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-sm font-bold text-[#b45309]">Preguntas frecuentes</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.02] text-[#04215e] sm:text-4xl lg:text-5xl">
            Resuelve lo esencial antes de avanzar
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Consulta respuestas breves y abre la página completa cuando necesites más contexto.
          </p>
          <Link
            className="mt-7 inline-flex min-h-12 items-center gap-2 border border-[#04215e] px-5 text-sm font-bold text-[#04215e] transition hover:bg-[#04215e] hover:text-white"
            href="/faq"
          >
            Ver todas las preguntas
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqItems.slice(0, 4).map((item, index) => (
            <details className="group py-5" key={item.question} open={index === 0}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-editorial text-xl font-semibold leading-snug text-[#04215e] marker:hidden">
                <span>{item.question}</span>
                <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-[#b45309] transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-2xl pb-2 pr-8 pt-3 text-sm leading-7 text-slate-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
