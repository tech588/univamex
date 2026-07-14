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

export const academicSchedules = [
  {
    level: "Bachillerato",
    schedule: "Lunes a viernes, de 8:00 a 15:00 h",
    duration: "6 semestres / 3 años",
    starts: "Agosto y septiembre",
  },
  {
    level: "Licenciatura",
    schedule: "Escolarizada entre semana o sabatina, según el programa",
    duration: "De 9 a 10 cuatrimestres, según modalidad",
    starts: "Enero, mayo y septiembre",
  },
  {
    level: "Maestría",
    schedule: "Sábados, de 8:00 a 16:00 h",
    duration: "5 cuatrimestres / 1 año 8 meses",
    starts: "Enero, mayo y septiembre",
  },
  {
    level: "Doctorado",
    schedule: "En línea, con clases sabatinas opcionales",
    duration: "3 años",
    starts: "Enero, mayo y septiembre",
  },
] as const;



