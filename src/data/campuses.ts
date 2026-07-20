import { siteConfig } from "@/data/site";

const routeOrigins = [
  "Metro Ciudad Azteca, Ecatepec de Morelos",
  "Plaza Aragón, Ecatepec de Morelos",
  "Centro de Ecatepec, Ecatepec de Morelos",
];

function directionsUrl(origin: string, destination: string) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
}

function mapEmbedUrl(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

const ciudadAztecaAddress =
  "Ajusco Mz. 532 Lt. 25 y 50, Col. Ciudad Azteca 3a. Sección, C.P. 55120 Ecatepec de Morelos, Estado de México.";
const lasAmericasAddress =
  "Av. Central, a un costado de la Vocacional 3 del IPN, Ecatepec de Morelos, Estado de México.";

export const campuses = [
  {
    name: "Campus Ciudad Azteca",
    shortName: "Ciudad Azteca",
    address: ciudadAztecaAddress,
    reference: "Sede principal con espacios académicos y recorrido virtual.",
    image: "/images/instalaciones1.jpg",
    imageAlt: "Vista exterior del Campus Ciudad Azteca de UNIVAMEX",
    imageWidth: 1040,
    imageHeight: 584,
    mapUrl: "https://maps.app.goo.gl/UkH3VWE5S9tJQ45A8",
    mapEmbedUrl: mapEmbedUrl(ciudadAztecaAddress),
    routes: routeOrigins.map((origin) => ({
      label: `Ruta desde ${origin.split(",")[0]}`,
      url: directionsUrl(origin, ciudadAztecaAddress),
    })),
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
    address: lasAmericasAddress,
    reference: "Sede de apoyo para la comunidad UNIVAMEX.",
    image: "/images/campus-americas.jpg",
    imageAlt: "Exterior del Campus Las Américas de UNIVAMEX",
    imageWidth: 1600,
    imageHeight: 1200,
    mapUrl: "https://maps.app.goo.gl/AmyjhqTsUt6KEbWY9",
    mapEmbedUrl: mapEmbedUrl(lasAmericasAddress),
    routes: routeOrigins.map((origin) => ({
      label: `Ruta desde ${origin.split(",")[0]}`,
      url: directionsUrl(origin, lasAmericasAddress),
    })),
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
