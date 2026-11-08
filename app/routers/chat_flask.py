"""
Router de chat para Flask
"""
from flask import Blueprint, request, jsonify
from datetime import datetime

bp = Blueprint('chat', __name__)


@bp.route("/chat", methods=['POST'])
def chat_endpoint():
    """
    Endpoint para el chat.
    Recibe un mensaje del usuario y devuelve una respuesta del bot.
    """
    try:
        data = request.get_json()
        message = data.get("message", "").strip()
        
        if not message:
            return jsonify({
                "success": False,
                "error": "El mensaje no puede estar vacío"
            }), 400
        
        # Por ahora, respuesta simple
        # TODO: Integrar con OpenAI o tu sistema de chat preferido
        response_message = (
            "Gracias por contactarnos. Un miembro de nuestro equipo revisará tu caso "
            "y se pondrá en contacto contigo pronto."
        )
        
        return jsonify({
            "success": True,
            "message": response_message,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
