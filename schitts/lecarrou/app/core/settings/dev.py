from .base import *

SITE_ID = 1
ENVIRONMENT = 'DEVELOPMENT'
SITE_DOMAINE = 'localhost:8000'
SITE_NAME = 'locahost'
STATIC_URL = '/static/'


STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
    os.path.join(BASE_DIR,'cafe/static'),
)