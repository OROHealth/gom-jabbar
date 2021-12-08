import os

from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from flask import Flask, render_template
from flask.json import jsonify

from poutine_factory.model.recipe import RecipeSchema


def openapi_spec():
    return APISpec(
        title="Poutine Factory",
        version="1.0.0",
        openapi_version="3.0.2",
        plugins=[FlaskPlugin(), MarshmallowPlugin()],
    )


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
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

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    spec = openapi_spec()
    spec.components.schema("Recipe", schema=RecipeSchema)

    @app.route('/swagger-resources')
    def get_swagger_resources():
        print('sending docs')
        return jsonify(spec.to_dict())

    @app.route('/api/docs')
    def get_swagger_docs():
        print('sending docs')
        return render_template('swaggerui.html')

    return app
