import type { Metadata } from "next";
import { ContactCta } from "../components/ContactCta";
import { Icon } from "../components/Icon";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { professionals } from "../data";

export const metadata: Metadata = { title: "Equipo", description: "Conoce a Diego Gonzalo Córdova Poma y Luis Alberto Córdova Morales, abogados de Lexflex." };

export default function EquipoPage() {
  return <main>
    <PageHero eyebrow="Nuestro equipo" title="Profesionales que conocen el expediente y acompañan cada decisión." intro="Atención directa, especialidades complementarias y una práctica construida alrededor de la confianza." trail="Equipo" />
    <section className="section profiles-section"><div className="container">{professionals.map((person, index) => <Reveal className={"profile-row " + (index % 2 ? "reverse" : "")} key={person.slug}>
      <div className="profile-photo-wrap"><div className="profile-photo"><img src={person.image} alt={person.name} /></div><span className="profile-mark">LF</span></div>
      <div className="profile-copy"><p className="eyebrow">{person.role}</p><h2>{person.name}</h2><span className="profile-registry">{person.registry}</span><p className="large-copy dark-copy">{person.bio}</p>
        <div className="profile-focus"><h3>Áreas de especialidad</h3>{person.focus.map(item => <span key={item}><Icon name="check" size={17} /> {item}</span>)}</div>
        <div className="profile-principles"><div><strong>Enfoque estratégico</strong><span>Decisiones orientadas al objetivo del cliente.</span></div><div><strong>Atención directa</strong><span>Comunicación cercana durante el desarrollo del asunto.</span></div></div>
      </div>
    </Reveal>)}</div></section>
    <section className="section team-philosophy"><div className="container team-philosophy-grid"><Reveal><p className="eyebrow light">Trabajo coordinado</p><h2>La especialidad individual se convierte en una estrategia compartida.</h2></Reveal><Reveal delay={100}><p>Cuando un asunto cruza más de una rama del derecho, ambos profesionales pueden intervenir en su evaluación. Esta coordinación permite reconocer riesgos paralelos y mantener una sola ruta frente al cliente.</p><div className="team-philosophy-list"><span><i /> Revisión jurídica integral</span><span><i /> Criterio técnico complementario</span><span><i /> Responsabilidad claramente definida</span></div></Reveal></div></section>
    <ContactCta title="Hable directamente con el equipo de Lexflex." />
  </main>;
}
