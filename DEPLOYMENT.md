# 🚀 Guía de Deployment - Lexflex

## 🌐 Opciones de Hosting para Python/FastAPI

### ⭐ Opción 1: Railway (Recomendado - Más Fácil)

**Ventajas**: Gratis, fácil, soporte Python nativo, SSL automático

#### Pasos:

1. **Crear cuenta en Railway**
   - Ve a: https://railway.app/
   - Regístrate con GitHub

2. **Conectar repositorio**
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Autoriza Railway y selecciona tu repositorio

3. **Configurar variables de entorno**
   - En el dashboard de Railway, ve a "Variables"
   - Agrega:
     ```
     PORT=8080
     PYTHON_VERSION=3.11
     SITE_URL=https://tu-app.railway.app
     OPENAI_API_KEY=tu_clave (opcional)
     ```

4. **Deploy automático**
   - Railway detecta Python automáticamente
   - Usa el `Procfile` para iniciar
   - Obtienes URL: `https://tu-app.railway.app`

5. **Conectar dominio personalizado**
   - En Railway Settings → Domains
   - Add custom domain: `lexflexperu.com`
   - Copia los registros DNS que te dan
   - Ve a Cloudflare DNS y agrégalos

---

### ⭐ Opción 2: Render (Alternativa Fácil)

**Ventajas**: Gratis, SSL automático, fácil configuración

#### Pasos:

1. **Crear cuenta**: https://render.com/
2. **New Web Service** → Connect GitHub
3. **Configuración**:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Environment: Python 3
4. **Variables de entorno**:
   ```
   PYTHON_VERSION=3.11.9
   SITE_URL=https://tu-app.onrender.com
   ```
5. **Deploy** → Obtienes URL automáticamente

---

### ⭐ Opción 3: PythonAnywhere (Hosting Python Dedicado)

**Ventajas**: Especializado en Python, configuración manual

#### Pasos:

1. Cuenta en: https://www.pythonanywhere.com/
2. Subir archivos vía FTP o Git
3. Configurar WSGI
4. Conectar dominio

---

### ⭐ Opción 4: DigitalOcean App Platform

**Ventajas**: Profesional, escalable

#### Precio: $5/mes mínimo

1. Cuenta: https://www.digitalocean.com/
2. App Platform → Create App
3. Conectar GitHub
4. Deploy automático

---

### ⭐ Opción 5: Heroku

**Nota**: Ya no tiene plan gratis

1. Cuenta: https://heroku.com/
2. Install Heroku CLI
3. Comandos:
   ```bash
   heroku login
   heroku create lexflex-peru
   git push heroku main
   ```

---

## 🔧 Configurar Cloudflare para cualquier opción

### Problema Actual: "Invalid nameservers"

**Solución**:

1. **En Cloudflare**:
   - Ve a tu dominio `lexflexperu.com`
   - Click en "Overview"
   - Busca los **Cloudflare Nameservers** (algo como):
     ```
     andrea.ns.cloudflare.com
     mark.ns.cloudflare.com
     ```

2. **En tu registrador de dominios** (donde compraste lexflexperu.com):
   - Ve a configuración DNS
   - Cambia los nameservers a los de Cloudflare
   - Espera 24-48 horas para propagación

3. **Una vez activo en Cloudflare**:
   
   **Para Railway/Render (con SSL):**
   ```
   Tipo: CNAME
   Nombre: @
   Contenido: tu-app.railway.app (o .onrender.com)
   Proxy: Desactivado (nube gris)
   ```
   
   **Para www:**
   ```
   Tipo: CNAME
   Nombre: www
   Contenido: tu-app.railway.app
   Proxy: Desactivado
   ```

---

## 📝 Guía Paso a Paso Recomendada

### Railway (Opción más fácil y recomendada)

#### 1. Preparar el código (ya está listo ✅)

Archivos ya creados:
- ✅ `Procfile` - Para iniciar el servidor
- ✅ `requirements.txt` - Dependencias
- ✅ `runtime.txt` - Versión de Python

