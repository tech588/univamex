import { siteConfig } from "@/data/site";

export const campuses = [
  {
    name: "Campus Ciudad Azteca",
    shortName: "Ciudad Azteca",
    address:
      "Ajusco Mz. 532 Lt. 25 y 50, Col. Ciudad Azteca 3a. Sección, C.P. 55120 Ecatepec de Morelos, Estado de México.",
    reference: "Sede principal con espacios académicos y recorrido virtual.",
    image: "/images/legacy/campus-ciudad-azteca-patio.jpg",
    imageAlt: "Patio y edificios del Campus Ciudad Azteca de UNIVAMEX",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Colegio+Universitario+Univamex+Ciudad+Azteca",
    highlights: [
      "Recorrido virtual 360",
      "Espacios académicos",
      "Canchas y áreas abiertas",
      "Atención para aspirantes",
    ],
  },
  {
    name: "Campus Las Américas",
    shortName: "Las Américas",
    address:
      "C.P. 55119 Ecatepec de Morelos, Estado de México, a un costado de la Vocacional 3.",
    reference: "Sede de apoyo para la comunidad UNIVAMEX.",
    image: "/images/legacy/campus-americas-lateral.jpg",
    imageAlt: "Exterior del Campus Las Américas de UNIVAMEX",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Vocacional+3+Ecatepec+Estado+de+Mexico",
    highlights: [
      "Referencia junto a Vocacional 3",
      "Comunidad estudiantil",
      "Atención cercana",
      "Ubicación en Ecatepec",
    ],
  },
];

export const campusContact = {
  phone: siteConfig.phone,
  secondaryPhone: siteConfig.phoneSecondary,
  email: siteConfig.email,
};
