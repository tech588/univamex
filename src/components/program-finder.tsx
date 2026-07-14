"use client";

import { RotateCcw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { areas, levels } from "@/data/site";
import { normalizeText } from "@/lib/utils";
import {
  programLevelQueryValues,
  programLevelRoutes,
} from "@/lib/program-levels";
import type { Program, ProgramArea, ProgramLevel } from "@/types/content";
import { ProgramCard } from "@/components/program-card";

type ProgramFinderProps = {
  programs: Program[];
  initialLevel?: ProgramLevel;
  syncLevelToUrl?: boolean;
  navigateOnLevelChange?: boolean;
};

type FilterValue = "Todos";

export function ProgramFinder({
  programs,
  initialLevel,
  syncLevelToUrl = false,
  navigateOnLevelChange = false,
}: ProgramFinderProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<ProgramLevel | FilterValue>(
    initialLevel ?? "Todos",
  );
  const [area, setArea] = useState<ProgramArea | FilterValue>("Todos");
  const [modality, setModality] = useState<string | FilterValue>("Todos");

  const modalities = useMemo(
    () => Array.from(new Set(programs.map((program) => program.modality))),
    [programs],
  );

  const filteredPrograms = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    return programs.filter((program) => {
      const matchesQuery =
        !normalizedQuery ||
        normalizeText(
          `${program.name} ${program.area} ${program.level} ${program.description}`,
        ).includes(normalizedQuery);
      const matchesLevel = level === "Todos" || program.level === level;
      const matchesArea = area === "Todos" || program.area === area;
      const matchesModality =
        modality === "Todos" || program.modality === modality;

      return matchesQuery && matchesLevel && matchesArea && matchesModality;
    });
  }, [area, level, modality, programs, query]);

  function handleLevelChange(value: ProgramLevel | FilterValue) {
    setLevel(value);

    if (navigateOnLevelChange) {
      router.push(
        value === "Todos" ? "/oferta-academica" : programLevelRoutes[value],
      );
      return;
    }

    if (!syncLevelToUrl) return;

    const params = new URLSearchParams(window.location.search);
    const pathname = window.location.pathname;

    if (value === "Todos") {
      params.delete("nivel");
    } else {
      params.set("nivel", programLevelQueryValues[value]);
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  function resetFilters() {
    setQuery("");
    setLevel(navigateOnLevelChange && initialLevel ? initialLevel : "Todos");
    setArea("Todos");
    setModality("Todos");

    if (syncLevelToUrl) {
      const params = new URLSearchParams(window.location.search);
      const pathname = window.location.pathname;
      params.delete("nivel");
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    }
  }

  return (
    <section className="min-w-0 border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5">
      <div className="grid min-w-0 gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <label className="grid min-w-0 gap-1 text-sm font-semibold text-slate-700">
          <span>Buscar programa</span>
          <span className="flex min-h-12 min-w-0 items-center gap-3 border border-slate-200 bg-slate-50 px-4 focus-within:border-[#1E40AF] focus-within:bg-white">
            <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-500" />
            <input
              className="min-w-0 flex-1 bg-transparent text-base text-[#0F172A] outline-none placeholder:text-slate-500"
              placeholder="Carrera, área o nivel"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </span>
        </label>

        <FilterSelect
          label="Nivel"
          value={level}
          options={["Todos", ...levels]}
          onChange={(value) =>
            handleLevelChange(value as ProgramLevel | FilterValue)
          }
        />
        <FilterSelect
          label="Área"
          value={area}
          options={["Todos", ...areas]}
          onChange={(value) => setArea(value as ProgramArea | FilterValue)}
        />
        <FilterSelect
          label="Modalidad"
          value={modality}
          options={["Todos", ...modalities]}
          onChange={setModality}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-slate-600" aria-live="polite">
          {filteredPrograms.length} {filteredPrograms.length === 1 ? "programa encontrado" : "programas encontrados"}
        </p>
        <button
          className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 text-sm font-bold text-[#1e3a8a] transition hover:text-[#04215e]"
          type="button"
          onClick={resetFilters}
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          Limpiar filtros
        </button>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredPrograms.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
        {filteredPrograms.length === 0 ? (
          <div className="border border-slate-200 bg-[#f8fafc] p-6 md:col-span-2 xl:col-span-3">
            <h3 className="font-editorial text-2xl font-semibold text-[#04215e]">
              No encontramos programas con esos filtros
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Prueba con otro nivel o área, o limpia los filtros para volver a ver toda la oferta.
            </p>
            <button
              className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 bg-[#04215e] px-4 text-sm font-bold text-white"
              type="button"
              onClick={resetFilters}
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Mostrar todos
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-slate-700">
      <span>{label}</span>
      <select
        className="min-h-12 min-w-0 border border-slate-200 bg-white px-3 text-base font-medium text-[#0F172A] outline-none transition focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/15"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}



