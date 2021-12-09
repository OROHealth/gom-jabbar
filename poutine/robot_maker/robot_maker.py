from flask import Blueprint, request, jsonify, abort

from robot_maker import IngredientSchema
from robot_maker.model.ingredient import default_ingredients
from robot_maker.model.recipe import Recipe, RecipeSchema
from robot_maker.model.robot import init_poutine_robots, RobotSchema, Action
from robot_maker.model.step import default_poutine_steps

bp = Blueprint('robot_maker', __name__, url_prefix="/api")


@bp.route("/recipes/<recipe>", methods=('GET', 'POST'))
def recipes(recipe):
    """Retrieve a Poutine recipe or Make a Poutine

    :param string recipe: The name of the Recipe
    :return:
    """
    if not isinstance(recipe, str) and recipe != "poutine":
        abort(405)

    if request.method == 'GET':
        poutine_ingredients = default_ingredients()
        poutine_steps = default_poutine_steps(poutine_ingredients)

        poutine_recipe = Recipe(poutine_ingredients, poutine_steps)
        return jsonify(RecipeSchema().dump(poutine_recipe))

    if request.method == 'POST':
        is_default = request.args.get("is_default", default=True, type=bool)
        if isinstance(is_default, bool) and bool(is_default):
            poutine_ingredients = default_ingredients()
            poutine_steps = default_poutine_steps(poutine_ingredients)
            poutine_recipe = Recipe(poutine_ingredients, poutine_steps)
            success, message = poutine_recipe.cook()
            return jsonify(dict(success=success, message=message))

        else:
            poutine_recipe = RecipeSchema().load(request.json)
            success, message = poutine_recipe.cook()
            return jsonify(dict(success=success, message=message))


@bp.route("/robots")
def get_robots():
    """Fetch all Robots

    :return: A list of robots
    """
    robots = init_poutine_robots()
    return jsonify(RobotSchema().dump(robots.values(), many=True))


@bp.route("/robots/<robot>", methods=('GET', 'POST'))
def execute_robot_action(robot):
    """Retrieve a Robot or Execute Robot Action

    :param string robot: The name of the Robot
    :return:
    """
    if not isinstance(robot, str):
        abort(405)

    if request.method == 'GET':
        robot = init_poutine_robots().get(robot)
        return jsonify(RobotSchema().dump(robot))

    if request.method == 'POST':
        robot = init_poutine_robots().get(robot)
        ingredients = IngredientSchema().load(data=request.json.get("ingredients"), many=True)
        executed_actions = request.json.get("executed_actions")
        actions = request.json.get("actions_to_execute")
        actions = [Action[action] for action in actions if isinstance(actions, list)]
        status, _, message, messages = robot.run(executed_actions, actions, ingredients)
        return jsonify({"status": status, "message": message, "messages": messages})
