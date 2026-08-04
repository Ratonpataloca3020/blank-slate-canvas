import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "../components/ContactCta";
import { Icon } from "../components/Icon";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { services } from "../data";

export const metadata: Metadata = { title: "Áreas de práctica", description: "Asesoría legal especializada en derecho administrativo, contrataciones del Estado, civil, gestión pública, compliance y defensa." };

export default function ServiciosPage() {
  return <main>
    <PageHero eyebrow="Áreas de práctica" title="Especialización jurídica para decisiones que no admiten improvisación." intro="Abordamos asuntos públicos, civiles y de cumplimiento con análisis técnico, estrategia y acompañamiento directo." trail="Servicios" />
    <section className="section services-catalog-section"><div className="container">
      <Reveal className="catalog-intro"><p className="eyebrow">Servicios Lexflex</p><h2>Elija el área más cercana a su situación.</h2><p>Si su caso involucra más de una especialidad, nuestro equipo evaluará la conexión y propondrá una estrategia coordinada.</p></Reveal>
      <div className="services-catalog">{services.map((service, index) => <Reveal key={service.slug} delay={index * 60}><Link href={"/servicios/" + service.slug} className="catalog-card">
        <div className="catalog-card-head"><span>0{index + 1}</span><div className="service-icon"><Icon name={service.icon} size={31} /></div></div><p>{service.eyebrow}</p><h2>{service.title}</h2><div className="gold-rule" /><span>{service.summary}</span><ul>{service.matters.slice(0, 3).map(matter => <li key={matter}>{matter}</li>)}</ul><strong>Ver servicio <Icon name="arrow" size={17} /></strong>
      </Link></Reveal>)}</div>
    </div></section>
    <section className="section audiences-section"><div className="container"><Reveal className="section-heading centered light-heading"><p className="eyebrow light">A quiénes asesoramos</p><h2>Soluciones diseñadas para el contexto de cada cliente.</h2></Reveal><div className="audiences-grid">{[
      ["Personas", "Protección de derechos, patrimonio y defensa frente a procedimientos."], ["Empresas y proveedores", "Prevención, contratación pública, cumplimiento y contingencias."], ["Funcionarios y servidores", "Asesoría y defensa frente a responsabilidades e investigaciones."], ["Entidades y equipos públicos", "Opiniones legales, revisión de procesos y asistencia especializada."],
    ].map(([title, text], index) => <Reveal className="audience-card" key={title} delay={index * 70}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>
    <ContactCta title="¿No está seguro de qué área corresponde a su caso?" />
  </main>;
}
