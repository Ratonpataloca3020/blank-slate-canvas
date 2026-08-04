import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "./components/SiteShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexflex.pe"),
  title: { default: "Lexflex | Estudio Jurídico en Huancayo", template: "%s | Lexflex" },
  description: "Estudio jurídico en Huancayo especializado en derecho administrativo, contrataciones del Estado, derecho civil, gestión pública, compliance y defensa especializada.",
  keywords: ["abogados Huancayo", "estudio jurídico Huancayo", "derecho administrativo", "contrataciones del Estado", "compliance Perú", "derecho civil", "Lexflex"],
  other: { "codex-preview": "development" },
  openGraph: { title: "Lexflex | Estudio Jurídico", description: "Estrategia jurídica, atención directa y soluciones construidas para cada caso.", type: "website", locale: "es_PE", images: ["/media/lexflex-hero-office.png"] },
  twitter: { card: "summary_large_image", title: "Lexflex | Estudio Jurídico", description: "Asesoría legal estratégica en Huancayo y atención virtual en todo el Perú.", images: ["/media/lexflex-hero-office.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={geistSans.variable + " " + geistMono.variable + " antialiased"}><SiteShell>{children}</SiteShell></body></html>;
}
