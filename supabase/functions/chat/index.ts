import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible@3.0.22";
import { convertToModelMessages, streamText, type UIMessage } from "npm:ai@7.0.51";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL_ID = "google/gemini-3.8-flash";

const SERVICES = [
  "Derecho Administrativo: asesoría frente a entidades públicas, procedimientos administrativos y decisiones que requieren una respuesta técnica y oportuna.",
  "Contrataciones con el Estado: prevención y solución de contingencias durante la preparación, selección, ejecución y cierre de contratos públicos.",
  "Derecho Civil: soluciones para obligaciones, contratos, responsabilidad civil, propiedad, sucesiones y controversias patrimoniales.",
  "Gestión Pública: consultoría jurídica para fortalecer decisiones, procesos internos y cumplimiento dentro de organizaciones públicas.",
  "Compliance y Cumplimiento: diseño y fortalecimiento de mecanismos de cumplimiento, integridad y prevención de riesgos legales.",
  "Defensa en casos de corrupción de funcionarios: defensa técnica en investigaciones y procesos vinculados con presuntos delitos contra la administración pública.",
  "SPLAFT: diseño, implementación y fortalecimiento de sistemas de prevención de lavado de activos y financiamiento del terrorismo, con experiencia ante la UIF.",
];

const CONTACT_LINES = [
  "WhatsApp: +51 955 068 382",
  "Teléfono secundario: +51 920 567 730",
  "Correo: diegocpoma@gmail.com",
  "Oficina: Jr. Parra del Riego N.° 338, 3.er piso, El Tambo, Huancayo, Perú",
];

const SYSTEM_PROMPT = `Eres "Diego", el asistente virtual del estudio jurídico Lexflex (Huancayo, Perú).

Tu rol:
- Orientar de forma clara, breve y profesional sobre las áreas de práctica del estudio.
- Ayudar a la persona a describir su situación y derivarla al contacto directo del equipo.
- Responder siempre en español, en tono cercano pero formal, con respuestas cortas (máximo 5 líneas o una lista breve).

Áreas de práctica:
${SERVICES.map((service) => `- ${service}`).join("\n")}

Contacto:
${CONTACT_LINES.map((line) => `- ${line}`).join("\n")}

Reglas importantes:
- No brindas asesoría legal definitiva ni garantizas resultados: ofreces orientación general.
- Si el caso requiere análisis, invita a escribir por WhatsApp o agendar una evaluación inicial.
- Si te preguntan algo ajeno al derecho o al estudio, redirige amablemente al tema legal.
- Escribe en texto plano: no uses markdown, asteriscos, negritas ni encabezados.`;

const MAX_MESSAGES = 40;
const MAX_TOTAL_CHARS = 12_000;
const SAFE_ERROR = "No pudimos responder en este momento. Escríbenos por WhatsApp al +51 955 068 382.";

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function validateMessages(messages: unknown): messages is UIMessage[] {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return false;
  let total = 0;
  for (const message of messages) {
    if (!message || typeof message !== "object") return false;
    const role = (message as { role?: unknown }).role;
    if (role !== "user" && role !== "assistant" && role !== "system") return false;
    const parts = (message as { parts?: unknown }).parts;
    if (!Array.isArray(parts)) return false;
    for (const part of parts) {
      const type = (part as { type?: unknown })?.type;
      if (type !== "text" || typeof (part as { text?: unknown }).text !== "string") return false;
      total += ((part as { text: string }).text || "").length;
    }
  }
  return total > 0 && total <= MAX_TOTAL_CHARS;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonError("Method not allowed", 405);
  }

  let payload: { messages?: unknown };
  try {
    payload = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }
  if (!validateMessages(payload.messages)) {
    return jsonError("Messages are required", 400);
  }
  const messages = payload.messages;

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) {
    console.error("LOVABLE_API_KEY is not configured");
    return jsonError(SAFE_ERROR, 500);
  }

  const provider = createOpenAICompatible({
    name: "lovable",
    baseURL: GATEWAY_URL,
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });

  try {
    const result = streamText({
      model: provider(MODEL_ID),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    });

    const streamResponse = result.toUIMessageStreamResponse({ originalMessages: messages });
    const headers = new Headers(streamResponse.headers);
    for (const [key, value] of Object.entries(corsHeaders)) {
      headers.set(key, value);
    }
    return new Response(streamResponse.body, { status: streamResponse.status, headers });
  } catch (error) {
    console.error("Chat stream failed:", error instanceof Error ? error.message : error);
    const status = typeof (error as { statusCode?: unknown })?.statusCode === "number"
      ? (error as { statusCode: number }).statusCode
      : 500;
    return jsonError(SAFE_ERROR, status >= 400 && status < 600 ? status : 500);
  }
});
