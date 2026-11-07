from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path

from app.config import settings
from app.data import (
    services, professionals, courses, articles, 
    contact, get_service_by_slug, whatsapp_link
)


app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
)

# Configurar archivos estáticos
static_path = Path(__file__).parent.parent / "static"
static_path.mkdir(exist_ok=True)
app.mount("/static", StaticFiles(directory=str(static_path)), name="static")

# Configurar templates
templates_path = Path(__file__).parent / "templates"
templates = Jinja2Templates(directory=str(templates_path))

# Agregar funciones globales a los templates
templates.env.globals["whatsapp_link"] = whatsapp_link
templates.env.globals["contact"] = contact
templates.env.globals["services"] = services
templates.env.globals["site_url"] = settings.site_url


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Página de inicio."""
    return templates.TemplateResponse(
        "pages/home.html",
        {
            "request": request,
            "title": "Estudio Jurídico en Huancayo",
            "description": "Estudio jurídico en Huancayo: derecho administrativo, contrataciones del Estado, civil, gestión pública, compliance, SPLAFT y defensa especializada.",
            "services": services,
            "professionals": professionals,
            "courses": courses,
            "articles": articles,
        }
    )


@app.get("/nosotros", response_class=HTMLResponse)
async def nosotros(request: Request):
    """Página Nosotros."""
    return templates.TemplateResponse(
        "pages/nosotros.html",
        {
            "request": request,
            "title": "Nosotros | Lexflex",
            "description": "Lexflex: estudio jurídico enfocado en estrategia, prevención de riesgos y acompañamiento técnico en asuntos complejos.",
        }
    )


@app.get("/servicios", response_class=HTMLResponse)
async def servicios_list(request: Request):
    """Página de listado de servicios."""
    return templates.TemplateResponse(
        "pages/servicios.html",
        {
            "request": request,
            "title": "Servicios Jurídicos | Lexflex",
            "description": "Áreas de práctica: derecho administrativo, contrataciones del Estado, civil, gestión pública, compliance, defensa anticorrupción y SPLAFT.",
            "services": services,
        }
    )


@app.get("/servicios/{slug}", response_class=HTMLResponse)
async def servicio_detalle(request: Request, slug: str):
    """Página de detalle de un servicio."""
    service = get_service_by_slug(slug)
    
    if not service:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    
    return templates.TemplateResponse(
        "pages/servicio-detalle.html",
        {
            "request": request,
            "title": f"{service.title} | Lexflex",
            "description": service.summary,
            "service": service,
            "other_services": [s for s in services if s.slug != slug][:3],
        }
    )


@app.get("/equipo", response_class=HTMLResponse)
async def equipo(request: Request):
    """Página del equipo."""
    return templates.TemplateResponse(
        "pages/equipo.html",
        {
            "request": request,
            "title": "Equipo | Lexflex",
            "description": "Profesionales especializados en derecho administrativo, civil, gestión pública, compliance y defensa especializada.",
            "professionals": professionals,
        }
    )


@app.get("/cursos", response_class=HTMLResponse)
async def cursos_page(request: Request):
    """Página de cursos."""
    return templates.TemplateResponse(
        "pages/cursos.html",
        {
            "request": request,
            "title": "Lexflex Formación | Cursos",
            "description": "Formación jurídica aplicada para profesionales, empresas y equipos públicos.",
            "courses": courses,
        }
    )


@app.get("/blog", response_class=HTMLResponse)
async def blog(request: Request):
    """Página de blog."""
    return templates.TemplateResponse(
        "pages/blog.html",
        {
            "request": request,
            "title": "Análisis Jurídico | Lexflex",
            "description": "Ideas y análisis útiles sobre temas jurídicos relevantes para personas, empresas y organizaciones públicas.",
            "articles": articles,
        }
    )


@app.get("/contacto", response_class=HTMLResponse)
async def contacto(request: Request):
    """Página de contacto."""
    return templates.TemplateResponse(
        "pages/contacto.html",
        {
            "request": request,
            "title": "Contacto | Lexflex",
            "description": f"Contacto directo con Lexflex: {contact.whatsapp_display} | {contact.email} | {contact.address}, {contact.district}",
        }
    )


@app.get("/favicon.ico")
async def favicon():
    """Redirigir favicon."""
    return RedirectResponse(url="/static/favicon.svg")


# API endpoints para el chat
from app.routers import chat

app.include_router(chat.router, prefix="/api", tags=["api"])


if __name__ == "__main__":
    import uvicorn
    import sys
    from pathlib import Path
    
    # Agregar el directorio raíz al path para que funcione desde cualquier ubicación
    root_dir = Path(__file__).parent.parent
    sys.path.insert(0, str(root_dir))
    
    print("🚀 Iniciando Lexflex...")
    print(f"🌐 Servidor: http://{settings.host}:{settings.port}")
    print("   Presiona Ctrl+C para detener\n")
    
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
