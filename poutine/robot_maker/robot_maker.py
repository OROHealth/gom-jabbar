from flask import Blueprint, request, jsonify, abort

from robot_maker import openapi_spec, IngredientSchema
from robot_maker.model.robot import init_poutine_robots, RobotSchema, Action

spec = openapi_spec()
bp = Blueprint('robot_maker', __name__, url_prefix="/api")


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
        status, message, messages = robot.execute(executed_actions, actions, ingredients)
        return jsonify({"status": status, "message": message, "messages": messages})
