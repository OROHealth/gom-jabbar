import os

from flask import Flask
from flask_alembic import Alembic
from flask_caching import Cache
from flask_compress import Compress
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from werkzeug.middleware.proxy_fix import ProxyFix

from config import Base

db = SQLAlchemy(session_options={"expire_on_commit": True})
ma = Marshmallow()
alembic = Alembic()
cache = Cache()
compress = Compress()
migrate = Migrate()


def create_app():

    app = Flask(__name__)

    app.config.from_object(Base)
    app.wsgi_app = ProxyFix(app.wsgi_app)

    CORS(app, resources={r"/*": {
        "origins": os.environ.get("ALLOWED_DOMAINS").split(',')
    }}, supports_credentials=True)

    # Init SQLAlchemy.
    with app.app_context():
        db.init_app(app)

    # Init Marshmallow.
    with app.app_context():
        ma.init_app(app)

    # Init flask compress
    with app.app_context():
        compress.init_app(app)

    # Init flask caching
    with app.app_context():
        cache.init_app(app)

    # Alembic
    with app.app_context():
        alembic.init_app(app)

    # Flask migrate
    with app.app_context():
        migrate.init_app(app, db)

    from .v1 import v1
    app.register_blueprint(v1)

    from .public import public_blueprint
    app.register_blueprint(public_blueprint)

    @app.errorhandler(404)
    def not_found(error):
        return {"message": str(error)}, 404

    @app.errorhandler(502)
    def not_found(error):
        return {"message": str(error)}, 502

    @app.errorhandler(500)
    def not_found(error):
        return {"message": str(error)}, 500

    return app
