# 🚀 Cómo Ejecutar Lexflex

## ⚡ Forma MÁS FÁCIL (Recomendada)

```powershell
python main.py
```

**¡Eso es todo!** 🎉

Luego abre tu navegador en: **http://localhost:8080**

---

## 📋 Otras Formas de Ejecutar

### Opción 1: Desde app/main.py
```powershell
python app/main.py
```

### Opción 2: Con uvicorn
```powershell
python -m uvicorn app.main:app --reload
```

### Opción 3: Script automático
```powershell
.\start.ps1
```

---

## 🔧 Primera Vez (Configuración Inicial)

### 1. Instalar dependencias
```powershell
pip install -r requirements.txt
```

### 2. Crear archivo de configuración
```powershell
Copy-Item .env.example .env
```

### 3. (Opcional) Editar .env
```env
OPENAI_API_KEY=tu_clave_aqui  # Para el chat con IA
```

---

## 🌐 URLs

Una vez iniciado el servidor:

- **Inicio**: http://localhost:8080/
- **Nosotros**: http://localhost:8080/nosotros
- **Servicios**: http://localhost:8080/servicios
- **Equipo**: http://localhost:8080/equipo
- **Cursos**: http://localhost:8080/cursos
- **Blog**: http://localhost:8080/blog
- **Contacto**: http://localhost:8080/contacto

---

## 🛑 Detener el Servidor

Presiona **Ctrl + C** en la terminal

---

## 🎨 Características v2.0

- 🔴 **Tema Rojo** (nuevo diseño)
- 🔼 **Botón "Volver Arriba"** flotante
- 📊 **Barra de Progreso** de lectura
- 🎯 **Header Inteligente** (se oculta/muestra)
- ✨ **Efectos Visuales** (ripple, animaciones 3D)
- ♿ **Accesibilidad** mejorada
- 📱 **100% Responsive**

---

## ⚡ Resumen Ultra Rápido

```powershell
# 1. Ir a la carpeta
cd D:\Lexflex\blank-slate-canvas

# 2. Primera vez: instalar
pip install -r requirements.txt

# 3. Ejecutar
python main.py

# 4. Abrir navegador
# http://localhost:8080
```

---

## 🐛 Problemas Comunes

### "No module named 'app'"
**Solución**: Asegúrate de estar en el directorio correcto
```powershell
cd D:\Lexflex\blank-slate-canvas
python main.py
```

### "Port already in use"
**Solución**: Detén el proceso anterior o usa otro puerto
```powershell
# Detener proceso en puerto 8080
netstat -ano | findstr :8080
# Luego matar el proceso con el PID mostrado
taskkill /PID [número] /F
```

### "pip no reconocido"
**Solución**: Instala Python o usa python -m pip
```powershell
python -m pip install -r requirements.txt
```

---

## ✅ Verificación

Cuando el servidor esté corriendo, verás:

```
🚀 Iniciando Lexflex v2.0 (Tema Rojo)...
🌐 Servidor: http://0.0.0.0:8080
📝 Modo: Desarrollo
   Presiona Ctrl+C para detener

INFO:     Uvicorn running on http://0.0.0.0:8080
INFO:     Application startup complete.
```

**¡Listo!** 🎉 Abre http://localhost:8080

---

## 📞 Contacto

¿Problemas? Contacta al equipo de Lexflex:
- **WhatsApp**: +51 955 068 382
- **Email**: diegocpoma@gmail.com
