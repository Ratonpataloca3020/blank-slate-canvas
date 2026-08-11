// Cloudflare Pages Function (opcional): endpoint del asistente Diego.
// No forma parte del build de Vite; Cloudflare Pages lo despliega automáticamente
// si existe la variable de entorno GOOGLE_GENERATIVE_AI_API_KEY o LOVABLE_API_KEY.
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { contact, services } from "../../src/data";

const SYSTEM_PROMPT = `Eres "Diego", el asistente virtual del estudio jurídico Lexflex (Huancayo, Perú).

Tu rol:
- Orientar de forma clara, breve y profesional sobre las áreas de práctica del estudio.
- Ayudar a la persona a describir su situación y derivarla al contacto directo del equipo.
- Responder siempre en español, en tono cercano pero formal, con respuestas cortas (máximo 5 líneas o una lista breve).

Áreas de práctica:
${services.map((service) => `- ${service.title}: ${service.summary}`).join("\n")}

Contacto:
- WhatsApp: ${contact.whatsappDisplay}
- Correo: ${contact.email}
- Oficina: ${contact.address}, ${contact.district}

Reglas importantes:
- No brindas asesoría legal definitiva ni garantizas resultados: ofreces orientación general.
- Si el caso requiere análisis, invita a escribir por WhatsApp o agendar una evaluación inicial.
- Si te preguntan algo ajeno al derecho o al estudio, redirige amablemente al tema legal.
- Escribe en texto plano: no uses markdown, asteriscos, negritas ni encabezados.`;

type Env = {
  GOOGLE_GENERATIVE_AI_API_KEY?: string;
  LOVABLE_API_KEY?: string;
};

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { messages } = (await context.request.json()) as { messages?: UIMessage[] };
  if (!Array.isArray(messages)) {
    return new Response("Messages are required", { status: 400 });
  }

  const google = context.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const lovable = context.env.LOVABLE_API_KEY;
  if (!google && !lovable) {
    return new Response("Missing GOOGLE_GENERATIVE_AI_API_KEY", { status: 500 });
  }

  const provider = google
    ? createOpenAICompatible({
        name: "google",
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
        headers: { Authorization: `Bearer ${google}` },
      })
    : createOpenAICompatible({
        name: "lovable",
        baseURL: "https://ai.gateway.lovable.dev/v1",
        headers: {
          "Lovable-API-Key": lovable ?? "",
          "X-Lovable-AIG-SDK": "vercel-ai-sdk",
        },
      });

  const result = streamText({
    model: google ? provider("gemini-2.5-flash") : provider("google/gemini-3.6-flash"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({ originalMessages: messages });
};
