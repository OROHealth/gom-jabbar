import os

from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from flask import Flask, render_template
from flask.json import jsonify
from marshmallow import fields, Schema

from robot_maker.model.ingredient import IngredientSchema
from robot_maker.model.recipe import RecipeSchema
from robot_maker.model.robot import RobotSchema


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
    app.register_blueprint(robot_maker.bp)
    spec = robot_maker.spec
    register_openapi_paths(app, spec)

    @app.route('/swagger-resources')
    def get_swagger_resources():
        app.logger.info('Generating swagger resources')
        return jsonify(spec.to_dict())

    @app.route('/api/docs')
    def get_swagger_docs():
        app.logger.info('Rendering swagger ui')
        return render_template('swagger-ui.html')

    return app


def register_openapi_paths(app, spec):
    from . import robot_maker

    with app.test_request_context():
        spec.path(view=robot_maker.recipes,
                  parameters=[{"name": "recipe", "in": "path", "example": "poutine"},
                              {"name": "is_default", "in": "query", "example": True}],
                  operations=dict(
                      post=dict(
                          description="Create a Poutine with a default custom recipe",
                          requestBody={"content": {"application/json": {"schema": RecipeSchema}}},
                          responses={"200": {"content": {"application/json": {"schema": Schema.from_dict({
                              "success": fields.Bool(),
                              "message": fields.Str()
                          })}}}}
                      )
                  )) \
            .path(view=robot_maker.recipes,
                  parameters=[{"name": "recipe", "in": "path", "example": "poutine"},
                              {"name": "is_default", "in": "query", "example": True}],
                  operations=dict(
                      get=dict(
                          description="Get Poutine recipe",
                          responses={"200": {"content": {"application/json": {"schema": RecipeSchema}}}}
                      )
                  )) \
            .path(view=robot_maker.get_robots,
                  operations=dict(
                      get=dict(
                          responses={"200": {"content": {"application/json": {
                              "schema": {"type": "array", "items": RobotSchema}
                          }}}}
                      )
                  )) \
            .path(view=robot_maker.execute_robot_action,
                  parameters=[{"name": "robot", "in": "path", "example": "Outremona"}],
                  operations=dict(
                      get=dict(
                          responses={"200": {"content": {"application/json": {"schema": RobotSchema}}}}
                      )
                  )) \
            .path(view=robot_maker.execute_robot_action,
                  parameters=[{"name": "robot", "in": "path", "example": "Outremona"}],
                  operations=dict(
                      post=dict(
                          requestBody={"content": {"application/json": {
                              "schema": Schema.from_dict({
                                  "executed_actions": fields.Dict(fields.Str(), fields.Bool()),
                                  "actions_to_execute": fields.List(fields.Str()),
                                  "ingredients": fields.List(fields.Nested(IngredientSchema))
                              })
                          }}},
                          responses={"200": {"content": {"application/json": {
                              "schema": Schema.from_dict({
                                  "status": fields.Bool(),
                                  "message": fields.Str(),
                                  "messages": fields.List(fields.Str())})
                          }}}}
                      )
                  ))
