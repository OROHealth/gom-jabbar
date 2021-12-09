from marshmallow import post_load, fields, Schema


class Ingredient(object):

    def __init__(self, name: str, quantity: int):
        self.validate()
        self.name = name
        self.quantity = quantity

    def __repr__(self):
        return f"<Ingredient(name={self.name}, quantity={self.quantity})>"

    def validate(self):
        if any(ing.lower() == self.name.lower() for ing in valid_ingredients):
            raise Exception(f"{self.name} is not a valid poutine ingredient")


class IngredientSchema(Schema):
    name = fields.Str()
    quantity = fields.Int()

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Ingredient(**data)


valid_ingredients = [
    "cheese",
    "syrup",
    "water",
    "oil",
    "gravy sauce"
]
