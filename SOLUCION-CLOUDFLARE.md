# 🔧 Solución: "Invalid nameservers" en Cloudflare

## ❌ Problema Actual

Tu dominio `lexflexperu.com` en Cloudflare muestra:
```
⚠️ Invalid nameservers
```

## 🎯 Causa

Los **nameservers** de tu dominio no están apuntando a Cloudflare. Están apuntando a otro lugar (probablemente el registrador original).

## ✅ Solución en 3 Pasos

### Paso 1: Obtener los Nameservers de Cloudflare

1. **Ve a Cloudflare Dashboard**: https://dash.cloudflare.com/
2. **Click en tu dominio**: `lexflexperu.com`
3. **Click en "Overview"** (resumen)
4. Busca una sección que diga **"Nameservers"** o **"Change your nameservers"**

Verás algo como:
```
andrea.ns.cloudflare.com
mark.ns.cloudflare.com
```

O puede ser:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

**📋 Anota estos 2 nameservers** (los necesitarás en el siguiente paso)

---

### Paso 2: Cambiar Nameservers en tu Registrador

**¿Dónde compraste el dominio lexflexperu.com?**

Opciones comunes:
- GoDaddy
- Namecheap
- Google Domains
- DonWeb
- NIC.pe (si es .pe)
- Hostinger
- Otro registrador

#### A. Si compraste en **GoDaddy**:

1. Login en: https://account.godaddy.com/
2. **My Products** → **Domains**
3. Click en `lexflexperu.com`
4. Scroll hasta **Nameservers**
5. Click **Change**
6. Selecciona **Custom nameservers**
7. Pega los 2 nameservers de Cloudflare:
   ```
   andrea.ns.cloudflare.com
   mark.ns.cloudflare.com
   ```
8. **Save**

#### B. Si compraste en **Namecheap**:

1. Login: https://www.namecheap.com/
2. **Domain List** → Click en `lexflexperu.com`
3. **Nameservers** → Dropdown: **Custom DNS**
4. Pega los nameservers de Cloudflare
5. Click ✓ (check)

#### C. Si compraste en **NIC.pe** (dominio .pe):

1. Login: https://www.nic.pe/
2. Panel de control → Mis dominios
3. `lexflexperu.com` → Configuración DNS
4. Cambiar nameservers a los de Cloudflare
5. Guardar cambios

#### D. Si compraste en **DonWeb**:

1. Login: https://www.donweb.com/
2. Panel de control → Dominios
3. `lexflexperu.com` → Administrar DNS
4. Nameservers personalizados
5. Pegar nameservers de Cloudflare
6. Aplicar cambios

#### E. Si no recuerdas dónde lo compraste:

**Verificar registrador actual:**
```
1. Ve a: https://who.is/
2. Busca: lexflexperu.com
3. Verás "Registrar" - ahí está el nombre
```

---

### Paso 3: Esperar Propagación

⏱️ **Tiempo de espera**: 5 minutos a 48 horas (usualmente 1-2 horas)

**Verificar si ya funcionó**:

1. Ve a Cloudflare Dashboard
2. Revisa si el mensaje "Invalid nameservers" desapareció
3. O verifica en: https://www.whatsmydns.net/#NS/lexflexperu.com

---

## 🚀 Después de Solucionar Nameservers

### Una vez que Cloudflare esté activo:

#### 1. Subir tu aplicación a Railway/Render

**Railway (Recomendado)**:
1. https://railway.app/
2. Login con GitHub
3. New Project → Deploy from GitHub
4. Selecciona tu repositorio
5. Railway te dará una URL: `https://lexflex-xxxx.up.railway.app`

#### 2. Configurar dominio en Railway

1. Settings → Domains
2. Add Custom Domain
3. Escribe: `lexflexperu.com`
4. Railway te dará instrucciones

#### 3. Agregar registros DNS en Cloudflare

Ve a Cloudflare → DNS → Records:

**Registro 1** (dominio principal):
```
Type: CNAME
Name: @
Target: tu-app.up.railway.app
Proxy status: OFF (nube gris) inicialmente
TTL: Auto
```

**Registro 2** (www):
```
Type: CNAME
Name: www
Target: tu-app.up.railway.app
Proxy status: OFF (nube gris)
TTL: Auto
```

#### 4. Esperar (15-60 minutos)

Luego visita:
- https://lexflexperu.com
- https://www.lexflexperu.com

---

## 📋 Checklist

- [ ] Obtuve los nameservers de Cloudflare
- [ ] Identifiqué dónde compré el dominio
- [ ] Cambié los nameservers en el registrador
- [ ] Esperé la propagación (1-2 horas mínimo)
- [ ] Cloudflare muestra el dominio como activo
- [ ] Subí la aplicación a Railway/Render
- [ ] Obtuve la URL del hosting
- [ ] Configuré registros DNS en Cloudflare
- [ ] ¡Sitio funcionando! 🎉

---

## 🆘 ¿Aún con problemas?

### Opción A: Usar subdominio mientras tanto

Mientras esperas que los nameservers se propaguen:

1. En Cloudflare, agrega un subdominio:
   ```
   Type: CNAME
   Name: app
   Target: tu-railway-url.up.railway.app
   ```

2. Accede temporalmente via: `https://app.lexflexperu.com`

### Opción B: Usar dominio temporal de Railway

Railway te da una URL gratis:
```
https://lexflex-production-xxxx.up.railway.app
```

Úsala mientras configuras el dominio personalizado.

---

## 📞 Contacto

Si necesitas ayuda específica con tu registrador o Cloudflare, puedo ayudarte con capturas de pantalla o pasos más detallados.

**Lo más importante**: 
1. ✅ Cambiar nameservers en el registrador
2. ✅ Esperar 1-2 horas
3. ✅ Verificar que Cloudflare esté activo
4. ✅ Luego configurar Railway + DNS

---

## 🎯 Resumen Ultra Rápido

```
PROBLEMA: Invalid nameservers
   ↓
PASO 1: Ver nameservers en Cloudflare Overview
   ↓
PASO 2: Ir al registrador del dominio
   ↓
PASO 3: Cambiar nameservers a los de Cloudflare
   ↓
PASO 4: Esperar 1-2 horas
   ↓
✅ SOLUCIONADO
```

**Luego**: Deploy en Railway + Configurar DNS = ¡Sitio en vivo! 🚀
