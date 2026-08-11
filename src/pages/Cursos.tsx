import { ContactCta } from "@/components/ContactCta";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { courses, whatsappLink } from "@/data";
import { useSeo } from "@/lib/seo";


export default function CursosPage() {
  useSeo({ title: "Lexflex Formación", description: "Cursos y contenidos jurídicos aplicados para profesionales, empresas y equipos públicos." });
  return <main>
    <PageHero eyebrow="Lexflex Formación" title="Aprender el derecho para aplicarlo mejor." intro="Cursos, talleres y contenidos jurídicos pensados para transformar la norma en decisiones y herramientas concretas." trail="Cursos" />
    <section className="section formation-manifesto"><div className="container formation-manifesto-grid"><Reveal><p className="eyebrow">Una nueva línea de Lexflex</p><h2>Formación rigurosa, lenguaje claro y enfoque práctico.</h2></Reveal><Reveal delay={90}><p className="large-copy dark-copy">Lexflex Formación se encuentra en preparación. Nuestro objetivo es crear experiencias de aprendizaje útiles para profesionales, proveedores, empresas y equipos públicos.</p><span className="coming-label">LANZAMIENTO PRÓXIMO</span></Reveal></div></section>
    <section className="section course-catalog-section"><div className="container"><Reveal className="section-heading centered light-heading"><p className="eyebrow light">Primeras líneas formativas</p><h2>Temas en desarrollo.</h2><p>Las fechas, modalidad y programa completo serán publicados cuando cada curso se encuentre listo.</p></Reveal><div className="course-detail-grid">{courses.map((course, index) => <Reveal className="course-detail-card" key={course.title} delay={index * 80}><span className="course-detail-number">0{index + 1}</span><p>{course.category}</p><h3>{course.title}</h3><span>{course.description}</span><div className="course-meta"><span><Icon name="clock" size={17} /> Programa en preparación</span><span><Icon name="shield" size={17} /> Contenido aplicado</span></div><a className="button outline-gold" href={whatsappLink("Hola, quisiera recibir información sobre el curso: " + course.title)} target="_blank" rel="noreferrer">Unirme a la lista de interés <Icon name="arrow" size={17} /></a></Reveal>)}</div></div></section>
    <section className="section training-audience"><div className="container training-audience-grid"><Reveal><p className="eyebrow">Para quiénes</p><h2>Contenidos que conectan conocimiento y responsabilidad.</h2></Reveal><div className="training-audience-list">{[["Profesionales", "Actualización y herramientas para la práctica."], ["Proveedores", "Criterios para participar y ejecutar contratos públicos."], ["Empresas", "Cumplimiento, prevención y toma de decisiones."], ["Equipos públicos", "Aplicación normativa y gestión responsable."]].map(([title, text], index) => <Reveal key={title} delay={index * 60}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></div></section>
    <ContactCta title="Reciba información cuando Lexflex Formación abra inscripciones." message="Hola, quisiera sumarme a la lista de interés de Lexflex Formación." />
  </main>;
}
