import type { NavItem, ProgramArea, ProgramLevel } from "@/types/content";

export const siteConfig = {
  name: "UNIVAMEX",
  fullName: "Colegio Universitario del Valle de México - UNIVAMEX",
  phone: "55-80-82-57-96",
  whatsappDisplay: "55-29-94-53-81",
  whatsappNumber: "525529945381",
  email: "informes@univamex.edu.mx",
  facebook: "Colegio Universitario del Valle de México - UNIVAMEX",
  website: "www.univamex.com",
  baseUrl: "https://www.univamex.com",
};

export const navItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Oferta académica", href: "/oferta-academica" },
  { label: "Recorrido 360", href: "/#recorrido-360" },
  { label: "Admisiones", href: "/admisiones" },
  { label: "Contacto", href: "/contacto" },
];

export const levels: ProgramLevel[] = [
  "Bachillerato",
  "Licenciatura",
  "Maestría",
  "Doctorado",
];

export const areas: ProgramArea[] = [
  "Tecnología",
  "Negocios",
  "Derecho y seguridad",
  "Educación y desarrollo humano",
  "Creatividad y medios",
  "Turismo y servicios",
  "Impacto social",
];



