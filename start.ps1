# Script de inicio rápido para Lexflex
Write-Host "🚀 Iniciando Lexflex..." -ForegroundColor Cyan

# Verificar Python
Write-Host "✓ Verificando Python..." -ForegroundColor Green
python --version

# Instalar dependencias si es necesario
if (-not (Test-Path "venv")) {
    Write-Host "📦 Creando entorno virtual..." -ForegroundColor Yellow
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    pip install -r requirements.txt
} else {
    Write-Host "✓ Activando entorno virtual..." -ForegroundColor Green
    .\venv\Scripts\Activate.ps1
}

# Verificar .env
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Creando archivo .env desde .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "📝 Por favor edita el archivo .env con tus configuraciones" -ForegroundColor Cyan
}

# Iniciar servidor
Write-Host "`n🌐 Iniciando servidor en http://localhost:8080" -ForegroundColor Cyan
Write-Host "   Presiona Ctrl+C para detener`n" -ForegroundColor Gray

python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
