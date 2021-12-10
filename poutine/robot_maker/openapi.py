from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from flask import Blueprint, current_app, jsonify, render_template
from marshmallow import fields, Schema

from . import robot_maker, RecipeSchema, RobotSchema, IngredientSchema

spec = APISpec(
    title="Poutine Factory",
    version="1.0.0",
    openapi_version="3.0.2",
    plugins=[FlaskPlugin(), MarshmallowPlugin()],
)

bp = Blueprint('openapi', __name__, url_prefix="/swagger")


@bp.route('/resources')
def get_swagger_resources():
    current_app.logger.info('Generating swagger resources')
    return jsonify(spec.to_dict())


@bp.route('/swagger-ui')
def get_swagger_docs():
    current_app.logger.info('Rendering swagger ui')
    return render_template('swagger-ui.html')


def register_app_paths(app):
    with app.test_request_context():
        spec.path(view=robot_maker.recipes,
                  parameters=[{"name": "recipe", "in": "path", "example": "Poutine"},
                              {"name": "is_default", "in": "query", "example": True}],
                  operations=dict(
                      post=dict(
                          description="Create a Poutine with a default custom recipe",
                          requestBody={"content": {"application/json": {"schema": RecipeSchema}}},
                          responses={"200": {"content": {"application/json": {"schema": Schema.from_dict({
                              "success": fields.Bool(),
                              "message": fields.Str(),
                              "log": fields.Dict()
                          })}}}}
                      )
                  )) \
            .path(view=robot_maker.recipes,
                  parameters=[{"name": "recipe", "in": "path", "example": "Poutine"},
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
                                  "log": fields.List(fields.Str())})
                          }}}}
                      )
                  ))
