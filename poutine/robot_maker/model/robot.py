import time
from enum import Enum

from marshmallow import post_load, fields, Schema

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

    def execute(self, executed_actions: dict, actions_to_execute: list[Action], ingredients: list[Ingredient] = None):
        """Execute robot actions

        :param dict executed_actions: A dictionary of already executed actions and their status
        :param list[Action] actions_to_execute: A list of Actions to execute
        :param list[Ingredient] ingredients: A list of ingredients used in the action execution
        :return:
        """
        messages = []
        is_execution_successful = False
        failed_actions = []

        if any(action in self.actions for action in actions_to_execute):
            for action_to_execute in actions_to_execute:
                if action_to_execute == Action.TAKE_CHEESE:
                    if ingredients is None or len(ingredients) == 0:
                        self.log_failure(action_to_execute, "Cheese", messages)

                    ingredient = [x for x in ingredients if x.name.lower() == 'Cheese'.lower()]
                    ingredient = ingredient[0]

                    if ingredient is None or ingredient.quantity == 0:
                        self.log_failure(action_to_execute, "Cheese", messages)

                    ingredients.remove(ingredient)
                    ingredient.quantity -= 1
                    ingredients.append(ingredient)
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.SQUEEZE_CHEESE:
                    if not executed_actions.get(Action.TAKE_CHEESE.name):
                        self.log_failure(action_to_execute, "Cheese", messages)

                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.DETECT_DRUNK_PEOPLE:
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.DISPLAY_LYRICS:
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.LISTEN_ENVIRONMENT:
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.CUT_POTATOES:
                    if ingredients is None or ingredients == 0:
                        self.log_failure(action_to_execute, "Potatoes", messages)

                    ingredients -= 1
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.ADD_SYRUP:
                    if not executed_actions.get(Action.CUT_POTATOES.name):
                        self.log_failure(action_to_execute, "Potatoes", messages)

                    time.sleep(25)  # Wait for 25 seconds
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.BOIL_POTATOES:
                    if not executed_actions.get(Action.ADD_SYRUP.name):
                        self.log_failure(action_to_execute, "Potatoes", messages)

                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.FRY_POTATOES:
                    if not executed_actions.get(Action.BOIL_POTATOES.name):
                        self.log_failure(action_to_execute, "Potatoes", messages)

                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.REGULATE_TEMP:
                    if ingredients is None or ingredients == 0:
                        self.log_failure(action_to_execute, "Gravy Sauce", messages)

                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                elif action_to_execute == Action.PACKAGE:
                    requirements = [Action.SQUEEZE_CHEESE.name, Action.FRY_POTATOES.name, Action.REGULATE_TEMP.name]
                    if requirements not in executed_actions.keys():
                        self.log_failure(action_to_execute, requirements, messages)
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, messages)

                else:
                    is_execution_successful = False
                    failed_actions.append(action_to_execute)
                    message = f"ERROR : Failed to execute {action_to_execute}"
                    messages.append(message)
                    print(f"ERROR : Failed to execute {action_to_execute}")

        else:
            raise Exception(f"Action {actions_to_execute} are not supported by {self.name}")

        if not is_execution_successful and len(failed_actions) > 0:
            message = "FAILED : Some actions were not executed successfully"
            messages.append(message)
            print("\n" + message)
        else:
            message = "SUCCESSFUL : All actions were executed successfully"
            messages.append(message)
            print("\n" + message)

        return is_execution_successful, message, messages

    @staticmethod
    def log_success(executed_actions, action, messages):
        executed_actions[action.name] = True
        message = f"EXECUTED : {action.name}"
        messages.append(message)
        print(message)
        return True

    @staticmethod
    def log_failure(action, requirements, messages):
        message = f"ERROR : Failed to execute {action.name}"
        messages.append(message)
        print(message)
        raise Exception(f"Missing {requirements}")


class RobotSchema(Schema):
    name = fields.Str()
    actions = fields.List(fields.Str())

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
