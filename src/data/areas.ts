import type { ProgramArea } from "@/types/content";

export type AcademicArea = {
  slug: string;
  name: ProgramArea;
  title: string;
  description: string;
  heroImage: string;
  decisionCopy: string;
  relatedQuestions: string[];
};

export const academicAreas: AcademicArea[] = [
  {
    slug: "tecnologia",
    name: "Tecnología",
    title: "Carreras de tecnología en Ecatepec",
    description:
      "Compara programas de inteligencia artificial, sistemas computacionales e informática administrativa en UNIVAMEX.",
    heroImage: "/images/UNIVAMEX STOCK 05.jpg",
    decisionCopy:
      "Esta ruta reúne programas para quienes quieren aprender programación, análisis de datos, sistemas y herramientas digitales desde bachillerato o licenciatura.",
    relatedQuestions: [
      "¿Qué diferencia hay entre IA y Big Data y Sistemas Computacionales?",
      "¿Qué programa tecnológico puedo estudiar en Ecatepec?",
      "¿Qué plan de estudios y RVOE tiene cada opción?",
    ],
  },
  {
    slug: "negocios",
    name: "Negocios",
    title: "Carreras de negocios en Ecatepec",
    description:
      "Explora Administración, Comercio y Negocios Internacionales y Mercadotecnia Digital en UNIVAMEX.",
    heroImage: "/images/UNIVAMEX STOCK 11.jpg",
    decisionCopy:
      "Compara rutas enfocadas en gestión, comercio, finanzas, logística, mercados y comunicación comercial digital.",
    relatedQuestions: [
      "¿Administración o Comercio Internacional: cuál elegir?",
      "¿Qué carrera incluye mercadotecnia y redes sociales?",
      "¿Qué modalidad y duración tiene cada licenciatura?",
    ],
  },
  {
    slug: "derecho-seguridad",
    name: "Derecho y seguridad",
    title: "Derecho y seguridad en Ecatepec",
    description:
      "Conoce Derecho, Criminología y Criminalística y la Maestría en Juicios Orales en UNIVAMEX.",
    heroImage: "/images/UNIVAMEX STOCK 14.jpg",
    decisionCopy:
      "Este clúster permite comparar formación jurídica, análisis del delito, investigación criminalística y especialización en litigación oral.",
    relatedQuestions: [
      "¿Qué diferencia hay entre Derecho y Criminología?",
      "¿Dónde estudiar Derecho en Ecatepec?",
      "¿Qué se estudia en la Maestría en Juicios Orales?",
    ],
  },
  {
    slug: "educacion-psicologia",
    name: "Educación y desarrollo humano",
    title: "Educación y psicología en Ecatepec",
    description:
      "Compara Psicología, Pedagogía, Maestría en Educación y el doctorado interdisciplinario de UNIVAMEX.",
    heroImage: "/images/UNIVAMEX STOCK 01.jpg",
    decisionCopy:
      "Encuentra una ruta desde licenciatura hasta posgrado para estudiar aprendizaje, desarrollo humano, intervención educativa e investigación.",
    relatedQuestions: [
      "¿Qué diferencia hay entre Psicología y Pedagogía?",
      "¿Cómo continuar de licenciatura a maestría o doctorado?",
      "¿Qué posgrados en educación hay en Ecatepec?",
    ],
  },
  {
    slug: "creatividad-medios",
    name: "Creatividad y medios",
    title: "Carreras creativas y medios digitales en Ecatepec",
    description:
      "Explora Arquitectura, Diseño Gráfico, Comunicación y Arte Digital y Videojuegos en UNIVAMEX.",
    heroImage: "/images/UNIVAMEX STOCK 15.jpg",
    decisionCopy:
      "Revisa programas que combinan expresión visual, comunicación, diseño, tecnología, producción multimedia y desarrollo de experiencias digitales.",
    relatedQuestions: [
      "¿Diseño Gráfico o Comunicación Digital: cuál elegir?",
      "¿Dónde estudiar videojuegos en Ecatepec?",
      "¿Qué materias incluye cada carrera creativa?",
    ],
  },
  {
    slug: "turismo-servicios",
    name: "Turismo y servicios",
    title: "Programas de turismo en Ecatepec",
    description:
      "Conoce el Bachillerato Tecnológico en Turismo y la Licenciatura en Turismo de UNIVAMEX.",
    heroImage: "/images/UNIVAMEX STOCK 03.jpg",
    decisionCopy:
      "Compara dos niveles de formación orientados a hospitalidad, servicios, promoción turística, eventos y atención al visitante.",
    relatedQuestions: [
      "¿Puedo estudiar turismo desde el bachillerato?",
      "¿Qué diferencia hay entre bachillerato y licenciatura en Turismo?",
      "¿Cuál es el campo laboral de Turismo?",
    ],
  },
  {
    slug: "impacto-social",
    name: "Impacto social",
    title: "Programas de impacto social en Ecatepec",
    description:
      "Encuentra formación vinculada con intervención comunitaria, educación, psicología y desarrollo humano en UNIVAMEX.",
    heroImage: "/images/UNIVAMEX STOCK 06.jpg",
    decisionCopy:
      "Esta ruta conecta programas para quienes buscan comprender necesidades sociales y participar en proyectos educativos, comunitarios o de bienestar.",
    relatedQuestions: [
      "¿Qué se estudia en Trabajo Social?",
      "¿Qué programas se relacionan con desarrollo humano?",
      "¿Cómo continuar del bachillerato a una licenciatura afín?",
    ],
  },
];

export function getAreaBySlug(slug: string) {
  return academicAreas.find((area) => area.slug === slug);
}
