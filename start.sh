#!/bin/bash
# Script de inicio rápido para Lexflex (Linux/Mac)

echo "🚀 Iniciando Lexflex..."

# Verificar Python
echo "✓ Verificando Python..."
python3 --version

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
    echo "📦 Creando entorno virtual..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    echo "✓ Activando entorno virtual..."
    source venv/bin/activate
fi

# Verificar .env
if [ ! -f ".env" ]; then
    echo "⚠️  Creando archivo .env desde .env.example..."
    cp .env.example .env
    echo "📝 Por favor edita el archivo .env con tus configuraciones"
fi

# Iniciar servidor
echo ""
echo "🌐 Iniciando servidor en http://localhost:8080"
echo "   Presiona Ctrl+C para detener"
echo ""

python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
