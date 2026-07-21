import { BookOpenText, ChevronDown, Download, Layers3 } from "lucide-react";
import type { StudyBlock } from "@/types/content";

type StudyPlanProps = {
  items: StudyBlock[];
  pdfHref: string;
  programName: string;
};

type StudyPlanOverviewProps = {
  items: StudyBlock[];
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

function getStudyPlanSummary(items: StudyBlock[]) {
  const subjectCount = items.reduce(
    (total, period) => total + period.items.length,
    0,
  );
  const phases = [...new Set(items.map((period) => period.phase).filter(Boolean))];
  const periodLabel = items[0]?.title.toLowerCase().includes("semestre")
    ? "semestres"
    : "cuatrimestres";

  return { periodLabel, phases, subjectCount };
}

export function StudyPlanOverview({ items }: StudyPlanOverviewProps) {
  const { periodLabel, phases, subjectCount } = getStudyPlanSummary(items);

  return (
    <dl className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3">
        <div className="border border-slate-200 bg-white p-3 sm:p-4">
          <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            <Layers3 aria-hidden="true" className="h-4 w-4 text-[#1E40AF]" />
            Periodos
          </dt>
          <dd className="mt-1 font-editorial text-xl font-semibold text-[#04215e] sm:mt-2 sm:text-2xl">
            {items.length} {periodLabel}
          </dd>
        </div>
        <div className="border border-slate-200 bg-white p-3 sm:p-4">
          <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            <BookOpenText aria-hidden="true" className="h-4 w-4 text-[#1E40AF]" />
            Carga académica
          </dt>
          <dd className="mt-1 font-editorial text-xl font-semibold text-[#04215e] sm:mt-2 sm:text-2xl">
            {subjectCount} asignaturas
          </dd>
        </div>
        <div className="border border-slate-200 bg-white p-3 sm:p-4">
          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            Etapas formativas
          </dt>
          <dd className="mt-1 text-sm font-semibold leading-5 text-[#04215e] sm:mt-2 sm:leading-6">
            {phases.join(" · ") || "Plan de estudios"}
          </dd>
        </div>
    </dl>
  );
}

export function StudyPlan({ items, pdfHref, programName }: StudyPlanProps) {
  return (
    <div>
      <div className="grid gap-2 sm:gap-3">
        {items.map((period, index) => (
          <details
            className={`group border border-slate-200 border-l-4 bg-white shadow-sm ${periodStyles[index % periodStyles.length]}`}
            key={period.title}
          >
            <summary className="min-h-14 cursor-pointer list-none px-3 py-2.5 marker:content-none sm:min-h-16 sm:px-5 sm:py-3">
              <span className="flex items-center justify-between gap-4">
                <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center border border-current/20 bg-white/70 text-xs font-bold tabular-nums sm:h-9 sm:w-9 sm:text-sm"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-editorial text-base font-semibold leading-snug sm:text-lg">
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
            <div className="border-t border-current/15 bg-white px-3 py-3 text-slate-800 sm:px-5 sm:py-5">
              <ol className="grid gap-1.5 sm:grid-cols-2 sm:gap-2">
                {period.items.map((subject, subjectIndex) => (
                  <li
                    className="flex gap-2 border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm leading-5 sm:gap-3 sm:px-3 sm:py-3 sm:leading-6"
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
      <div className="mt-4 flex justify-end">
        <a
          aria-label={`Descargar plan de estudios de ${programName} en PDF`}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#1E3A8A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#172E6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] sm:w-fit"
          download
          href={pdfHref}
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Descargar PDF
        </a>
      </div>
    </div>
  );
}
