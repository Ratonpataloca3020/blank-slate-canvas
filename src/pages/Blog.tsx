import { ContactCta } from "@/components/ContactCta";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/data";

const extraArticles = [
  { category: "Derecho civil", date: "Próximamente", title: "Cláusulas contractuales que conviene revisar antes de firmar", excerpt: "Responsabilidad, plazos, penalidades y solución de controversias en lenguaje claro." },
  { category: "Gestión pública", date: "Próximamente", title: "La importancia de motivar correctamente una decisión administrativa", excerpt: "Qué debe explicar una decisión pública para ser comprensible, trazable y sostenible." },
  { category: "Defensa especializada", date: "Próximamente", title: "Documentos y contexto: cómo se construye una teoría del caso", excerpt: "La defensa técnica comienza con una reconstrucción ordenada de hechos, funciones y evidencia." },
];
export default function BlogPage() {
  const allArticles = [...articles, ...extraArticles];
  return <main>
    <PageHero eyebrow="Análisis Lexflex" title="Comprender antes de decidir." intro="Ideas, criterios y explicaciones para reconocer riesgos y actuar con mayor seguridad jurídica." trail="Análisis" />
    <section className="section editorial-section"><div className="container">
      <Reveal className="editorial-featured"><div className="featured-number">01</div><div className="featured-copy"><span>{articles[0].category} · {articles[0].date}</span><h2>{articles[0].title}</h2><p>{articles[0].excerpt}</p><small>La biblioteca de análisis se encuentra en preparación. Puede solicitar orientación directa sobre este tema.</small></div><div className="featured-icon"><Icon name="administrative" size={52} /></div></Reveal>
      <div className="editorial-grid">{allArticles.slice(1).map((article, index) => <Reveal className="editorial-card" key={article.title} delay={index * 60}><div><span>{article.category}</span><small>{article.date}</small></div><h3>{article.title}</h3><p>{article.excerpt}</p><span className="editorial-status"><i /> EN PREPARACIÓN</span></Reveal>)}</div>
    </div></section>
    <section className="section editorial-note"><div className="container editorial-note-grid"><Reveal><p className="eyebrow light">Información responsable</p><h2>El contenido orienta. La estrategia exige conocer el caso.</h2></Reveal><Reveal delay={100}><p>Los artículos de Lexflex tendrán fines informativos y no constituirán asesoría legal individual. La norma aplicable, los plazos y la documentación pueden cambiar el análisis.</p></Reveal></div></section>
    <ContactCta title="¿Tiene una consulta sobre alguno de estos temas?" />
  </main>;
}
