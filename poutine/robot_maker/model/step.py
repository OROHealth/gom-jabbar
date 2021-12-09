from enum import Enum

from marshmallow import post_load, fields, Schema

from robot_maker.model.ingredient import Ingredient, IngredientSchema, default_ingredients
from robot_maker.model.robot import Robot, init_poutine_robots, RobotSchema, Action


class Status(Enum):
    COMPLETE = "COMPLETE"
    INCOMPLETE = "INCOMPLETE"
    SUCCESSFUL = "SUCCESSFUL"
    FAILED = "FAILED"


class Step(object):
    def __init__(self, actions: list[Action], ingredients: set[Ingredient], robot: Robot = None):
        self.actions = [action.name for action in actions]
        self.ingredients = ingredients
        self.robot = robot
        self.status = None

    def __repr__(self):
        return f"<Step(description={self.actions}, ingredients={self.ingredients}," \
               f" status={self.status.name}, robot={self.robot.name})>"

    def execute(self, executed_actions):
        status, executed_actions, _, _ = self.robot.run(executed_actions, self.actions, list(self.ingredients))
        if status:
            self.status = Status.SUCCESSFUL
        else:
            self.status = Status.FAILED

        return self, executed_actions


class StepSchema(Schema):
    actions = fields.Str()
    ingredients = fields.List(fields.Nested(IngredientSchema))
    robot = fields.Nested(RobotSchema)
    status = fields.Str()

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Step(**data)


def default_poutine_steps(ingredients: list[Ingredient] = None) -> list[Step]:
    ingredients = set(ingredients)
    poutine_robots = init_poutine_robots()
    return [
        Step([Action.TAKE_CHEESE, Action.SQUEEZE_CHEESE], default_ingredients(["cheese"]),
             poutine_robots.get("Outremona")),

        Step([Action.CUT_POTATOES, Action.ADD_SYRUP], default_ingredients(["syrup", "potatoes"]),
             poutine_robots.get("Verduny")),

        Step([Action.BOIL_POTATOES], default_ingredients(["water"]), poutine_robots.get("Nordo")),

        Step([Action.FRY_POTATOES], default_ingredients(["oil"]), poutine_robots.get("Bizar")),

        Step([Action.DISPLAY_LYRICS], default_ingredients([]), poutine_robots.get("Montroyashi")),

        Step([Action.REGULATE_TEMP], default_ingredients(["gravy sauce"]), poutine_robots.get("Oldoporto")),

        Step([Action.PACKAGE], default_ingredients([]), poutine_robots.get("Pierre")),

        Step([Action.DETECT_DRUNK_PEOPLE], default_ingredients([]), poutine_robots.get("Montroyashi"))
    ]