#### 2. Subir a GitHub

```bash
# En tu proyecto
git init
git add .
git commit -m "Initial commit - Lexflex v2.0"

# Crear repo en GitHub y conectar
git remote add origin https://github.com/tu-usuario/lexflex.git
git push -u origin main
```

#### 3. Railway Setup

1. **Ir a Railway**: https://railway.app/
2. **Login con GitHub**
3. **New Project** → **Deploy from GitHub**
4. **Seleccionar repositorio**: lexflex
5. **Variables de entorno** (Add):
   ```
   SITE_URL=https://lexflexperu.com
   DEBUG=False
   APP_ENV=production
   ```
6. **Deploy** automático

#### 4. Obtener URL de Railway

Railway te dará una URL como:
```
https://lexflex-production-xxxx.up.railway.app
```

#### 5. Configurar dominio en Railway

1. Settings → Domains
2. Custom Domain: `lexflexperu.com`
3. Te dará instrucciones DNS

#### 6. Configurar DNS en Cloudflare

**Primero solucionar nameservers:**

Ve al registrador donde compraste el dominio y configura estos nameservers de Cloudflare:
```
andrea.ns.cloudflare.com
mark.ns.cloudflare.com
```
(Los tuyos específicos están en Cloudflare Overview)

**Luego agregar registros:**

En Cloudflare DNS:
```
Tipo: CNAME
Nombre: @
Contenido: [tu-url-railway].up.railway.app
Proxy: OFF (nube gris) para configuración inicial

Tipo: CNAME  
Nombre: www
Contenido: [tu-url-railway].up.railway.app
Proxy: OFF
```

#### 7. Esperar propagación (15-60 minutos)

---

## 🔐 Variables de Entorno Producción

```env
# En Railway/Render/etc
APP_ENV=production
DEBUG=False
HOST=0.0.0.0
PORT=8080
SITE_URL=https://lexflexperu.com
OPENAI_API_KEY=tu_clave_real  # Si usas chat
```

---

## ✅ Checklist Pre-Deploy

- [x] `Procfile` creado
- [x] `requirements.txt` actualizado
- [x] `runtime.txt` especifica Python 3.11
- [x] Variables de entorno configuradas
- [ ] Código en GitHub
- [ ] Servicio de hosting elegido (Railway recomendado)
- [ ] Dominio configurado en Cloudflare
- [ ] Nameservers actualizados en registrador

---

## 🐛 Troubleshooting

### "Invalid nameservers" en Cloudflare

**Causa**: Los nameservers del dominio no apuntan a Cloudflare

**Solución**:
1. Ve al registrador donde compraste lexflexperu.com
2. Busca la sección DNS/Nameservers
3. Cambia a los nameservers de Cloudflare
4. Espera 24-48h para propagación

### App no carga después de deploy

**Verificar**:
1. Logs del hosting (Railway/Render)
2. Variable `PORT` está configurada
3. `HOST=0.0.0.0` en producción
4. Todas las dependencias en `requirements.txt`

### Error 502 Bad Gateway

**Causa**: App no está corriendo o puerto incorrecto

**Solución**:
- Verifica que el `Procfile` sea correcto
- Revisa logs del servidor
- Asegúrate que `PORT` variable esté configurada

---

## 📞 Soporte

¿Necesitas ayuda con el deploy?

**Documentación útil**:
- Railway: https://docs.railway.app/
- Render: https://render.com/docs
- Cloudflare: https://developers.cloudflare.com/

---

## 🎉 Resumen Rápido

1. **Railway** (más fácil):
   - Conecta GitHub
   - Auto-deploy
   - Configura dominio
   - Listo! ✅

2. **Cloudflare**:
   - Primero: arreglar nameservers en tu registrador
   - Luego: agregar registros CNAME
   - Esperar propagación

3. **¡Sitio en vivo!** 🚀
   https://lexflexperu.com
