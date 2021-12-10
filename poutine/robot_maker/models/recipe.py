from marshmallow import Schema, fields, post_load
from sqlalchemy import String, Integer, Column, Table, ForeignKey
from sqlalchemy.orm import relationship, backref

from robot_maker.db import Base
from robot_maker.models.ingredient import Ingredient, IngredientSchema
from robot_maker.models.step import Step, StepSchema, StatusEnum

recipe_ingredients = Table("recipe_ingredients", Base.metadata,
                           Column('recipe_id', Integer, ForeignKey('recipes.id'), primary_key=True),
                           Column('ingredient_id', Integer, ForeignKey('ingredients.id'), primary_key=True))


class Recipe(Base):
    __tablename__ = 'recipes'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    steps = relationship('Step', backref='recipes', lazy=True)
    ingredients = relationship('Ingredient',
                               secondary=recipe_ingredients,
                               lazy='subquery',
                               backref=backref('recipes', lazy=True))

    def __init__(self, name, ingredients: list[Ingredient], steps: list[Step], id=None):
        self.id = id
        self.validate(ingredients, steps)
        self.name = name
        self.ingredients = ingredients
        self.steps = steps

    def __repr__(self):
        return f"<Recipe(name={self.name!r})>"

    @staticmethod
    def validate(ingredients: list[Ingredient], steps: list[Step]):
        for step in steps:
            for step_ingredient in step.ingredients:
                if step_ingredient.name.lower() not in [ing.name.lower() for ing in ingredients]:
                    raise Exception(f"{step_ingredient} is not a valid ingredient for this recipe")

    def cook(self):
        status = {}
        step_count = 1
        log = {'steps': [], 'executed_actions': {}}
        for step in self.steps:
            step, executed_actions = step.execute(log['executed_actions'])
            status[step_count] = step.status
            log['steps'].append({step_count: step.log})
            step_count += 1

        if any(stat == StatusEnum.FAILED for stat in status.values()):
            return False, f"Failed to prepare {self.name} at one of the steps. Check the logs for more info", log
        else:
            return True, f"Successfully prepared {self.name}", log


class RecipeSchema(Schema):
    id = fields.Integer()
    name = fields.Str()
    ingredients = fields.List(fields.Nested(IngredientSchema))
    steps = fields.List(fields.Nested(StepSchema))

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Recipe(**data)
