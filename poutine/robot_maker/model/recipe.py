from marshmallow import Schema, fields, post_load

from robot_maker.model.ingredient import Ingredient, IngredientSchema, default_ingredients
from robot_maker.model.step import Step, StepSchema, default_poutine_steps, Status


class Recipe(object):

    def __init__(self, ingredients: list[Ingredient], steps: list[Step]):
        self.validate(ingredients, steps)
        self.ingredients = ingredients
        self.steps = steps

    def __repr__(self):
        return "<Recipe()"

    @staticmethod
    def validate(ingredients: list[Ingredient], steps: list[Step]):
        for step in steps:
            for ingredient in step.ingredients:
                if ingredient.name.lower() not in [ing.name.lower() for ing in ingredients]:
                    raise Exception(f"{ingredient} is not a valid ingredient for this recipe")

    def cook(self):
        status = {}
        step_count = 1
        executed_actions = {}
        for step in self.steps:
            step, executed_actions = step.execute(executed_actions)
            status[step_count] = step.status
            step_count += 1

        if any(stat == Status.FAILED for stat in status.values()):
            return False, f"Failed to prepare Poutine at one of the steps"
        else:
            return True, f"Successfully prepared Poutine"


class RecipeSchema(Schema):
    ingredients = fields.List(fields.Nested(IngredientSchema))
    steps = fields.List(fields.Nested(StepSchema))

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Step(**data)
