# ============================================================================
# ESTE ARCHIVO DEBE COPIARSE A: /var/www/www_lexflexperu_com_wsgi.py
# EN PYTHONANYWHERE
# ============================================================================

import sys
import os

# Activar el virtualenv
virtualenv = '/home/Diegocor423/lexflex/venv/bin/python'
if virtualenv not in sys.executable:
    os.environ['VIRTUAL_ENV'] = '/home/Diegocor423/lexflex/venv'
    sys.prefix = '/home/Diegocor423/lexflex/venv'
    sys.executable = virtualenv

# Añadir el proyecto al path
project_home = '/home/Diegocor423/lexflex'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Importar la aplicación Flask
from app.main_flask import app as application
