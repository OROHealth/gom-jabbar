import time
from enum import Enum

from flask import current_app as app
from marshmallow import post_load, fields, Schema
from marshmallow_enum import EnumField

from robot_maker.model.ingredient import Ingredient


class Action(Enum):
    TAKE_CHEESE = "take cheese from a box"
    SQUEEZE_CHEESE = "squeeze cheese"

    DETECT_DRUNK_PEOPLE = "detect drunk people"
    DISPLAY_LYRICS = "display Leonard Cohen lyrics"
    LISTEN_ENVIRONMENT = "listen to other robots' environment sounds"

    CUT_POTATOES = "cut potatoes in dynamically-sized cube"
    ADD_SYRUP = "dip potatoes in maple syrup"
    BOIL_POTATOES = "boil potatoes and give their current softness level"

    FRY_POTATOES = "fry potatoes with multiple oil choices"
    REGULATE_TEMP = "keep things at a specific temperature in a pot"
    PACKAGE = "mix ingredient in a cardboard, allow the box to be sent to needy user"


class Robot(object):

    def __init__(self, name: str, actions: list[Action]):
        self.name = name
        self.actions = actions

    def __repr__(self):
        return f"<Robot(name={self.name}, actions={self.actions})>"

    def __eq__(self, other):
        is_equal = False
        is_equal = self.name == other.name

    def run(self, executed_actions: dict, actions_to_execute: list[str], ingredients: list[Ingredient] = None):
        """Execute robot actions

        :param dict executed_actions: A dictionary of already executed actions and their status
        :param list[Action] actions_to_execute: A list of Actions to execute
        :param list[Ingredient] ingredients: A list of ingredients used in the action execution
        :return:
        """
        messages = []
        is_execution_successful = False
        failed_actions = []

        actions = [x.name for x in self.actions]
        if any(action in actions for action in actions_to_execute):
            for action_to_execute in actions_to_execute:
                if action_to_execute == Action.TAKE_CHEESE.name:
                    ingredient = self.check_ingredients('Cheese', ingredients, executed_actions, action_to_execute,
                                                        messages)
                    ingredients.remove(ingredient)
                    ingredient.use()
                    ingredients.append(ingredient)
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.SQUEEZE_CHEESE.name:
                    if not executed_actions.get(Action.TAKE_CHEESE.name):
                        self.log_failure(executed_actions, action_to_execute, "Cheese", messages)

                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.DETECT_DRUNK_PEOPLE.name:
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.DISPLAY_LYRICS.name:
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.LISTEN_ENVIRONMENT.name:
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.CUT_POTATOES.name:
                    ingredient = self.check_ingredients('Potatoes', ingredients, executed_actions,
                                                        action_to_execute, messages)
                    ingredients.remove(ingredient)
                    ingredient.use()
                    ingredients.append(ingredient)
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.ADD_SYRUP.name:
                    if not executed_actions.get(Action.CUT_POTATOES.name):
                        self.log_failure(executed_actions, action_to_execute, "Potatoes", messages)

                    ingredient = self.check_ingredients('Syrup', ingredients, executed_actions,
                                                        action_to_execute, messages)
                    ingredients.remove(ingredient)
                    ingredient.use()
                    ingredients.append(ingredient)

                    # time.sleep(25)  # Wait for 25 seconds
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.BOIL_POTATOES.name:
                    if not executed_actions.get(Action.ADD_SYRUP.name):
                        self.log_failure(executed_actions, action_to_execute, "Potatoes", messages)

                    ingredient = self.check_ingredients('Water', ingredients, executed_actions,
                                                        action_to_execute, messages)
                    ingredients.remove(ingredient)
                    ingredient.use()
                    ingredients.append(ingredient)
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.FRY_POTATOES.name:
                    if not executed_actions.get(Action.BOIL_POTATOES.name):
                        self.log_failure(executed_actions, action_to_execute, "Potatoes", messages)

                    ingredient = self.check_ingredients('Oil', ingredients, executed_actions,
                                                        action_to_execute, messages)
                    ingredients.remove(ingredient)
                    ingredient.use()
                    ingredients.append(ingredient)
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.REGULATE_TEMP.name:
                    ingredient = self.check_ingredients('Gravy Sauce', ingredients, executed_actions,
                                                        action_to_execute, messages)
                    ingredients.remove(ingredient)
                    ingredient.use()
                    ingredients.append(ingredient)

                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.PACKAGE.name:
                    if False in list(executed_actions.values()):
                        self.log_failure(executed_actions, action_to_execute, "All other steps", messages)
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                else:
                    is_execution_successful = False
                    failed_actions.append(action_to_execute)
                    message = f"ERROR : Failed to execute {action_to_execute}"
                    messages.append(message)
                    app.logger.info(f"ERROR : Failed to execute {action_to_execute}")

        else:
            raise Exception(f"Action {actions_to_execute} are not supported by {self.name}")

        if not is_execution_successful and len(failed_actions) > 0:
            message = "FAILED : Some actions were not executed successfully"
            messages.append(message)
            app.logger.info("\n" + message)
        else:
            message = "SUCCESSFUL : All actions were executed successfully"
            messages.append(message)
            app.logger.info("\n" + message)

        return is_execution_successful, executed_actions, message, messages

    def check_ingredients(self, ingredient, ingredients, executed_actions, action_to_execute, messages):
        if ingredients is None or len(ingredients) == 0:
            self.log_failure(executed_actions, action_to_execute, ingredient, messages)

        ingredient = [x for x in ingredients if x.name.lower() == ingredient.lower()]
        ingredient = ingredient[0]

        if ingredient is None or ingredient.quantity == 0:
            self.log_failure(executed_actions, action_to_execute, ingredient, messages)

        return ingredient

    @staticmethod
    def log_success(executed_actions: dict, action: str, messages):
        executed_actions[action] = True
        message = f"EXECUTED : {Action[action].value}"
        messages.append(message)
        app.logger.info(message)
        return True

    @staticmethod
    def log_failure(executed_actions: dict, action: str, requirements: any, messages: list[str]):
        executed_actions[action] = True
        message = f"ERROR - Failed to execute : {Action[action].value}"
        messages.append(message)
        app.logger.info(message)
        raise Exception(f"Missing {requirements}")


class RobotSchema(Schema):
    name = fields.Str()
    actions = fields.List(EnumField(Action))

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Robot(**data)


def init_poutine_robots() -> dict[str, Robot]:
    return {
        "Outremona": Robot("Outremona", [Action.TAKE_CHEESE, Action.SQUEEZE_CHEESE]),
        "Montroyashi": Robot("Montroyashi", [Action.LISTEN_ENVIRONMENT,
                                             Action.DISPLAY_LYRICS,
                                             Action.DETECT_DRUNK_PEOPLE]),
        "Verduny": Robot("Verduny", [Action.CUT_POTATOES, Action.ADD_SYRUP]),
        "Nordo": Robot("Nordo", [Action.BOIL_POTATOES]),
        "Bizar": Robot("Bizar", [Action.FRY_POTATOES]),
        "Oldoporto": Robot("Oldoporto", [Action.REGULATE_TEMP]),
        "Pierre": Robot("Pierre", [Action.PACKAGE])
    }
