# 🌐 Guía: Conectar lexflexperu.com con PythonAnywhere

## 📌 Información del Proyecto

- **Dominio:** lexflexperu.com
- **Registrador:** Namecheap
- **Hosting:** PythonAnywhere
- **Proyecto:** Lexflex - Estudio Jurídico

## ⚠️ Requisitos Previos

1. **Cuenta PAID en PythonAnywhere** (las cuentas gratuitas no permiten dominios personalizados)
2. **Dominio lexflexperu.com registrado en Namecheap** (ya lo tienes ✅)
3. **Aplicación web desplegada en PythonAnywhere**

---

## 🎯 Configuración Específica para Lexflex

### Registros DNS en Namecheap (Resumen Visual)

Después de configurar, tus registros en Namecheap deben verse así:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME Record | www | webapp-XXXX.pythonanywhere.com | Automatic |
| URL Redirect | @ | https://www.lexflexperu.com | Automatic |

*Reemplaza XXXX con el número que te dio PythonAnywhere*

### URLs finales que deben funcionar:

✅ **URL principal:** https://www.lexflexperu.com
✅ **Redirecciones automáticas:**
- `http://lexflexperu.com` → `https://www.lexflexperu.com`
- `http://www.lexflexperu.com` → `https://www.lexflexperu.com`
- `https://lexflexperu.com` → `https://www.lexflexperu.com`

### Estructura de archivos en PythonAnywhere:

```
/home/username/
├── lexflex/
│   ├── main.py              (tu aplicación FastAPI)
│   ├── app/
│   │   ├── templates/
│   │   └── routers/
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── media/
│   └── requirements.txt
```

### Ejemplo de WSGI Configuration:

```python
import sys
import os

# Agregar el directorio del proyecto al path
project_home = '/home/username/lexflex'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Importar la aplicación FastAPI
from main import app as application

# Esto es para que PythonAnywhere pueda ejecutar tu app
```

---

## 📋 PASO 1: Configurar el dominio en PythonAnywhere

### 1.1 Crear o modificar la Web App

1. Inicia sesión en **PythonAnywhere**
2. Ve a la pestaña **"Web"**
3. **Si ya tienes una app creada:**
   - Haz clic en el **ícono del lápiz** junto al nombre de tu app
   - Cambia el nombre de `username.pythonanywhere.com` a `www.lexflexperu.com`
   - Guarda los cambios

4. **Si NO tienes una app todavía:**
   - Haz clic en **"Add a new web app"**
   - Ingresa el dominio: `www.lexflexperu.com` (con el www.)
   - Selecciona Python version (3.10 o superior recomendado)
   - Selecciona framework: **Manual configuration**
   - Configura tu aplicación FastAPI

### 1.2 Obtener el CNAME de PythonAnywhere

Después de configurar tu dominio, verás en la página "Web" un valor como:

```
webapp-XXXX.pythonanywhere.com
```

**📝 ANOTA ESTE VALOR** - Lo necesitarás para configurar Namecheap.

Ejemplo: `webapp-12345.pythonanywhere.com`

---

## 📋 PASO 2: Configurar DNS en Namecheap

### 2.1 Acceder a la configuración DNS de lexflexperu.com

1. Inicia sesión en **Namecheap.com**
2. Ve a **"Domain List"** (Lista de dominios)
3. Encuentra **lexflexperu.com** y haz clic en **"Manage"** (Administrar)
4. Ve a la pestaña **"Advanced DNS"**

### 2.2 Agregar el registro CNAME para www

1. En la sección **"Host Records"**, haz clic en **"Add New Record"**
2. Configura el registro CNAME:

```
Type:    CNAME Record
Host:    www
Value:   webapp-XXXX.pythonanywhere.com  ← (el valor que anotaste)
TTL:     Automatic (o 300)
```

**Ejemplo:**
- Type: `CNAME Record`
- Host: `www`
- Value: `webapp-12345.pythonanywhere.com`
- TTL: `Automatic`

3. Haz clic en **"Save All Changes"** (guardar)

### 2.3 Configurar redirección del dominio raíz (sin www)

Para que `lexflexperu.com` redirija a `www.lexflexperu.com`:

**OPCIÓN A: URL Redirect (Recomendado para Lexflex)**

1. Agrega un nuevo registro:
```
Type:         URL Redirect Record
Host:         @
Value:        https://www.lexflexperu.com
TTL:          Automatic
Redirect:     Unmasked (301 Permanent)
```

**OPCIÓN B: Registro A (Alternativa)**

Si prefieres usar registro A en lugar de redirect:

1. Agrega un registro A:
```
Type:    A Record
Host:    @
Value:   35.189.89.185  ← (IP de PythonAnywhere US)
TTL:     Automatic
```

**Nota:** La IP puede variar según la región:
- US East: `35.189.89.185`
- EU: Consulta en PythonAnywhere

2. También debes configurar el dominio raíz en PythonAnywhere:
   - En la pestaña Web, agrega otra webapp para `lexflexperu.com` (sin www)
   - Configúrala para redirigir a `www.lexflexperu.com`

---

