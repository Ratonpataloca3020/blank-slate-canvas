import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { articles, contact, courses, professionals, services, whatsappLink } from "@/data";
import { useSeo } from "@/lib/seo";


export default function Home() {
  useSeo({ title: "Estudio Jurídico en Huancayo", description: "Estudio jurídico en Huancayo: derecho administrativo, contrataciones del Estado, civil, gestión pública, compliance, SPLAFT y defensa especializada." });
  return <main>
    <section className="home-hero">
      <img className="hero-photo" src="/media/lexflex-hero-office.png" alt="Oficina jurídica contemporánea de Lexflex" />
      <div className="hero-shade" /><div className="hero-lines" /><div className="floating-orb orb-one" /><div className="floating-orb orb-two" />
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow light">Estudio jurídico · Huancayo</p>
          <h1>Estrategia legal para convertir la complejidad en <span>decisiones claras.</span></h1>
          <p className="hero-lead">Asesoría y defensa especializada para personas, empresas y organizaciones que necesitan criterio, respuesta y acompañamiento real.</p>
          <div className="hero-actions">
            <a className="button gold" href={whatsappLink("Hola, quisiera conversar con un abogado de Lexflex sobre mi caso.")} target="_blank" rel="noreferrer">Evaluar mi caso <Icon name="arrow" size={18} /></a>
            <Link className="button ghost" to="/servicios">Conocer las áreas</Link>
          </div>
          <div className="hero-proof"><span><Icon name="shield" size={19} /> Confidencialidad desde el primer contacto</span><span><Icon name="clock" size={19} /> Atención presencial y virtual</span></div>
        </div>
        <aside className="hero-dossier" aria-label="Atención Lexflex">
          <div className="dossier-topline"><span>LEXFLEX / ATENCIÓN DIRECTA</span><i /></div>
          <h2>Su asunto merece una lectura completa, no una respuesta automática.</h2>
          <p>En Lexflex el contacto conduce directamente a nuestro equipo. Sin chatbots ni formularios interminables.</p>
          <div className="dossier-team"><div className="portrait-stack">{professionals.map(person => <img key={person.slug} src={person.image} alt={person.name} />)}</div><div><strong>Dos perspectivas jurídicas</strong><span>Una estrategia coordinada</span></div></div>
          <a href={"tel:+" + contact.whatsapp} className="dossier-link"><Icon name="phone" size={18} /> {contact.whatsappDisplay}</a>
        </aside>
      </div>
      <a className="scroll-cue" href="#areas"><span /> Descubrir Lexflex</a>
    </section>

    <section className="principles-strip"><div className="container principles-grid">
      {[
        ["01", "Análisis riguroso", "Cada recomendación parte de los hechos y la evidencia."],
        ["02", "Comunicación directa", "Explicamos la estrategia con claridad y sin rodeos."],
        ["03", "Prevención de riesgos", "Actuamos antes de que un problema gane terreno."],
        ["04", "Defensa personalizada", "No existen respuestas en serie para asuntos distintos."],
      ].map(([number, title, text]) => <div key={number} className="principle"><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></div>)}
    </div></section>

    <section className="section services-section" id="areas"><div className="container">
      <Reveal className="section-heading heading-split">
        <div><p className="eyebrow">Áreas de práctica</p><h2>Especialización que se conecta alrededor de su caso.</h2></div>
        <div><p>Integramos derecho público, práctica civil, cumplimiento y defensa especializada para abordar el problema completo, no solo una parte del expediente.</p><Link to="/servicios" className="text-link">Ver todos los servicios <Icon name="arrow" size={17} /></Link></div>
      </Reveal>
      <div className="services-grid">{services.map((service, index) => <Reveal key={service.slug} delay={index * 70}>
        <Link className="service-card" to={"/servicios/" + service.slug}><div className="service-number">0{index + 1}</div><div className="service-icon"><Icon name={service.icon} size={30} /></div><p>{service.eyebrow}</p><h3>{service.title}</h3><span>{service.summary}</span><div className="service-arrow">Explorar <Icon name="arrow" size={18} /></div></Link>
      </Reveal>)}</div>
    </div></section>

    <section className="section identity-section"><div className="identity-watermark">LF</div><div className="container identity-grid">
      <Reveal className="identity-visual"><div className="portrait-window portrait-main"><img src={professionals[0].image} alt={professionals[0].name} /></div><div className="portrait-window portrait-secondary"><img src={professionals[1].image} alt={professionals[1].name} /></div><div className="gold-seal"><span>LF</span><small>CRITERIO · ESTRATEGIA · DEFENSA</small></div></Reveal>
      <Reveal className="identity-copy" delay={100}><p className="eyebrow light">Nuestra identidad</p><h2>Lexflex nace para hacer el derecho más claro, estratégico y cercano.</h2><p className="large-copy">Reunimos experiencia en asuntos públicos, civiles y de cumplimiento bajo una forma de trabajo exigente: escuchar, comprender y actuar con propósito.</p>
        <div className="identity-values"><div><strong>Flexible en el enfoque</strong><span>La estrategia se adapta al caso, no al revés.</span></div><div><strong>Firme en el estándar</strong><span>Rigor técnico, reserva y comunicación permanente.</span></div></div>
        <Link to="/nosotros" className="button outline-gold">Conocer el estudio <Icon name="arrow" size={18} /></Link>
      </Reveal>
    </div></section>

    <section className="section team-section"><div className="container">
      <Reveal className="section-heading centered"><p className="eyebrow">Profesionales</p><h2>Experiencia complementaria, atención verdaderamente directa.</h2><p>Los asuntos son acompañados por los abogados responsables de construir y sostener la estrategia.</p></Reveal>
      <div className="team-grid">{professionals.map((person, index) => <Reveal key={person.slug} delay={index * 100}><article className="team-card">
        <div className="team-photo"><img src={person.image} alt={person.name} /><span>{person.role}</span></div>
        <div className="team-info"><p>{person.registry}</p><h3>{person.name}</h3><div className="focus-tags">{person.focus.slice(0, 3).map(item => <span key={item}>{item}</span>)}</div><Link to="/equipo" className="text-link dark-link">Ver perfil profesional <Icon name="arrow" size={17} /></Link></div>
      </article></Reveal>)}</div>
    </div></section>

    <section className="section formation-section"><div className="marble-noise" /><div className="container">
      <Reveal className="formation-intro"><div><p className="eyebrow">Lexflex Formación</p><h2>Conocimiento jurídico aplicado a decisiones reales.</h2></div><div><p>Próximamente: cursos y contenidos para profesionales, empresas y equipos públicos que buscan comprender y aplicar mejor el derecho.</p><span className="coming-label">PRÓXIMAMENTE</span></div></Reveal>
      <div className="course-grid">{courses.map((course, index) => <Reveal key={course.title} delay={index * 80}><article className="course-card"><span className="course-index">0{index + 1}</span><p>{course.category}</p><h3>{course.title}</h3><div className="gold-rule" /><span>{course.description}</span><a href={whatsappLink("Hola, quisiera recibir información cuando esté disponible el curso: " + course.title)} target="_blank" rel="noreferrer" className="text-link dark-link">Avisarme cuando esté disponible <Icon name="arrow" size={16} /></a></article></Reveal>)}</div>
      <div className="formation-footer"><Link to="/cursos" className="button navy">Conocer Lexflex Formación <Icon name="arrow" size={18} /></Link></div>
    </div></section>

    <section className="section process-section"><div className="container process-grid">
      <Reveal className="process-copy"><p className="eyebrow light">Cómo trabajamos</p><h2>Una ruta clara desde la primera conversación.</h2><p>La estrategia jurídica funciona mejor cuando cada decisión tiene una razón, un responsable y un siguiente paso.</p><a className="button gold" href={whatsappLink("Hola, quisiera iniciar una consulta y conocer cómo trabajarían mi caso.")} target="_blank" rel="noreferrer">Iniciar una consulta <Icon name="arrow" size={18} /></a></Reveal>
      <div className="process-steps">{[
        ["01", "Escuchamos y ordenamos", "Conocemos el contexto, los documentos y el resultado que necesita."],
        ["02", "Evaluamos escenarios", "Identificamos riesgos, plazos, alternativas y prioridades."],
        ["03", "Definimos la estrategia", "Proponemos una ruta comprensible, con acciones concretas."],
        ["04", "Acompañamos la ejecución", "Damos seguimiento, informamos avances y ajustamos cuando corresponde."],
      ].map(([number, title, text], index) => <Reveal key={number} delay={index * 70} className="process-step"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div>
    </div></section>

    <section className="section journal-section"><div className="container">
      <Reveal className="section-heading heading-split"><div><p className="eyebrow">Análisis Lexflex</p><h2>Ideas útiles para anticipar decisiones jurídicas.</h2></div><div><p>Contenido claro sobre asuntos que afectan a personas, proveedores, empresas y equipos públicos.</p><Link to="/blog" className="text-link dark-link">Ver todos los análisis <Icon name="arrow" size={17} /></Link></div></Reveal>
      <div className="article-grid">{articles.map((article, index) => <Reveal key={article.title} delay={index * 80}><article className="article-card"><div className="article-top"><span>{article.category}</span><small>{article.date}</small></div><h3>{article.title}</h3><p>{article.excerpt}</p><Link to="/blog">Leer análisis <Icon name="arrow" size={17} /></Link></article></Reveal>)}</div>
    </div></section>

    <section className="contact-band"><div className="container contact-band-grid">
      <Reveal className="contact-band-copy"><p className="eyebrow light">Hablemos de su caso</p><h2>Una decisión a tiempo puede cambiar todo el escenario.</h2><p>Cuéntenos brevemente qué está ocurriendo. El contacto es directo con el equipo de Lexflex.</p><div className="hero-actions"><a className="button gold" href={whatsappLink("Hola, quisiera solicitar una evaluación inicial con Lexflex.")} target="_blank" rel="noreferrer">Escribir por WhatsApp <Icon name="whatsapp" size={19} /></a><Link className="button ghost" to="/contacto">Ver datos de contacto</Link></div></Reveal>
      <Reveal className="location-card" delay={100}><div className="location-map"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" /><div className="map-pin"><Icon name="pin" size={25} /></div></div><div className="location-copy"><span>OFICINA LEXFLEX</span><strong>{contact.address}</strong><p>{contact.district}</p><a href="https://www.google.com/maps/search/?api=1&query=Jr.+Parra+del+Riego+338+El+Tambo+Huancayo" target="_blank" rel="noreferrer">Abrir en Google Maps <Icon name="arrow" size={16} /></a></div></Reveal>
    </div></section>
  </main>;
}
