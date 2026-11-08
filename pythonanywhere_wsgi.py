# ============================================================================
# ESTE ARCHIVO DEBE COPIARSE A: /var/www/www_lexflexperu_com_wsgi.py
# EN PYTHONANYWHERE
# ============================================================================

import sys
import os

# Agregar virtualenv al path PRIMERO, antes de cualquier import
sys.path.insert(0, '/home/Diegocor423/lexflex/venv/lib/python3.10/site-packages')
sys.path.insert(0, '/home/Diegocor423/lexflex')

# Importar la aplicación Flask
from app.main_flask import app as application
