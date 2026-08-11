import { Link } from "react-router-dom";
import { ContactCta } from "@/components/ContactCta";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useSeo } from "@/lib/seo";


export default function NosotrosPage() {
  useSeo({ title: "Nosotros", description: "Conoce la identidad, principios y forma de trabajo de Lexflex Estudio Jurídico." });
  return <main>
    <PageHero eyebrow="El estudio" title="Rigor jurídico con una forma de trabajo más humana." intro="Lexflex integra especialización, estrategia y comunicación directa para acompañar decisiones legales complejas con claridad." trail="Nosotros" />
    <section className="section story-section"><div className="container story-grid">
      <Reveal className="story-brand-panel"><img src="/media/lexflex-logo-master.png" alt="Lexflex Estudio Jurídico" /><div className="brand-concept"><span>LEX</span><i /><span>FLEX</span></div><p>Solidez jurídica. Estrategia que se adapta.</p></Reveal>
      <Reveal className="story-copy" delay={100}><p className="eyebrow">Por qué Lexflex</p><h2>El derecho exige firmeza en los principios y flexibilidad en la estrategia.</h2><p>Cada asunto llega con una historia, documentos, riesgos y objetivos distintos. Por eso nuestra práctica no parte de respuestas prediseñadas, sino de una comprensión completa del problema y de las decisiones que realmente están en juego.</p><p>El nombre Lexflex representa esa convicción: conocimiento legal sólido para construir soluciones que respondan al contexto de cada persona, empresa u organización.</p><Link to="/equipo" className="text-link dark-link">Conocer a los profesionales <Icon name="arrow" size={17} /></Link></Reveal>
    </div></section>
    <section className="section values-section"><div className="container">
      <Reveal className="section-heading centered light-heading"><p className="eyebrow light">Nuestro estándar</p><h2>La confianza se construye en la forma de trabajar.</h2><p>Estos principios orientan el análisis, la comunicación y cada actuación realizada en nombre del cliente.</p></Reveal>
      <div className="values-grid">{[
        ["01", "Criterio", "Evaluamos hechos, norma, evidencia y escenarios."], ["02", "Claridad", "Traducimos la complejidad en decisiones comprensibles."], ["03", "Reserva", "Protegemos la información y la exposición de cada asunto."], ["04", "Responsabilidad", "Cada recomendación considera efectos jurídicos y prácticos."], ["05", "Proximidad", "Comunicación directa con el equipo responsable."], ["06", "Prevención", "Controlamos el riesgo antes de que se convierta en crisis."],
      ].map(([number, title, text], index) => <Reveal className="value-card" key={number} delay={index * 60}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
    </div></section>
    <section className="section model-section"><div className="container model-grid">
      <Reveal className="model-copy"><p className="eyebrow">Una práctica integrada</p><h2>Dos especialistas, una visión coordinada del asunto.</h2><p>La experiencia en derecho público, contratación estatal, práctica civil, gestión pública, cumplimiento y defensa permite reconocer conexiones que suelen pasar desapercibidas.</p><div className="model-checks">{["Evaluación conjunta cuando el asunto lo requiere", "Estrategia documentada y prioridades definidas", "Comunicación directa durante el desarrollo del caso", "Atención presencial en Huancayo y coordinación virtual"].map(item => <span key={item}><Icon name="check" size={18} /> {item}</span>)}</div></Reveal>
      <Reveal className="model-visual" delay={100}>{[["02", "profesionales", "Especialidades que se complementan"], ["06", "áreas de práctica", "Soluciones coordinadas para asuntos complejos"], ["01", "punto de contacto", "Atención directa, sin respuestas automáticas"]].map(([number, label, text]) => <div className="model-pair" key={number + label}><span className="model-number">{number}</span><div><small>{label}</small><strong>{text}</strong></div></div>)}</Reveal>
    </div></section>
    <ContactCta title="Conozca cómo abordaríamos su situación concreta." />
  </main>;
}
