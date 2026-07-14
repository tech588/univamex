import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";
import { canonicalUrl } from "@/data/seo";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/oferta-academica", priority: 0.95, changeFrequency: "weekly" },
  {
    path: "/oferta-academica/bachilleratos",
    priority: 0.85,
    changeFrequency: "monthly",
  },
  {
    path: "/oferta-academica/licenciaturas",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/oferta-academica/maestrias",
    priority: 0.85,
    changeFrequency: "monthly",
  },
  {
    path: "/oferta-academica/doctorados",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/oferta-academica/posgrados",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: "/campus", priority: 0.8, changeFrequency: "monthly" },
  { path: "/quienes-somos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/admisiones", priority: 0.85, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.75, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/recorrido-360", priority: 0.65, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: canonicalUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...programs.map((program) => ({
      url: canonicalUrl(`/programas/${program.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: program.featured ? 0.82 : 0.72,
    })),
  ];
}
