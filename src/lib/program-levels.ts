import type { ProgramLevel } from "@/types/content";

export const programLevelQueryValues: Record<ProgramLevel, string> = {
  Bachillerato: "bachillerato",
  Licenciatura: "licenciatura",
  Maestría: "maestria",
  Doctorado: "doctorado",
};

export const programLevelRoutes: Record<ProgramLevel, string> = {
  Bachillerato: "/oferta-academica/bachilleratos",
  Licenciatura: "/oferta-academica/licenciaturas",
  Maestría: "/oferta-academica/maestrias",
  Doctorado: "/oferta-academica/doctorados",
};

export function parseProgramLevel(value?: string): ProgramLevel | undefined {
  return (Object.entries(programLevelQueryValues) as Array<[ProgramLevel, string]>).find(
    ([, queryValue]) => queryValue === value,
  )?.[0];
}
