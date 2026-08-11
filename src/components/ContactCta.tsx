import { Link } from "react-router-dom";
import { whatsappLink } from "@/data";
import { Icon } from "@/components/Icon";
import { Reveal } from "./Reveal";

export function ContactCta({ title = "¿Necesita una lectura jurídica clara de su situación?", message = "Hola, quisiera solicitar una evaluación inicial con Lexflex." }: { title?: string; message?: string }) {
  return <section className="inner-cta"><div className="inner-cta-lines" />
    <Reveal className="container inner-cta-content"><p className="eyebrow light">Contacto directo</p><h2>{title}</h2>
      <p>Cuéntenos brevemente el contexto. Nuestro equipo le indicará el siguiente paso de forma directa y confidencial.</p>
      <div className="hero-actions"><a className="button gold" href={whatsappLink(message)} target="_blank" rel="noreferrer">Escribir por WhatsApp <Icon name="whatsapp" size={19} /></a><Link className="button ghost" to="/contacto">Datos de la oficina</Link></div>
    </Reveal>
  </section>;
}
