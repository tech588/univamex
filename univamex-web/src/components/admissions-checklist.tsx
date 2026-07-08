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
    <div className="grid gap-5 md:grid-cols-2">
      {requirements.map((requirement) => (
        <article
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5"
          key={requirement.level}
        >
          <h3 className="font-heading text-xl font-bold text-[#0F172A]">
            {requirement.level}
          </h3>
          <ul className="mt-4 grid gap-3">
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



