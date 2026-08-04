"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { contact, services, whatsappLink } from "../data";
import { Icon } from "./Icon";
import { ChatWidget } from "./ChatWidget";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/equipo", label: "Equipo" },
  { href: "/cursos", label: "Cursos" },
  { href: "/blog", label: "Análisis" },
  { href: "/contacto", label: "Contacto" },
];

function Brand() {
  return <Link href="/" className="brand" aria-label="Lexflex, ir al inicio"><img src="/media/lexflex-logo.svg" alt="Lexflex Estudio Jurídico" /></Link>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  return <>
    <header className={"site-header " + (scrolled ? "is-scrolled" : "")}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {nav.map(item => <Link key={item.href} href={item.href} className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "active" : ""}>{item.label}</Link>)}
        </nav>
        <a className="header-cta" href={whatsappLink("Hola, quisiera solicitar una evaluación inicial de mi caso.")} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> Solicitar orientación</a>
        <button className="menu-toggle" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
      </div>
      <div className={"mobile-panel " + (open ? "open" : "")}>
        {nav.map(item => <Link key={item.href} href={item.href}>{item.label}<Icon name="arrow" size={18} /></Link>)}
        <a href={whatsappLink("Hola, quisiera solicitar una evaluación inicial de mi caso.")} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
      </div>
    </header>
    {children}
    <footer className="site-footer">
      <div className="footer-glow" />
      <div className="container footer-grid">
        <div className="footer-brand"><Brand /><p>Estrategia jurídica rigurosa, atención directa y soluciones construidas para cada asunto.</p><span>Huancayo · Atención presencial y virtual</span></div>
        <div><h3>Explora</h3><Link href="/nosotros">El estudio</Link><Link href="/equipo">Profesionales</Link><Link href="/cursos">Lexflex Formación</Link><Link href="/blog">Análisis jurídico</Link></div>
        <div><h3>Áreas principales</h3>{services.slice(0, 5).map(service => <Link key={service.slug} href={"/servicios/" + service.slug}>{service.shortTitle}</Link>)}</div>
        <div className="footer-contact"><h3>Contacto directo</h3><a href={"tel:+" + contact.whatsapp}><Icon name="phone" size={17} /> {contact.whatsappDisplay}</a><a href={"mailto:" + contact.email}><Icon name="mail" size={17} /> {contact.email}</a><p><Icon name="pin" size={17} /><span>{contact.address}<br />{contact.district}</span></p></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Lexflex. Todos los derechos reservados.</span><span>La información del sitio es orientativa y no sustituye asesoría legal para un caso concreto.</span></div>
    </footer>
    <a className="whatsapp-float" href={whatsappLink("Hola, vi el sitio web de Lexflex y quisiera realizar una consulta.")} target="_blank" rel="noreferrer" aria-label="Conversar con Lexflex por WhatsApp"><Icon name="whatsapp" size={26} /><span>Consulta directa</span></a>
    <ChatWidget />
  </>;
}
