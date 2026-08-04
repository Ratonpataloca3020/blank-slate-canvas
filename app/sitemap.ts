import type { MetadataRoute } from "next";
import { services } from "./data";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexflex.pe";
  const routes = ["", "/nosotros", "/servicios", "/equipo", "/cursos", "/blog", "/contacto"];
  return [...routes.map(route => ({ url: baseUrl + route, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : route === "/servicios" ? 0.9 : 0.7 })), ...services.map(service => ({ url: baseUrl + "/servicios/" + service.slug, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 }))];
}
