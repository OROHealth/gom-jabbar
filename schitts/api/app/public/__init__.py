# Lib imports
from flask import  Blueprint
from .views.globals import GlobalViews

# Init blueprint
public_blueprint = Blueprint('public_blueprint', __name__, url_prefix='/')

# Register views to blueprint
GlobalViews.register(public_blueprint)
