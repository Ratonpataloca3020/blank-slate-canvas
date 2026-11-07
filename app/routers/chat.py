from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import openai
from app.config import settings


router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]


class ChatResponse(BaseModel):
    message: str


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Endpoint para el chat con IA.
    Recibe mensajes y devuelve una respuesta del asistente.
    """
    if not settings.openai_api_key:
        raise HTTPException(
            status_code=500,
            detail="OpenAI API key no configurada"
        )
    
    try:
        client = openai.OpenAI(api_key=settings.openai_api_key)
        
        # Sistema de mensajes para el contexto del estudio jurídico
        system_message = {
            "role": "system",
            "content": """Eres un asistente virtual de Lexflex, un estudio jurídico en Huancayo, Perú. 
            Tu función es:
            - Responder preguntas generales sobre los servicios del estudio
            - Orientar sobre qué tipo de servicio jurídico podría necesitar el consultante
            - Ser cordial, profesional y empático
            - Sugerir contactar directamente con los abogados para casos específicos
            - No dar asesoría legal específica, solo información general
            
            Áreas del estudio: Derecho Administrativo, Contrataciones del Estado, Derecho Civil,
            Gestión Pública, Compliance, Defensa en casos de corrupción de funcionarios, SPLAFT.
            
            Contacto: WhatsApp +51 955 068 382, email diegocpoma@gmail.com
            Oficina: Jr. Parra del Riego N.° 338, 3.er piso, El Tambo, Huancayo."""
        }
        
        messages = [system_message] + [msg.model_dump() for msg in request.messages]
        
        response = client.chat.completions.create(
            model=settings.openai_model,
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        assistant_message = response.choices[0].message.content
        
        return ChatResponse(message=assistant_message)
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error al procesar el chat: {str(e)}"
        )
