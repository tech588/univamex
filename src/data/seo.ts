import { siteConfig } from "@/data/site";

function normalizeBaseUrl(url: string) {
  const withProtocol = url.startsWith("http") ? url : `https://${url}`;

  return withProtocol.replace(/\/$/, "");
}

export const metadataBaseUrl = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    siteConfig.baseUrl,
);

export const seoConfig = {
  title: "UNIVAMEX | Bachilleratos, licenciaturas y posgrados",
  titleTemplate: "%s | UNIVAMEX",
  description:
    "Estudia en UNIVAMEX: bachilleratos, licenciaturas, maestrías y doctorado con rutas presenciales, mixtas y en línea en Ecatepec, Estado de México.",
  socialTitle: "UNIVAMEX | Estudia bachillerato, licenciatura o posgrado",
  socialDescription:
    "Programas presenciales, mixtos y en línea en Ecatepec. Recibe orientación directa para elegir tu ruta académica.",
  socialImage: "/images/univamex-og.png",
  squareLogo: "/images/univamex-logo-square-blue.png",
  keywords: [
    "UNIVAMEX",
    "Colegio Universitario del Valle de Mexico",
    "universidad en Ecatepec",
    "bachillerato en Ecatepec",
    "licenciaturas en Ecatepec",
    "maestrías en Ecatepec",
    "doctorado en educación",
    "admisiones UNIVAMEX",
    "oferta académica UNIVAMEX",
  ],
  areaServed: [
    "Ecatepec de Morelos",
    "Estado de Mexico",
    "Zona Metropolitana del Valle de Mexico",
    "Mexico",
  ],
};

export function absoluteUrl(path = "/", baseUrl = metadataBaseUrl) {
  return new URL(path, baseUrl).toString();
}

export function canonicalUrl(path = "/") {
  return new URL(path, siteConfig.baseUrl).toString();
}
