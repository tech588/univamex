"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { areas, levels } from "@/data/site";
import { normalizeText } from "@/lib/utils";
import type { Program, ProgramArea, ProgramLevel } from "@/types/content";
import { ProgramCard } from "@/components/program-card";

type ProgramFinderProps = {
  programs: Program[];
  initialLevel?: ProgramLevel;
};

type FilterValue = "Todos";

export function ProgramFinder({ programs, initialLevel }: ProgramFinderProps) {
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

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 focus-within:border-[#1E40AF] focus-within:bg-white">
          <Search aria-hidden="true" className="h-5 w-5 text-slate-500" />
          <span className="sr-only">Buscar programa</span>
          <input
            className="w-full bg-transparent text-base text-[#0F172A] outline-none placeholder:text-slate-500"
            placeholder="Busca por carrera, área o nivel"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <FilterSelect
          label="Nivel"
          value={level}
          options={["Todos", ...levels]}
          onChange={(value) => setLevel(value as ProgramLevel | FilterValue)}
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

      <p className="mt-4 text-sm font-semibold text-slate-600">
        {filteredPrograms.length} programas encontrados
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredPrograms.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
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
        className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 text-base font-medium text-[#0F172A] outline-none transition focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/15"
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



