from flask import Blueprint, request, jsonify, abort

from robot_maker import IngredientSchema
from robot_maker.models.recipe import Recipe, RecipeSchema
from robot_maker.models.robot import RobotSchema, Robot

bp = Blueprint('robot_maker', __name__, url_prefix="/api")


@bp.route("/recipes/<recipe>", methods=('GET', 'POST'))
def recipes(recipe):
    """Retrieve a Poutine recipe or Make a Poutine

    :param string recipe: The name of the Recipe
    :return:
    """
    if not isinstance(recipe, str) and recipe != "Poutine":
        abort(405)

    if request.method == 'GET':
        poutine_recipe = Recipe.query.filter_by(name=recipe).first()
        return jsonify(RecipeSchema().dump(poutine_recipe))

    if request.method == 'POST':
        is_default = request.args.get("is_default", default=False, type=lambda v: v.lower() == 'true')

        if is_default is None:
            abort(405)

        if isinstance(is_default, bool) and bool(is_default):
            poutine_recipe = Recipe.query.filter_by(name="Poutine").first()
            success, message, log = poutine_recipe.cook()

            if success:
                return jsonify(dict(success=success, message=message, log=log))
            else:
                abort(417, message, log)

        else:
            recipe = RecipeSchema().load(request.json)
            success, message, log = recipe.cook()
            return jsonify(dict(success=success, message=message, log=log))


@bp.route("/robots")
def get_robots():
    """Fetch all Robots

    :return: A list of robots
    """
    robots = Robot.query.all()
    return jsonify(RobotSchema().dump(robots, many=True))


@bp.route("/robots/<robot>", methods=('GET', 'POST'))
def execute_robot_action(robot):
    """Retrieve a Robot or Execute Robot Action

    :param string robot: The name of the Robot
    :return:
    """
    if not isinstance(robot, str):
        abort(405)

    if request.method == 'GET':
        robot = Robot.query.filter_by(name=robot).first()
        return jsonify(RobotSchema().dump(robot))

    if request.method == 'POST':
        robot = Robot.query.filter_by(name=robot).first()
        ingredients = IngredientSchema().load(data=request.json.get("ingredients"), many=True)
        executed_actions = request.json.get("executed_actions")
        actions = request.json.get("actions_to_execute")
        status, _, message, log = robot.run(executed_actions, actions, ingredients)
        return jsonify({"status": status, "message": message, "log": log})
