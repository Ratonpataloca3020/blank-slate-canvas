# 🚀 Inicio Rápido - Lexflex

## ⚡ Método 1: Script Automático (Recomendado)

### Windows (PowerShell)
```powershell
.\start.ps1
```

### Linux/Mac (Bash)
```bash
chmod +x start.sh
./start.sh
```

## 📝 Método 2: Manual

### 1. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 2. Configurar entorno (primera vez)
```bash
# Windows
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

### 3. Iniciar servidor
```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

### 4. Abrir navegador
**http://localhost:8080**

---

## 🎨 Características v2.0

### Diseño Rojo
- ✅ Esquema de colores moderno
- ✅ Gradientes rojos
- ✅ Sombras dinámicas

### Navegación Mejorada
- ✅ Botón "Volver arriba" flotante
- ✅ Barra de progreso de lectura
- ✅ Header inteligente (oculta/muestra)
- ✅ Smooth scroll
- ✅ Breadcrumbs con iconos

### Efectos Visuales
- ✅ Ripple effect en botones
- ✅ Animaciones 3D en cards
- ✅ Transiciones suaves
- ✅ Fade-in on scroll

### Accesibilidad
- ✅ Navegación por teclado (Alt+↑/↓)
- ✅ Skip to content
- ✅ Focus indicators claros
- ✅ ARIA labels

---

## 🌐 URLs del Sitio

| Página | URL |
|--------|-----|
| Inicio | http://localhost:8080/ |
| Nosotros | http://localhost:8080/nosotros |
| Servicios | http://localhost:8080/servicios |
| Equipo | http://localhost:8080/equipo |
| Cursos | http://localhost:8080/cursos |
| Blog | http://localhost:8080/blog |
| Contacto | http://localhost:8080/contacto |

---

## ⌨️ Atajos de Teclado

- `Alt + ↑` → Ir arriba
- `Alt + ↓` → Ir abajo  
- `Tab` → Navegar elementos
- `Enter` → Activar elemento

---

## 📝 Editar Contenido

Edita `app/data.py` para cambiar:
- ✏️ Servicios jurídicos
- ✏️ Información de profesionales
- ✏️ Cursos
- ✏️ Artículos
- ✏️ Datos de contacto

---

## 🎨 Cambiar Colores

Edita `static/css/styles.css`:

```css
:root {
  --red-300: #ff6b6b;  /* Cambiar aquí */
  --red-400: #ee5a52;
  --red-500: #dc2626;
  --red-600: #b91c1c;
}
```

---

## 🐛 Problemas Comunes

### Puerto en uso
```bash
# Usar otro puerto
python -m uvicorn app.main:app --reload --port 8081
```

### Módulo no encontrado
```bash
# Reinstalar dependencias
pip install -r requirements.txt --upgrade
```

### Imágenes no cargan
Verifica que existan en `static/media/`:
- lexflex-logo.svg
- lexflex-hero-office.png
- diego-cordova-professional.png
- luis-cordova-professional.png

---

## 📞 Soporte

**WhatsApp**: +51 955 068 382  
**Email**: diegocpoma@gmail.com

---

**¡Listo para usar!** 🎉
