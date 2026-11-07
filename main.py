#!/usr/bin/env python3
"""
Lexflex - Estudio Jurídico
Punto de entrada principal de la aplicación
"""

if __name__ == "__main__":
    import uvicorn
    from app.config import settings
    
    print("🚀 Iniciando Lexflex v2.0 (Tema Rojo)...")
    print(f"🌐 Servidor: http://{settings.host}:{settings.port}")
    print(f"📝 Modo: {'Desarrollo' if settings.debug else 'Producción'}")
    print("   Presiona Ctrl+C para detener\n")
    
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
