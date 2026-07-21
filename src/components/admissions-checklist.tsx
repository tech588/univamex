import { CheckCircle2 } from "lucide-react";
import { admissionsByLevel } from "@/data/admissions";
import type { ProgramLevel } from "@/types/content";

type AdmissionsChecklistProps = {
  level?: ProgramLevel;
};

export function AdmissionsChecklist({ level }: AdmissionsChecklistProps) {
  const requirements = level
    ? admissionsByLevel.filter((item) => item.level === level)
    : admissionsByLevel;

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      {requirements.map((requirement) => (
        <article
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5"
          key={requirement.level}
        >
          <h3 className="font-editorial text-xl font-semibold leading-snug text-[#04215e]">
            {requirement.level}
          </h3>
          <ul className="mt-3 grid gap-2 sm:mt-4 sm:gap-3">
            {requirement.documents.map((document) => (
              <li className="flex gap-3 text-sm text-slate-700" key={document}>
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]"
                />
                <span>{document}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}



