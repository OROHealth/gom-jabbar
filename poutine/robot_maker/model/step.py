from enum import Enum

from marshmallow import post_load, fields, Schema

from robot_maker.model.ingredient import Ingredient
from robot_maker.model.robot import Robot, init_poutine_robots, RobotSchema, Action


class Status(Enum):
    COMPLETE = "COMPLETE"
    INCOMPLETE = "INCOMPLETE"
    SUCCESSFUL = "SUCCESSFUL"
    FAILED = "FAILED"


class Step(object):
    def __init__(self, actions: list[Action], ingredients: set[Ingredient], robot: Robot = None):
        self.actions = actions
        self.ingredients = ingredients
        self.robot = robot
        self.status = None

    def __repr__(self):
        return f"<Step(description={self.actions}, ingredients={self.ingredients}," \
               f" status={self.status.name}, robot={self.robot.name})>"

    def execute(self):
        executed_actions = {}
        status = self.robot.execute(executed_actions, self.actions, self.ingredients)
        if status:
            self.status = Status.SUCCESSFUL
        else:
            self.status = Status.FAILED

        return self


class StepSchema(Schema):
    description = fields.Str()
    robot = fields.Nested(RobotSchema)

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Step(**data)


def init_poutine_steps() -> list[Step]:
    poutine_robots = init_poutine_robots()
    return [
        Step([Action.TAKE_CHEESE, Action.SQUEEZE_CHEESE], poutine_robots.get("Outremona")),
        Step([Action.CUT_POTATOES, Action.ADD_SYRUP], poutine_robots.get("Verduny")),

        Step([Action.BOIL_POTATOES], poutine_robots.get("Nordo")),

        Step([Action.FRY_POTATOES], poutine_robots.get("Bizar")),

        Step([Action.DISPLAY_LYRICS], poutine_robots.get("Montroyashi")),

        Step([Action.REGULATE_TEMP], poutine_robots.get("Oldoporto")),
        Step([Action.PACKAGE], poutine_robots.get("Pierre")),

        Step([Action.DETECT_DRUNK_PEOPLE], poutine_robots.get("Montroyashi"))
    ]
