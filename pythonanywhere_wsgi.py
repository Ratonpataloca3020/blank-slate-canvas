# ============================================================================
# ESTE ARCHIVO DEBE COPIARSE A: /var/www/www_lexflexperu_com_wsgi.py
# EN PYTHONANYWHERE
# ============================================================================

import sys
import os

# Configurar el path del virtualenv PRIMERO, antes de cualquier import
VENV_PATH = '/home/Diegocor423/lexflex/venv'
SITE_PACKAGES = f'{VENV_PATH}/lib/python3.10/site-packages'
PROJECT_PATH = '/home/Diegocor423/lexflex'

# Limpiar cualquier path anterior
sys.path = [p for p in sys.path if 'site-packages' not in p or p.startswith(SITE_PACKAGES)]

# Agregar PRIMERO el venv site-packages
if SITE_PACKAGES not in sys.path:
    sys.path.insert(0, SITE_PACKAGES)

# Luego el proyecto
if PROJECT_PATH not in sys.path:
    sys.path.insert(0, PROJECT_PATH)

# Configurar variables de entorno
os.environ['VIRTUAL_ENV'] = VENV_PATH
os.environ['PATH'] = f'{VENV_PATH}/bin:' + os.environ.get('PATH', '')

# Ahora importar Flask
from app.main_flask import app as application
