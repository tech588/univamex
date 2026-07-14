export type InstitutionalPrinciple = {
  title: string;
  description: string;
};

export const institutionalContent = {
  experienceYears: 50,
  currentOffer: {
    Bachillerato: 3,
    Licenciatura: 14,
    Maestría: 2,
    Doctorado: 1,
  },
  introduction: {
    eyebrow: "Quiénes somos",
    title: "Educación con historia y vocación de servicio",
    description:
      "El Colegio Universitario del Valle de México —UNIVAMEX— es una institución educativa de Ecatepec que imparte estudios de nivel medio superior y superior.",
  },
  history: [
    "UNIVAMEX nació de un proyecto educativo en Ecatepec de Morelos con estudios de nivel medio superior y formación técnica.",
    "Con el tiempo incorporó bachilleratos tecnológicos, licenciaturas y posgrados. Su oferta vigente reúne programas desde bachillerato hasta doctorado.",
  ],
  educationalSupport: {
    title: "Formación con reconocimiento académico",
    description:
      "La institución forma parte del Sistema Educativo Nacional. Cada ficha académica presenta el RVOE o la clave disponible del programa para que el aspirante pueda revisar su información antes de inscribirse.",
  },
  mission:
    "Formar personas libres, íntegras y con alto nivel académico, mediante una educación basada en la ciencia, la virtud, el humanismo y los valores de libertad, igualdad y fraternidad; preparadas para realizarse personal y profesionalmente al servicio de la sociedad y del país.",
  vision: [
    "Contribuir al bienestar de México mediante una comunidad educativa capaz de participar con voluntad y responsabilidad en proyectos que fortalezcan a la sociedad.",
    "Impulsar una educación con bases científicas, técnicas y humanísticas que permita desarrollar capacidades, generar ideas, innovar y actuar con autonomía y respeto por los demás.",
  ],
  philosophy:
    "Actuar con un alto sentido de responsabilidad y con conciencia del compromiso educativo que la institución mantiene con estudiantes, familias y las instituciones que rigen la vida en común.",
  motto: "Siempre sirviendo a la juventud y a México.",
  welcomeMotto:
    "Si vienes de buenas costumbres y hoy quieres ser mejor, ¡bienvenido!",
  values: [
    {
      title: "Tus valores",
      description:
        "Valórate como ser humano y valora a los demás con respeto, responsabilidad y justicia.",
    },
    {
      title: "Vivir intensamente",
      description:
        "Vive tu juventud con propósito y acepta con sabiduría cada etapa de la vida.",
    },
    {
      title: "Desarrollar tus habilidades",
      description:
        "Fortalece tu capacidad intelectual y tu carácter mediante el estudio y el trabajo constante.",
    },
    {
      title: "Ser constructivos",
      description:
        "Convierte tus ideas en acciones y encuentra sentido en servir y aportar a tu comunidad.",
    },
    {
      title: "Amor y respeto a tus padres",
      description:
        "Reconoce la dedicación, el esfuerzo y el acompañamiento que recibes de tu familia.",
    },
    {
      title: "Rechazar lo negativo",
      description:
        "Cultiva pensamientos positivos y evita aquello que debilite tu autoestima, tu convivencia y tu espíritu.",
    },
    {
      title: "Amor a la patria",
      description:
        "Asume con conciencia tus deberes hacia México y contribuye a una sociedad libre y solidaria.",
    },
  ] satisfies InstitutionalPrinciple[],
  emblem: [
    {
      title: "Figura poligonal",
      description:
        "Representa la geometría y la imaginación constructiva: el cuadrado y el triángulo como base para crear.",
    },
    {
      title: "Colegio Universitario",
      description:
        "Expresa un campo de conocimiento de las ciencias y las artes, con trabajo colegiado, libertad, igualdad, fraternidad y respeto a los derechos humanos.",
    },
    {
      title: "Del Valle de México",
      description:
        "Es un homenaje a la tierra donde nació la institución y al centro geográfico del país.",
    },
    {
      title: "Veni, vidi, vici",
      description:
        "Alude al espíritu de lucha, trabajo y construcción de quienes buscan transformar su entorno.",
    },
  ] satisfies InstitutionalPrinciple[],
};

export const institutionalSummary = {
  eyebrow: institutionalContent.introduction.eyebrow,
  title: institutionalContent.introduction.title,
  description: institutionalContent.introduction.description,
  facts: [
    {
      value: `${institutionalContent.experienceYears} años`,
      label: "de experiencia educativa",
    },
    {
      value: "20 programas",
      label: "en la oferta académica vigente",
    },
    {
      value: "4 niveles",
      label: "de bachillerato a doctorado",
    },
  ],
};
