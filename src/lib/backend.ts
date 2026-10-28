// Coordenadas públicas del backend de Lexflex (Lovable Cloud).
// Estos valores son públicos por diseño: la URL del backend y la clave
// publishable viajan en el navegador. Las variables de entorno tienen
// prioridad; estas constantes garantizan que el build publicado funcione
// incluso cuando el pipeline de publicación no inyecta el .env.
const FALLBACK_BACKEND_URL = "https://c--e2576811-97e3-4f1e-8b13-2d6a96346ccb-prod.lovable.cloud";
const FALLBACK_PUBLISHABLE_KEY = "sb_publishable_GBDALkF3bmseFrrYtbR_NA_csUfmApy";

export const backendUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_BACKEND_URL;
export const backendPublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY;
