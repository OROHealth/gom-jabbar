from marshmallow import post_load, fields, Schema


class Ingredient(object):

    def __init__(self, name: str, quantity: int):
        self.name = self.validate(name)
        self.quantity = quantity

    def __repr__(self):
        return f"<Ingredient(name={self.name}, quantity={self.quantity})>"

    def use(self):
        self.quantity -= 1

    @staticmethod
    def validate(name):
        if not any(name.lower() == ing.lower() for ing in valid_ingredients):
            raise Exception(f"{name} is not a valid poutine ingredient")

        return name


class IngredientSchema(Schema):
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


def default_ingredients(ingredients: list[str] = None):
    if ingredients is None:
        return [
            Ingredient("cheese", 10),
            Ingredient("potatoes", 10),
            Ingredient("syrup", 10),
            Ingredient("water", 10),
            Ingredient("oil", 10),
            Ingredient("gravy sauce", 10)
        ]

    else:
        return [Ingredient(ing, 10) for ing in ingredients]

