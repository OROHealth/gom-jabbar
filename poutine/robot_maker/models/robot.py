from flask import current_app as app
from marshmallow import post_load, fields, Schema
from sqlalchemy import Column, String, Table, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref

from robot_maker.db import Base
from robot_maker.models.enums import ActionEnum
from robot_maker.models.ingredient import Ingredient


class Action(Base):
    __tablename__ = "actions"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    value = Column(String(150), nullable=False)

    def __init__(self, name, value, id=None):
        self.id = id
        self.name = name
        self.value = value

    def __repr__(self):
        return f"<Action(name={self.name!r})>"


class ActionSchema(Schema):
    id = fields.Integer()
    name = fields.Str()
    value = fields.Str()

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Action(**data)


robot_actions = Table("robot_actions", Base.metadata,
                      Column('robot_id', Integer, ForeignKey('robots.id'), primary_key=True),
                      Column('action_id', Integer, ForeignKey('actions.id'), primary_key=True))


class Robot(Base):
    __tablename__ = 'robots'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    actions = relationship('Action',
                           secondary=robot_actions,
                           lazy='subquery',
                           backref=backref('robots', lazy=True))

    def __init__(self, name: str, actions: list[Action], id=None):
        self.id = id
        self.name = name
        self.actions = actions

    def __repr__(self):
        return f"<Robot(name={self.name!r})>"

    def run(self, executed_actions: dict, actions_to_execute: list[Action], ingredients: list[Ingredient] = None):
        """Execute robot actions

        :param dict executed_actions: A dictionary of already executed actions and their status
        :param list[Action] actions_to_execute: A list of Actions to execute
        :param list[Ingredient] ingredients: A list of ingredients used in the action execution
        :return:
        """
        log: list[dict] = []
        is_execution_successful = False

        actions = [action.name for action in self.actions]
        actions_to_execute = [action.name for action in actions_to_execute]
        if any(action in actions for action in actions_to_execute):
            for action_to_execute in actions_to_execute:
                action_to_execute = Action.query.filter_by(name=action_to_execute).first()
                if action_to_execute.name == ActionEnum.TAKE_CHEESE.name:
                    ingredient, status = self.check_ingredients('Cheese', ingredients, executed_actions,
                                                                action_to_execute, log)
                    if status:
                        ingredients.remove(ingredient)
                        ingredient.use()
                        ingredients.append(ingredient)
                        is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                elif action_to_execute.name == ActionEnum.SQUEEZE_CHEESE.name:
                    if not executed_actions.get(ActionEnum.TAKE_CHEESE.name):
                        self.log_failure(executed_actions, action_to_execute, "Cheese", log)
                        continue

                    is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                elif action_to_execute.name == ActionEnum.DETECT_DRUNK_PEOPLE.name:
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                elif action_to_execute.name == ActionEnum.DISPLAY_LYRICS.name:
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                elif action_to_execute.name == ActionEnum.LISTEN_ENVIRONMENT.name:
                    is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                elif action_to_execute.name == ActionEnum.CUT_POTATOES.name:
                    ingredient, status = self.check_ingredients('Potatoes', ingredients, executed_actions,
                                                                action_to_execute, log)
                    if status:
                        ingredients.remove(ingredient)
                        ingredient.use()
                        ingredients.append(ingredient)
                        is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                elif action_to_execute.name == ActionEnum.ADD_SYRUP.name:
                    if not executed_actions.get(ActionEnum.CUT_POTATOES.name):
                        self.log_failure(executed_actions, action_to_execute, "Potatoes", log)
                        continue

                    ingredient, status = self.check_ingredients('Syrup', ingredients, executed_actions,
                                                                action_to_execute, log)
                    if status:
                        ingredients.remove(ingredient)
                        ingredient.use()
                        ingredients.append(ingredient)

                        # time.sleep(25)  # Wait for 25 seconds
                        is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                elif action_to_execute.name == ActionEnum.BOIL_POTATOES.name:
                    if not executed_actions.get(ActionEnum.ADD_SYRUP.name):
                        self.log_failure(executed_actions, action_to_execute, "Potatoes", log)
                        continue

                    ingredient, status = self.check_ingredients('Water', ingredients, executed_actions,
                                                                action_to_execute, log)
                    if status:
                        ingredients.remove(ingredient)
                        ingredient.use()
                        ingredients.append(ingredient)
                        is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                elif action_to_execute.name == ActionEnum.FRY_POTATOES.name:
                    if not executed_actions.get(ActionEnum.BOIL_POTATOES.name):
                        self.log_failure(executed_actions, action_to_execute, "Potatoes", log)
                        continue

                    ingredient, status = self.check_ingredients('Oil', ingredients, executed_actions,
                                                                action_to_execute, log)
                    if status:
                        ingredients.remove(ingredient)
                        ingredient.use()
                        ingredients.append(ingredient)
                        is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                elif action_to_execute.name == ActionEnum.REGULATE_TEMP.name:
                    ingredient, status = self.check_ingredients('Gravy Sauce', ingredients, executed_actions,
                                                                action_to_execute, log)
                    if status:
                        ingredients.remove(ingredient)
                        ingredient.use()
                        ingredients.append(ingredient)

                        is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                elif action_to_execute.name == ActionEnum.PACKAGE.name:
                    if not executed_actions or False in list(executed_actions.values()):
                        self.log_failure(executed_actions, action_to_execute, "All other steps", log)
                    else:
                        is_execution_successful = self.log_success(executed_actions, action_to_execute, log)

                else:
                    is_execution_successful = False
                    message = f"ERROR : Failed to execute {action_to_execute}"
                    log.append({"action": action_to_execute, "message": message})
                    app.logger.info(f"ERROR : Failed to execute {action_to_execute}")

        else:
            message = f"ERROR: {self.name} cannot perform {actions_to_execute}"
            app.logger.info("\n" + message)
            log.append({"message": message})
            is_execution_successful = False

        if not is_execution_successful > 0:
            message = "FAILED : Some actions were not executed successfully"
            app.logger.info("\n" + message)
        else:
            message = "SUCCESS : All actions were executed successfully"
            app.logger.info("\n" + message)

        return is_execution_successful, executed_actions, message, log

    def check_ingredients(self, ingredient, ingredients, executed_actions, action_to_execute, log):
        if ingredients is None or len(ingredients) == 0:
            self.log_failure(executed_actions, action_to_execute, ingredient, log)
            return ingredient, False

        else:
            ingredient = [ing for ing in ingredients if ing.name.lower() == ingredient.lower()]
            ingredient = ingredient[0]

            if ingredient is None or ingredient.quantity == 0:
                self.log_failure(executed_actions, action_to_execute, ingredient, log)

            return ingredient, True

    @staticmethod
    def log_success(executed_actions: dict, action: Action, log):
        executed_actions[action.name] = True
        message = f"EXECUTED : {action.value}"
        log.append({"action": action.name, "message": message})
        app.logger.info(message)
        return True

    @staticmethod
    def log_failure(executed_actions: dict, action: Action, requirements: any, log):
        executed_actions[action.name] = False
        message = f"ERROR - Failed to execute : {action.value}"

        if requirements is not None:
            message += f", Missing : {requirements}"

        log.append({"action": action.name, "message": message})
        app.logger.info(message)
        return False


class RobotSchema(Schema):
    id = fields.Integer()
    name = fields.Str()
    actions = fields.List(fields.Nested(ActionSchema))

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Robot(**data)
