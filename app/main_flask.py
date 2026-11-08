"""
Lexflex - Estudio Jurídico
Versión Flask (WSGI) para PythonAnywhere
"""
from flask import Flask, render_template, request, redirect, url_for, abort
from pathlib import Path

from app.config import settings
from app.data import (
    services, professionals, courses, articles, 
    contact, get_service_by_slug, whatsapp_link
)


# Crear aplicación Flask
app = Flask(
    __name__,
    template_folder='templates',
    static_folder='../static',
    static_url_path='/static'
)

# Configuración
app.config['SECRET_KEY'] = settings.secret_key if hasattr(settings, 'secret_key') else 'dev-secret-key'
app.config['DEBUG'] = settings.debug

# Agregar funciones globales a los templates
app.jinja_env.globals['whatsapp_link'] = whatsapp_link
app.jinja_env.globals['contact'] = contact
app.jinja_env.globals['services'] = services
app.jinja_env.globals['site_url'] = settings.site_url


@app.route('/')
def home():
    """Página de inicio."""
    return render_template(
        'pages/home.html',
        title="Estudio Jurídico en Huancayo",
        description="Estudio jurídico en Huancayo: derecho administrativo, contrataciones del Estado, civil, gestión pública, compliance, SPLAFT y defensa especializada.",
        services=services,
        professionals=professionals,
        courses=courses,
        articles=articles,
    )


@app.route('/nosotros')
def nosotros():
    """Página Nosotros."""
    return render_template(
        'pages/nosotros.html',
        title="Nosotros | Lexflex",
        description="Lexflex: estudio jurídico enfocado en estrategia, prevención de riesgos y acompañamiento técnico en asuntos complejos.",
    )


@app.route('/servicios')
def servicios_list():
    """Página de listado de servicios."""
    return render_template(
        'pages/servicios.html',
        title="Servicios Jurídicos | Lexflex",
        description="Áreas de práctica: derecho administrativo, contrataciones del Estado, civil, gestión pública, compliance, defensa anticorrupción y SPLAFT.",
        services=services,
    )


@app.route('/servicios/<slug>')
def servicio_detalle(slug):
    """Página de detalle de un servicio."""
    service = get_service_by_slug(slug)
    
    if not service:
        abort(404)
    
    return render_template(
        'pages/servicio-detalle.html',
        title=f"{service.title} | Lexflex",
        description=service.summary,
        service=service,
        other_services=[s for s in services if s.slug != slug][:3],
    )


@app.route('/equipo')
def equipo():
    """Página del equipo."""
    return render_template(
        'pages/equipo.html',
        title="Equipo | Lexflex",
        description="Profesionales especializados en derecho administrativo, civil, gestión pública, compliance y defensa especializada.",
        professionals=professionals,
    )


@app.route('/cursos')
def cursos_page():
    """Página de cursos."""
    return render_template(
        'pages/cursos.html',
        title="Lexflex Formación | Cursos",
        description="Formación jurídica aplicada para profesionales, empresas y equipos públicos.",
        courses=courses,
    )


@app.route('/blog')
def blog():
    """Página de blog."""
    return render_template(
        'pages/blog.html',
        title="Análisis Jurídico | Lexflex",
        description="Ideas y análisis útiles sobre temas jurídicos relevantes para personas, empresas y organizaciones públicas.",
        articles=articles,
    )


@app.route('/contacto')
def contacto_page():
    """Página de contacto."""
    return render_template(
        'pages/contacto.html',
        title="Contacto | Lexflex",
        description=f"Contacto directo con Lexflex: {contact.whatsapp_display} | {contact.email} | {contact.address}, {contact.district}",
    )


@app.route('/favicon.ico')
def favicon():
    """Redirigir favicon."""
    return redirect(url_for('static', filename='favicon.svg'))


# API endpoints para el chat
from app.routers import chat_flask

app.register_blueprint(chat_flask.bp, url_prefix='/api')


# Manejo de errores
@app.errorhandler(404)
def page_not_found(e):
    """Página 404."""
    return render_template('pages/404.html', title="Página no encontrada"), 404


@app.errorhandler(500)
def internal_error(e):
    """Error 500."""
    return render_template('pages/500.html', title="Error del servidor"), 500


if __name__ == '__main__':
    print("🚀 Iniciando Lexflex (Flask)...")
    print(f"🌐 Servidor: http://{settings.host}:{settings.port}")
    print("   Presiona Ctrl+C para detener\n")
    
    app.run(
        host=settings.host,
        port=settings.port,
        debug=settings.debug
    )
