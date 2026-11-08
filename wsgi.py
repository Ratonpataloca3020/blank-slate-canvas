"""
WSGI configuration for Lexflex (Flask version)
Para usar en PythonAnywhere
"""
import sys
import os

# Agregar virtualenv al path PRIMERO
sys.path.insert(0, '/home/Diegocor423/lexflex/venv/lib/python3.10/site-packages')
sys.path.insert(0, '/home/Diegocor423/lexflex')

# Importar la aplicación Flask
from app.main_flask import app as application

# Esto permite que PythonAnywhere ejecute la aplicación
if __name__ == "__main__":
    application.run()
