import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { contact, services } from "../../data";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `Eres "Asistente Lexflex", el asistente virtual del estudio jurídico Lexflex (Huancayo, Perú).

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
- Si te preguntan algo ajeno al derecho o al estudio, redirige amablemente al tema legal.`;

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { messages?: UIMessage[] };
  if (!Array.isArray(messages)) {
    return new Response("Messages are required", { status: 400 });
  }

  const apiKey = await resolveApiKey();
  if (!apiKey) {
    return new Response("Missing LOVABLE_API_KEY", { status: 500 });
  }

  const gateway = createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });

  const result = streamText({
    model: gateway("google/gemini-3.6-flash"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({ originalMessages: messages });
}
