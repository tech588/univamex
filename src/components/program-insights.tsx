"use client";

import { useRef, useState } from "react";
import { BrainCircuit, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";

type InsightId = "ai" | "profile" | "career";

type ProgramInsightsProps = {
  programName: string;
  aiApplications: string[];
  graduateProfile: string[];
  careerField: string[];
};

export function ProgramInsights({
  programName,
  aiApplications,
  graduateProfile,
  careerField,
}: ProgramInsightsProps) {
  const [activeTab, setActiveTab] = useState<InsightId>("ai");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabs = [
    {
      id: "ai" as const,
      label: "IA en tu carrera",
      shortLabel: "IA aplicada",
      icon: BrainCircuit,
      items: aiApplications,
      question: "las aplicaciones de inteligencia artificial en esta carrera",
    },
    {
      id: "profile" as const,
      label: "Perfil de egreso",
      shortLabel: "Perfil de egreso",
      icon: GraduationCap,
      items: graduateProfile,
      question: "el perfil de egreso de esta carrera",
    },
    {
      id: "career" as const,
      label: "Campo laboral",
      shortLabel: "Campo laboral",
      icon: BriefcaseBusiness,
      items: careerField,
      question: "el campo laboral de esta carrera",
    },
  ];

  function moveFocus(currentIndex: number, key: string) {
    let nextIndex = currentIndex;

    if (key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (key === "Home") nextIndex = 0;
    if (key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === currentIndex) return;

    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="border-y border-blue-200 bg-white">
      <div
        aria-label="Información académica del programa"
        className="grid grid-cols-3 border-b border-blue-200 bg-[#f8fafc]"
        role="tablist"
      >
        {tabs.map((tab, index) => {
          const active = activeTab === tab.id;

          return (
            <button
              aria-controls={`program-panel-${tab.id}`}
              aria-selected={active}
              className={`inline-flex min-h-14 min-w-0 items-center justify-center gap-1 border-b-2 px-2 text-center text-[0.72rem] font-bold leading-tight transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#e7a928] sm:gap-2 sm:px-4 sm:text-sm ${
                active
                  ? "border-[#04215e] bg-white text-[#04215e]"
                  : "border-transparent text-slate-500 hover:bg-white hover:text-[#04215e]"
              }`}
              id={`program-tab-${tab.id}`}
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              tabIndex={active ? 0 : -1}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => {
                if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
                  event.preventDefault();
                }
                moveFocus(index, event.key);
              }}
            >
              <tab.icon aria-hidden="true" className="hidden h-4 w-4 sm:block" />
              <span>{tab.shortLabel}</span>
              <span className="hidden text-xs font-semibold opacity-60 sm:inline">{tab.items.length}</span>
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const active = activeTab === tab.id;

        return (
          <section
            aria-labelledby={`program-tab-${tab.id}`}
            className="p-4 sm:p-6"
            hidden={!active}
            id={`program-panel-${tab.id}`}
            key={tab.id}
            role="tabpanel"
            tabIndex={0}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#b45309]">
                  Explora el programa
                </p>
                <h2 className="mt-1 font-editorial text-2xl font-semibold leading-tight text-[#04215e] sm:text-3xl">
                  {tab.label}
                </h2>
              </div>
              <tab.icon aria-hidden="true" className="hidden h-8 w-8 shrink-0 text-[#1e40af] sm:block" />
            </div>

            <ol className="mt-4 grid border-t border-slate-200 sm:grid-cols-2">
              {tab.items.map((item, index) => (
                <li
                  className="grid min-w-0 grid-cols-[1.75rem_1fr] gap-2 border-b border-slate-200 py-3 text-sm font-semibold leading-5 text-[#0f172a] sm:min-h-16 sm:items-center sm:px-3 sm:[&:nth-child(odd)]:border-r"
                  key={item}
                >
                  <span className="font-editorial text-base font-semibold tabular-nums text-[#1e40af]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex flex-col gap-3 border-l-2 border-[#e7a928] pl-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-5 text-slate-600">
                ¿Quieres saber cómo se aplica esto durante el programa?
              </p>
              <WhatsAppButton
                className="min-h-10 shrink-0 px-3 py-2"
                label="Preguntar a admisiones"
                program={programName}
                question={tab.question}
                source="Ficha de programa"
                variant="ghost"
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}
