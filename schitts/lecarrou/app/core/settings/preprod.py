from .base import *

# Customise Static files variables (CSS, JavaScript, Images)

SITE_ID = 1
ENVIRONMENT = 'PRE-PRODUCTION'
SITE_DOMAINE = 'localhost:1340'
SITE_NAME = 'preproduction'
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")