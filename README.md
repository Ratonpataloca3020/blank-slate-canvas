# Lexflex · Estudio Jurídico

Sitio web institucional desarrollado con **Python**, **FastAPI** y **Tailwind CSS**.

## 🎨 Versión 2.0 - Diseño Rojo

Esta versión incluye:
- ✅ Esquema de colores **ROJO** (reemplazando dorado)
- ✅ **Navegación mejorada** con scroll inteligente
- ✅ **Botón "Volver arriba"** flotante
- ✅ **Barra de progreso** de lectura
- ✅ **Header dinámico** (se oculta/muestra según scroll)
- ✅ **Accesibilidad** mejorada
- ✅ **Responsive** optimizado

## 🛠️ Stack Tecnológico

- **FastAPI** - Framework web moderno y de alto rendimiento
- **Jinja2** - Motor de templates HTML
- **Tailwind CSS** - Framework de estilos (esquema rojo)
- **Python 3.11+** - Lenguaje de programación
- **Uvicorn** - Servidor ASGI
- **OpenAI API** - Chat con IA (opcional)

## 📁 Estructura del Proyecto

```
blank-slate-canvas/
├── app/
│   ├── __init__.py
│   ├── main.py              # Aplicación FastAPI principal
│   ├── config.py            # Configuración
│   ├── data.py              # Datos del sitio
│   ├── routers/
│   │   └── chat.py          # API de chat
│   └── templates/
│       ├── base.html        # Template base
│       ├── components/      # Componentes reutilizables
│       └── pages/           # Páginas del sitio
├── static/
│   ├── css/
│   │   └── styles.css       # Estilos (rojo theme)
│   ├── js/
│   │   ├── reveal.js        # Animaciones
│   │   ├── header.js        # Header + back to top
│   │   └── navigation.js    # Navegación mejorada
│   ├── media/               # Imágenes
│   └── favicon.svg
├── public/                  # Recursos públicos (legacy)
├── requirements.txt         # Dependencias Python
├── pyproject.toml          # Configuración del proyecto
├── .env.example            # Variables de entorno ejemplo
└── README.md               # Este archivo
```

## 🚀 Instalación y Ejecución

### Método 1: Súper Fácil (Recomendado) 🎯

```powershell
python main.py
```

¡Eso es todo! 

### Método 2: Con uvicorn

```powershell
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

### Método 3: Script automático

```powershell
.\start.ps1
```

---

### Primera vez (instalar dependencias)

```powershell
pip install -r requirements.txt
```

### Configurar variables de entorno (primera vez)

```powershell
Copy-Item .env.example .env
```

Editar `.env` con tus configuraciones:

```env
APP_NAME=Lexflex
DEBUG=True
HOST=0.0.0.0
PORT=8080
SITE_URL=http://localhost:8080
OPENAI_API_KEY=tu_clave_api_aqui  # Opcional
```

Editar `.env` con tus configuraciones:

```env
APP_NAME=Lexflex
DEBUG=True
HOST=0.0.0.0
PORT=8080
SITE_URL=http://localhost:8080
OPENAI_API_KEY=tu_clave_api_aqui  # Opcional
```

Abrir en navegador: **http://localhost:8080** 🎉

## 📄 Rutas del Sitio

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/nosotros` | Información del estudio |
| `/servicios` | Catálogo de servicios |
| `/servicios/{slug}` | Detalle de servicio |
| `/equipo` | Perfiles de abogados |
| `/cursos` | Lexflex Formación |
| `/blog` | Análisis jurídico |
| `/contacto` | Información de contacto |
| `/api/chat` | API de chat con IA |

## 🎨 Características de Diseño v2.0

### Esquema de Colores Rojo
- **Primario**: #ff6b6b (Red 300)
- **Secundario**: #dc2626 (Red 500)
- **Oscuro**: #b91c1c (Red 600)
- **Acentos**: Gradientes rojos

### Navegación Mejorada
1. **Botón "Volver Arriba"** - Aparece tras 500px scroll
2. **Barra de Progreso** - Muestra % de página leída
3. **Header Inteligente** - Se oculta al bajar, reaparece al subir
4. **Smooth Scroll** - Navegación suave entre secciones
5. **Breadcrumbs** - Con iconos y hover states
6. **Menú Móvil** - Animaciones mejoradas

### Efectos Visuales
- ✨ Ripple effect en botones
- ✨ Animaciones 3D en cards
- ✨ Efectos de brillo (shimmer)
- ✨ Transiciones suaves
- ✨ Fade-in en scroll

### Accesibilidad
- ♿ Skip to content link
- ♿ Navegación por teclado (Alt+↑/↓)
- ♿ Focus indicators claros
- ♿ ARIA labels
- ♿ Soporte reduced motion

## ⌨️ Atajos de Teclado

- `Alt + ↑` - Ir arriba
- `Alt + ↓` - Ir abajo
- `Tab` - Navegar elementos
- `Enter` - Activar link/botón

## 📝 Editar Contenido

Los datos del sitio están en `app/data.py`:

```python
# Servicios
services: list[Service] = [...]

# Profesionales
professionals: list[Professional] = [...]

# Cursos
courses: list[Course] = [...]

# Contacto
contact = Contact()
```

## 🎨 Personalizar Colores

Editar `static/css/styles.css`:

```css
:root {
  --red-300: #ff6b6b;  /* Cambiar aquí */
  --red-400: #ee5a52;
  --red-500: #dc2626;
  --red-600: #b91c1c;
}
```

## 🌐 Despliegue en Producción

### Opción 1: Render / Railway

```bash
# Procfile
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Opción 2: VPS (Ubuntu)

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar con Gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8080
```

### Variables de Entorno Producción

```env
APP_ENV=production
DEBUG=False
SITE_URL=https://tu-dominio.com
```

## 📦 Dependencias Principales

- `fastapi` - Framework web
- `uvicorn` - Servidor ASGI
- `jinja2` - Templates
- `pydantic` - Validación
- `openai` - Chat IA (opcional)

## 🐛 Solución de Problemas

### Servidor no inicia
```bash
# Verificar Python
python --version  # Debe ser 3.11+

# Reinstalar dependencias
pip install -r requirements.txt --upgrade
```

### Puerto en uso
```bash
# Cambiar puerto
uvicorn app.main:app --reload --port 8081
```

### Imágenes no cargan
Verificar que existan en `static/media/`:
- `lexflex-logo.svg`
- `lexflex-hero-office.png`
- `diego-cordova-professional.png`
- `luis-cordova-professional.png`

## 📞 Contacto Lexflex

- **WhatsApp**: +51 955 068 382
- **Email**: diegocpoma@gmail.com
- **Dirección**: Jr. Parra del Riego N.° 338, 3.er piso, El Tambo, Huancayo

## 📜 Historial de Cambios

Ver `CHANGELOG.md` para el historial completo de cambios.

### v2.0.0 (Actual)
- ✅ Cambio de esquema dorado a rojo
- ✅ Navegación mejorada
- ✅ Botón volver arriba
- ✅ Barra de progreso
- ✅ Header dinámico
- ✅ Accesibilidad mejorada
- ✅ Efectos visuales modernos

### v1.0.0
- ✅ Migración de React a Python/FastAPI
- ✅ 8 páginas completas
- ✅ Diseño con Tailwind CSS (dorado)
- ✅ Chat con IA

## 📄 Licencia

Proyecto privado desarrollado para Lexflex Estudio Jurídico.

---

**Desarrollado con** ❤️ **usando Python, FastAPI y Tailwind CSS**  
**Versión**: 2.0.0 | **Color Theme**: Rojo 🔴
