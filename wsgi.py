"""
WSGI configuration for Lexflex (Flask version)
Para usar en PythonAnywhere
"""
import sys
import os

# Ruta del proyecto
project_home = '/home/Diegocor423/lexflex'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Importar la aplicación Flask
from app.main_flask import app as application

# Esto permite que PythonAnywhere ejecute la aplicación
if __name__ == "__main__":
    application.run()
