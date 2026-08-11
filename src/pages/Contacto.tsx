import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { contact, whatsappLink } from "@/data";
import { ContactForm } from "@/components/ContactForm";
import { useSeo } from "@/lib/seo";

export default function ContactoPage() {
  useSeo({ title: "Contacto", description: "Contacta directamente a Lexflex Estudio Jurídico en El Tambo, Huancayo." });
  return <main>
    <PageHero eyebrow="Contacto" title="El primer paso es ordenar la situación." intro="Converse directamente con nuestro equipo y conozca qué información necesitamos para realizar una evaluación inicial." trail="Contacto" />
    <section className="section contact-page-section"><div className="container contact-page-grid">
      <Reveal className="contact-info-column"><p className="eyebrow">Atención Lexflex</p><h2>Presencial en Huancayo. Coordinación virtual en todo el Perú.</h2><p>Puede escribirnos por WhatsApp, llamar o enviar un correo. Para una primera coordinación, indique el tipo de asunto y si existe algún plazo próximo.</p>
        <div className="contact-methods"><a href={whatsappLink("Hola, quisiera realizar una consulta con Lexflex.")} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={23} /><span><small>WhatsApp principal</small><strong>{contact.whatsappDisplay}</strong></span></a><a href={"tel:" + contact.secondaryPhone.replace(/\s/g, "")}><Icon name="phone" size={23} /><span><small>Teléfono alternativo</small><strong>{contact.secondaryPhone}</strong></span></a><a href={"mailto:" + contact.email}><Icon name="mail" size={23} /><span><small>Correo electrónico</small><strong>{contact.email}</strong></span></a></div>
        <div className="office-card"><div><Icon name="pin" size={25} /><span><small>OFICINA</small><strong>{contact.address}</strong><p>{contact.district}</p></span></div><div><Icon name="clock" size={25} /><span><small>ATENCIÓN</small><strong>Previa coordinación</strong><p>Consultas presenciales y virtuales</p></span></div><a href="https://www.google.com/maps/search/?api=1&query=Jr.+Parra+del+Riego+338+El+Tambo+Huancayo" target="_blank" rel="noreferrer">Ver ubicación <Icon name="arrow" size={16} /></a></div>
      </Reveal>
      <Reveal delay={100}><ContactForm /></Reveal>
    </div></section>
    <section className="contact-map-section"><div className="contact-map-graphic"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" /><div className="large-map-pin"><Icon name="pin" size={34} /><div><strong>Lexflex</strong><span>El Tambo · Huancayo</span></div></div></div></section>
  </main>;
}
