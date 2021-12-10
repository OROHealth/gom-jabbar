from robot_maker.models.ingredient import Ingredient
from robot_maker.models.robot import Action, Robot


def get_action(name):
    return Action.query.filter_by(name=name).first()


def get_ingredient(name):
    return Ingredient.query.filter_by(name=name).first()


def get_robot(name):
    return Robot.query.filter_by(name=name).first()

