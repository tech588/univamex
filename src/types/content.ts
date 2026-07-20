export type ProgramLevel =
  | "Bachillerato"
  | "Licenciatura"
  | "Maestría"
  | "Doctorado";

export type ProgramArea =
  | "Tecnología"
  | "Negocios"
  | "Derecho y seguridad"
  | "Educación y desarrollo humano"
  | "Creatividad y medios"
  | "Turismo y servicios"
  | "Impacto social";

export type RvoeStatus = "confirmed" | "review";

export type StudyBlock = {
  title: string;
  phase?: string;
  items: string[];
};

export type Program = {
  slug: string;
  name: string;
  shortName: string;
  level: ProgramLevel;
  area: ProgramArea;
  modality: string;
  duration: string;
  subjects?: string;
  rvoe: string;
  rvoeStatus?: RvoeStatus;
  image: string;
  imageAlt: string;
  description: string;
  promise: string;
  aiApplications: string[];
  entryProfile?: string[];
  graduateProfile: string[];
  careerField: string[];
  studyPlan: StudyBlock[];
  requirementsLevel: ProgramLevel;
  featured?: boolean;
};

export type AdmissionRequirement = {
  level: ProgramLevel;
  documents: string[];
};

export type NavItem = {
  label: string;
  href: string;
};