## 📋 PASO 3: Esperar Propagación DNS

⏱️ **Tiempo de espera: 5 minutos a 48 horas** (normalmente 15-30 minutos)

### Verificar el estado:

1. **En PythonAnywhere:**
   - Ve a la pestaña "Web"
   - Si aún no funciona, verás una advertencia sobre el CNAME
   - Cuando funcione, la advertencia desaparecerá

2. **Herramienta online:**
   - Usa https://dnschecker.org
   - Ingresa `www.lexflexperu.com`
   - Selecciona tipo "CNAME"
   - Verifica que apunte a `webapp-XXXX.pythonanywhere.com`

3. **Comando en terminal (Windows PowerShell):**
```powershell
nslookup www.lexflexperu.com
```

---

## 📋 PASO 4: Configurar HTTPS/SSL (IMPORTANTE)

Una vez que el dominio esté funcionando:

### 4.1 Obtener certificado SSL gratuito

1. En PythonAnywhere, ve a la pestaña **"Web"**
2. Busca la sección **"Security"**
3. Haz clic en **"Enable HTTPS"** o **"Get Certificate"**
4. PythonAnywhere generará un certificado Let's Encrypt gratuito

### 4.2 Forzar HTTPS

1. En la misma página, activa la opción:
   - ☑️ **"Force HTTPS"**

Esto asegura que todas las visitas usen conexión segura (https://)

---

## 📋 PASO 5: Configurar la Aplicación en PythonAnywhere

### 5.1 Configurar archivos estáticos

En la pestaña "Web" de PythonAnywhere:

1. **Static files:**
```
URL:                    /static/
Directory:              /home/username/lexflex/static
```

2. **Media files (si los usas):**
```
URL:                    /media/
Directory:              /home/username/lexflex/media
```

### 5.2 Configurar WSGI

1. Haz clic en el enlace del archivo WSGI
2. Edita para que apunte a tu aplicación FastAPI/Flask

**Para FastAPI:**
```python
import sys
path = '/home/username/lexflex'
if path not in sys.path:
    sys.path.append(path)

from main import app as application
```

**Para Flask:**
```python
import sys
path = '/home/username/lexflex'
if path not in sys.path:
    sys.path.append(path)

from app import app as application
```

3. Guarda el archivo
4. Haz clic en el botón verde **"Reload"**

---

## ✅ Verificación Final

Después de completar todos los pasos, verifica:

- [ ] `https://www.lexflexperu.com` carga tu sitio Lexflex
- [ ] `http://www.lexflexperu.com` redirige a https automáticamente
- [ ] `https://lexflexperu.com` (sin www) redirige a www
- [ ] Los archivos estáticos (CSS/JS/imágenes) cargan correctamente
- [ ] El certificado SSL muestra el candado verde en el navegador
- [ ] El chatbot funciona correctamente
- [ ] El formulario de contacto funciona

---

## 🔧 Solución de Problemas Comunes

### Problema: "CNAME not found"
**Solución:** Espera más tiempo (hasta 48h) o verifica que escribiste correctamente el CNAME en Namecheap.

### Problema: "502 Bad Gateway"
**Solución:** 
- Verifica el archivo WSGI
- Revisa los logs en PythonAnywhere (pestaña "Web" → "Log files")
- Asegúrate de haber hecho "Reload" después de cambios

### Problema: "CSS/JS no cargan"
**Solución:**
- Verifica la configuración de Static Files
- Asegúrate de que las rutas sean absolutas en tu HTML (`/static/css/...`)
- Haz clic en "Reload" después de cambiar la configuración

### Problema: El dominio sin www no funciona
**Solución:**
- Revisa el URL Redirect Record en Namecheap
- O configura una segunda webapp en PythonAnywhere para el dominio raíz

---

## 📞 Contacto y Soporte

- **PythonAnywhere:** "Send feedback" en tu cuenta
- **Namecheap:** Chat en vivo en namecheap.com
- **Documentación oficial:** https://help.pythonanywhere.com/pages/CustomDomains

---

## 📝 Checklist Rápido para lexflexperu.com

```
Namecheap (Advanced DNS):
□ CNAME Record: www → webapp-XXXX.pythonanywhere.com
□ URL Redirect: @ → https://www.lexflexperu.com

PythonAnywhere:
□ Web app configurada con www.lexflexperu.com
□ WSGI file apuntando a tu app FastAPI
□ Static files configurados (/static/ → /home/username/lexflex/static)
□ SSL/HTTPS habilitado
□ Force HTTPS activado
□ Botón "Reload" presionado

Verificación:
□ DNS propagado (dnschecker.org para www.lexflexperu.com)
□ Sitio carga con https://www.lexflexperu.com
□ Redirecciones funcionan (lexflexperu.com → www.lexflexperu.com)
□ Certificado SSL válido (candado verde)
□ CSS y JavaScript cargan correctamente
□ Imágenes del equipo se muestran
□ Chatbot "Cuéntanos tu caso" funciona
```

---

**🎉 ¡Listo! Tu sitio Lexflex estará en línea con tu dominio personalizado.**
