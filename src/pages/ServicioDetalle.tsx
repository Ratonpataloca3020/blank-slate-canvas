import { Link, Navigate, useParams } from "react-router-dom";
import { ContactCta } from "@/components/ContactCta";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data";
import { useSeo } from "@/lib/seo";

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find(item => item.slug === slug);
  useSeo(service ? { title: service.title, description: service.summary } : { title: "Servicios" });
  if (!service) return <Navigate to="/servicios" replace />;
  const related = services.filter(item => item.slug !== slug).slice(0, 3);
  return <main>

    <section className="service-detail-hero"><div className="service-detail-bg" /><div className="container service-detail-inner">
      <div className="breadcrumb"><Link to="/">Inicio</Link><span>/</span><Link to="/servicios">Servicios</Link><span>/</span><span>{service.shortTitle}</span></div>
      <div className="service-detail-title"><div className="service-detail-icon"><Icon name={service.icon} size={42} /></div><div><p className="eyebrow light">{service.eyebrow}</p><h1>{service.title}</h1></div></div>
      <p className="service-detail-lead">{service.summary}</p><a href="#alcance" className="button gold">Conocer el alcance <Icon name="arrow" size={18} /></a>
    </div></section>
    <section className="section service-overview" id="alcance"><div className="container service-overview-grid"><Reveal><p className="eyebrow">Cómo podemos ayudar</p><h2>Una estrategia construida sobre el expediente y el objetivo.</h2></Reveal><Reveal delay={90}><p className="large-copy dark-copy">{service.description}</p><p>La viabilidad y la estrategia se determinan después de revisar el contexto y la documentación disponible.</p></Reveal></div></section>
    <section className="section matter-section"><div className="container"><Reveal className="section-heading heading-split"><div><p className="eyebrow">Asuntos que atendemos</p><h2>Intervención legal precisa en los momentos críticos.</h2></div><p>El listado es referencial. Evaluamos situaciones relacionadas o que involucren varias áreas.</p></Reveal><div className="matter-grid">{service.matters.map((matter, index) => <Reveal className="matter-card" key={matter} delay={index * 60}><span>0{index + 1}</span><Icon name="check" size={19} /><h3>{matter}</h3></Reveal>)}</div></div></section>
    <section className="section approach-section"><div className="container approach-grid"><Reveal className="approach-intro"><p className="eyebrow light">Método Lexflex</p><h2>Del diagnóstico a una ruta de acción comprensible.</h2><p>Cada paso responde a una estrategia y a un propósito definido con el cliente.</p></Reveal><div className="approach-list">{service.approach.map((item, index) => <Reveal className="approach-item" key={item} delay={index * 80}><span>0{index + 1}</span><div><h3>{item}</h3><p>Revisamos la información relevante, explicamos las alternativas y documentamos el siguiente paso.</p></div></Reveal>)}</div></div></section>
    <section className="section related-section"><div className="container"><Reveal className="section-heading heading-split"><div><p className="eyebrow">Áreas relacionadas</p><h2>Una visión más amplia cuando el caso lo necesita.</h2></div><Link className="text-link dark-link" to="/servicios">Ver todas las áreas <Icon name="arrow" size={17} /></Link></Reveal><div className="related-grid">{related.map(item => <Link className="related-card" key={item.slug} to={"/servicios/" + item.slug}><Icon name={item.icon} size={29} /><h3>{item.title}</h3><p>{item.summary}</p><span>Explorar <Icon name="arrow" size={16} /></span></Link>)}</div></div></section>
    <ContactCta title={"Conversemos sobre su caso de " + service.shortTitle.toLowerCase() + "."} message={"Hola, quisiera consultar sobre " + service.title + "."} />
  </main>;
}
