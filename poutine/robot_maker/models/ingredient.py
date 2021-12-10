from marshmallow import post_load, fields, Schema
from sqlalchemy import Column, Integer, ForeignKey, String

from robot_maker.db import Base


class Ingredient(Base):
    __tablename__ = 'ingredients'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    quantity = Column(Integer, unique=False)
    step_id = Column(Integer, ForeignKey('steps.id'), nullable=True)
    recipe_id = Column(Integer, ForeignKey('recipes.id'), nullable=True)

    def __init__(self, name: str, quantity: int, id=None):
        self.id = id
        self.name = self.validate(name)
        self.quantity = quantity

    def __repr__(self):
        return f"<Ingredient(name={self.name!r})>"

    def use(self):
        self.quantity -= 1

    @staticmethod
    def validate(name):
        if not any(name.lower() == ing.lower() for ing in valid_ingredients):
            raise Exception(f"{name} is not a valid Poutine ingredient")

        return name


class IngredientSchema(Schema):
    id = fields.Integer()
    name = fields.Str()
    quantity = fields.Int()

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Ingredient(**data)


valid_ingredients = [
    "cheese",
    "potatoes",
    "syrup",
    "water",
    "oil",
    "gravy sauce"
]
