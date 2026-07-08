import type { AdmissionRequirement } from "@/types/content";

export const admissionsByLevel: AdmissionRequirement[] = [
  {
    level: "Bachillerato",
    documents: [
      "Acta de nacimiento",
      "Certificado de secundaria",
      "Comprobante de domicilio",
      "CURP",
      "INE del tutor",
      "Examen medico",
    ],
  },
  {
    level: "Licenciatura",
    documents: [
      "Acta de nacimiento",
      "Certificado de bachillerato",
      "Comprobante de domicilio",
      "CURP",
      "INE",
    ],
  },
  {
    level: "Maestría",
    documents: [
      "Acta de nacimiento",
      "Certificado de licenciatura",
      "Cédula profesional",
      "Título",
      "Comprobante de domicilio",
      "CURP",
      "INE",
    ],
  },
  {
    level: "Doctorado",
    documents: [
      "Acta de nacimiento",
      "Certificado de maestría",
      "Cédula profesional",
      "Título",
      "Comprobante de domicilio",
      "CURP",
      "INE",
    ],
  },
];



