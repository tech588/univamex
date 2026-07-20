import { BookOpenText, ChevronDown, Download, Layers3 } from "lucide-react";
import type { StudyBlock } from "@/types/content";

type StudyPlanProps = {
  items: StudyBlock[];
  pdfHref: string;
  programName: string;
};

const periodStyles = [
  "border-l-blue-700 bg-blue-50 text-blue-950",
  "border-l-amber-600 bg-amber-50 text-amber-950",
  "border-l-emerald-700 bg-emerald-50 text-emerald-950",
  "border-l-violet-700 bg-violet-50 text-violet-950",
  "border-l-rose-700 bg-rose-50 text-rose-950",
  "border-l-cyan-700 bg-cyan-50 text-cyan-950",
  "border-l-orange-700 bg-orange-50 text-orange-950",
  "border-l-indigo-700 bg-indigo-50 text-indigo-950",
  "border-l-teal-700 bg-teal-50 text-teal-950",
  "border-l-fuchsia-700 bg-fuchsia-50 text-fuchsia-950",
];

export function StudyPlan({ items, pdfHref, programName }: StudyPlanProps) {
  const subjectCount = items.reduce(
    (total, period) => total + period.items.length,
    0,
  );
  const phases = [...new Set(items.map((period) => period.phase).filter(Boolean))];
  const periodLabel = items[0]?.title.toLowerCase().includes("semestre")
    ? "semestres"
    : "cuatrimestres";

  return (
    <div>
      <dl className="grid gap-3 sm:grid-cols-3">
        <div className="border border-slate-200 bg-white p-4">
          <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            <Layers3 aria-hidden="true" className="h-4 w-4 text-[#1E40AF]" />
            Periodos
          </dt>
          <dd className="mt-2 font-editorial text-2xl font-semibold text-[#04215e]">
            {items.length} {periodLabel}
          </dd>
        </div>
        <div className="border border-slate-200 bg-white p-4">
          <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            <BookOpenText aria-hidden="true" className="h-4 w-4 text-[#1E40AF]" />
            Carga académica
          </dt>
          <dd className="mt-2 font-editorial text-2xl font-semibold text-[#04215e]">
            {subjectCount} asignaturas
          </dd>
        </div>
        <div className="border border-slate-200 bg-white p-4 sm:col-span-1">
          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            Etapas formativas
          </dt>
          <dd className="mt-2 text-sm font-semibold leading-6 text-[#04215e]">
            {phases.join(" · ") || "Plan de estudios"}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-600">
          Selecciona un periodo para consultar sus asignaturas. Todos se muestran
          cerrados al cargar la página.
        </p>
        <a
          aria-label={`Descargar plan de estudios de ${programName} en PDF`}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1E3A8A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#172E6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          download
          href={pdfHref}
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Descargar PDF
        </a>
      </div>

      <div className="mt-5 grid gap-3">
        {items.map((period, index) => (
          <details
            className={`group border border-slate-200 border-l-4 bg-white shadow-sm ${periodStyles[index % periodStyles.length]}`}
            key={period.title}
          >
            <summary className="min-h-16 cursor-pointer list-none px-4 py-3 marker:content-none sm:px-5">
              <span className="flex items-center justify-between gap-4">
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-current/20 bg-white/70 text-sm font-bold tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-editorial text-lg font-semibold leading-snug">
                      {period.title}
                    </span>
                    <span className="mt-1 block text-xs font-bold uppercase tracking-[0.1em] opacity-70">
                      {period.phase ? `${period.phase} · ` : ""}
                      {period.items.length} asignaturas
                    </span>
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
                />
              </span>
            </summary>
            <div className="border-t border-current/15 bg-white px-4 py-5 text-slate-800 sm:px-5">
              <ol className="grid gap-2 sm:grid-cols-2">
                {period.items.map((subject, subjectIndex) => (
                  <li
                    className="flex gap-3 border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-6"
                    key={`${period.title}-${subject}`}
                  >
                    <span
                      aria-hidden="true"
                      className="font-bold tabular-nums text-slate-400"
                    >
                      {String(subjectIndex + 1).padStart(2, "0")}
                    </span>
                    <span>{subject}</span>
                  </li>
                ))}
              </ol>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
