import os

from flask import Blueprint
from flask_restx import Api, apidoc

# Init Blueprint
v1 = Blueprint("api_v1", __name__, url_prefix="/v1/")

# Namespaces
from app.v1.namespaces.migrations import migration_ns
from app.v1.namespaces.customers import customers_ns
from app.v1.namespaces.menu_items import menu_items_ns


# Init api.
api = Api(
    v1,
    title=os.environ.get("APP_REST_TITLE"),
    description=os.environ.get("APP_REST_DESCRIPTION"),
    version=os.environ.get("APP_REST_VERSION"),
    doc=os.environ.get("APP_REST_DOCS_PATH"),
    base_url=os.environ.get("APP_REST_BASE_URL"),
    default=os.environ.get("APP_REST_DEFAULT_NAMESPACE"),
    default_label=os.environ.get("APP_REST_DEFAULT_LABEL"),
)


@api.documentation
def swagger_ui():
    return apidoc.ui_for(api)


# Registering namespaces to the api.
api.add_namespace(migration_ns)
api.add_namespace(customers_ns)
api.add_namespace(menu_items_ns)
