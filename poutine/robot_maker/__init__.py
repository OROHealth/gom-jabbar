import os

from flask import Flask
from werkzeug.exceptions import HTTPException

from robot_maker.db import db_session
from robot_maker.models.ingredient import IngredientSchema
from robot_maker.models.recipe import RecipeSchema
from robot_maker.models.robot import RobotSchema


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'robot_maker.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    from . import robot_maker
    app.register_blueprint(robot_maker.bp)

    from . import openapi
    app.register_blueprint(openapi.bp)
    openapi.register_app_paths(app)

    from . import exceptions
    app.register_error_handler(Exception, exceptions.handle_exception)
    app.register_error_handler(HTTPException, exceptions.handle_http_exception)

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db_session.remove()

    return app
