import os

from flask import Flask

from robot_maker.model.ingredient import IngredientSchema
from robot_maker.model.recipe import RecipeSchema
from robot_maker.model.robot import RobotSchema


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

    from . import robot_maker
    from . import openapi
    app.register_blueprint(robot_maker.bp)
    app.register_blueprint(openapi.bp)

    openapi.register_app_paths(app)

    return app

