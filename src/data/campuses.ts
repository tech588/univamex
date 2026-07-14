import { siteConfig } from "@/data/site";

export const campuses = [
  {
    name: "Campus Ciudad Azteca",
    shortName: "Ciudad Azteca",
    address:
      "Ajusco Mz. 532 Lt. 25 y 50, Col. Ciudad Azteca 3a. Sección, C.P. 55120 Ecatepec de Morelos, Estado de México.",
    reference: "Sede principal con espacios académicos y recorrido virtual.",
    image: "/images/CAMPUS CIUDAD AZTECA.png",
    imageAlt: "Fachada del Campus Ciudad Azteca de UNIVAMEX",
    mapUrl: "https://maps.app.goo.gl/UkH3VWE5S9tJQ45A8",
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
      "Av. Central, a un costado de la Vocacional 3 del IPN, Ecatepec de Morelos, Estado de México.",
    reference: "Sede de apoyo para la comunidad UNIVAMEX.",
    image: "/images/legacy/campus-americas-lateral.jpg",
    imageAlt: "Exterior del Campus Las Américas de UNIVAMEX",
    mapUrl: "https://maps.app.goo.gl/AmyjhqTsUt6KEbWY9",
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
  email: siteConfig.email,
};
