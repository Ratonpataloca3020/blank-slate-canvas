import { useState, type FormEvent } from "react";
import { contact } from "@/data";
import { Icon } from "../components/Icon";

export function ContactForm() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("Consulta general");
  const [summary, setSummary] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    const message = ["Hola, mi nombre es " + name + ".", "Área: " + area + ".", "Resumen: " + summary, "Quisiera solicitar una evaluación inicial con Lexflex."].join("\n");
    window.open("https://wa.me/" + contact.whatsapp + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-heading"><p className="eyebrow">Cuéntenos brevemente</p><h2>Iniciar consulta</h2><span>El mensaje se enviará directamente por WhatsApp.</span></div>
    <label>Nombre y apellido<input required value={name} onChange={event => setName(event.target.value)} placeholder="Escriba su nombre" /></label>
    <label>Área relacionada<select value={area} onChange={event => setArea(event.target.value)}><option>Consulta general</option><option>Derecho Administrativo</option><option>Contrataciones del Estado</option><option>Derecho Civil</option><option>Gestión Pública</option><option>Compliance</option><option>Defensa en casos de corrupción de funcionarios</option></select></label>
    <label>Resumen del asunto<textarea required value={summary} onChange={event => setSummary(event.target.value)} placeholder="Describa el contexto general. Evite enviar información especialmente sensible en este primer mensaje." rows={6} /></label>
    <button className="button gold" type="submit">Continuar por WhatsApp <Icon name="whatsapp" size={19} /></button><small>Al continuar, se abrirá WhatsApp con el mensaje listo para enviar. El formulario no almacena sus datos.</small>
  </form>;
}
