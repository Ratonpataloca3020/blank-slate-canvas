# 🔄 Migración de FastAPI (ASGI) a Flask (WSGI)

## ✅ ¿Por qué Flask?

Flask es un framework WSGI nativo que funciona perfectamente con PythonAnywhere sin necesidad de adaptadores. Esto elimina los problemas que teníamos con FastAPI (ASGI).

---

## 📋 Pasos para desplegar en PythonAnywhere

### PASO 1: Actualizar el código en PythonAnywhere

En la consola Bash de PythonAnywhere:

```bash
cd ~/lexflex
source venv/bin/activate

# Actualizar el repositorio
git pull origin main

# Instalar las nuevas dependencias de Flask
pip install -r requirements-flask.txt
```

### PASO 2: Actualizar el archivo WSGI en PythonAnywhere

1. Ve a la pestaña **"Web"** en PythonAnywhere
2. Haz clic en el archivo WSGI: `/var/www/www_lexflexperu_com_wsgi.py`
3. **Reemplaza TODO el contenido** con:

```python
"""
WSGI configuration for Lexflex (Flask version)
"""
import sys
import os

# Ruta del proyecto
project_home = '/home/Diegocor423/lexflex'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Importar la aplicación Flask
from app.main_flask import app as application
```

4. **Guarda** el archivo

### PASO 3: Verificar configuración

En la pestaña "Web", verifica que esté configurado:

- **Virtualenv**: `/home/Diegocor423/lexflex/venv` ✓
- **Python version**: 3.10 ✓
- **Static files**:
  - URL: `/static/`
  - Directory: `/home/Diegocor423/lexflex/static`

### PASO 4: Reload

1. Haz clic en el botón verde: **"Reload www.lexflexperu.com"**
2. Espera 10 segundos
3. Accede a: **http://www.lexflexperu.com**

---

## 🎉 ¡Debería funcionar!

Flask es WSGI nativo, por lo que no necesita adaptadores y el virtualenv se cargará correctamente.

---

## 🔧 Si hay errores

Revisa el error log en:
- `/var/log/www.lexflexperu.com.error.log`

Los errores comunes serían:
1. **ImportError**: Verifica que instalaste `requirements-flask.txt`
2. **Template not found**: Verifica la ruta de templates en main_flask.py
3. **Static files not loading**: Verifica la configuración de Static files

---

## 🚀 Ventajas de Flask vs FastAPI para este proyecto

| Aspecto | FastAPI (ASGI) | Flask (WSGI) |
|---------|----------------|--------------|
| **Compatibilidad PythonAnywhere** | ❌ Necesita adaptadores | ✅ Nativo |
| **Velocidad** | Más rápido (async) | Suficiente para este proyecto |
| **Complejidad** | Más complejo | Más simple |
| **Templates Jinja2** | ✅ Soportado | ✅ Nativo |
| **Documentación** | Extensa | Extensa |

Para un sitio web como Lexflex (sin necesidad de async masivo), Flask es perfecto y más confiable en PythonAnywhere.

---

## 📝 Cambios realizados

### Archivos nuevos:
- `app/main_flask.py` - Aplicación Flask principal
- `app/routers/chat_flask.py` - Router de chat para Flask
- `requirements-flask.txt` - Dependencias Flask
- `wsgi.py` - Archivo WSGI para producción

### Archivos sin cambios:
- `app/templates/` - Los templates Jinja2 funcionan igual
- `app/data.py` - Los datos no cambian
- `app/config.py` - La configuración es la misma
- `static/` - Archivos estáticos sin cambios

### Diferencias principales:

**FastAPI (antes):**
```python
@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("pages/home.html", {...})
```

**Flask (ahora):**
```python
@app.route('/')
def home():
    return render_template('pages/home.html', ...)
```

---

## ✅ Checklist de despliegue

```
□ Git pull en PythonAnywhere
□ Instalar requirements-flask.txt
□ Actualizar archivo WSGI
□ Verificar Virtualenv configurado
□ Verificar Static files configurados
□ Hacer Reload
□ Probar www.lexflexperu.com
□ Configurar SSL/HTTPS (después de que funcione)
```

---

¡Listo! Con Flask debería funcionar sin problemas en PythonAnywhere.
