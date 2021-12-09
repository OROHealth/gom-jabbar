from marshmallow import Schema, fields, post_load

from robot_maker.model.ingredient import Ingredient, IngredientSchema
from robot_maker.model.step import Step, StepSchema, init_poutine_steps


class Recipe(object):

    def __init__(self, ingredients: list[Ingredient], steps: list[Step]):
        self.ingredients = ingredients
        self.steps = steps

    def __repr__(self):
        return "<Recipe()"


class RecipeSchema(Schema):
    ingredients = fields.List(fields.Nested(IngredientSchema))
    steps = fields.List(fields.Nested(StepSchema))

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Step(**data)


ingredients = [
    "cheese",
    "syrup",
    "water",
    "oil",
    "gravy sauce"
]

steps = init_poutine_steps()

poutine = Recipe(ingredients, steps)

