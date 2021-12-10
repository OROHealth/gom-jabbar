import pytest
from marshmallow import ValidationError

from robot_maker.models.ingredient import Ingredient, IngredientSchema


def test_ingredient():
    name = "cheese"
    ingredient = Ingredient(name, 10)

    assert ingredient.__repr__() == f"<Ingredient(name={name!r})>"


def test_use():
    ingredient = Ingredient.query.all()[0]
    original_qty = ingredient.quantity
    ingredient.use()

    assert ingredient.quantity == original_qty - 1


@pytest.mark.parametrize(('name', 'should_pass'),
                         (('cheese', True),
                          ('Pierre', False)))
def test_validate(name, should_pass):
    if should_pass:
        actual = Ingredient.validate(name)
        assert actual == name

    else:
        with pytest.raises(Exception, match=r".* Poutine ingredient"):
            Ingredient.validate(name)


@pytest.mark.parametrize(('ingredient', 'expected', 'should_pass'),
                         (({"name": 'cheese', "quantity": 10}, Ingredient("cheese", 10), True),
                          ({"name": 'cheese', "qty": 10}, ValidationError, False)))
def test_make_ingredient(ingredient, expected, should_pass):
    if should_pass:
        ing = IngredientSchema().load(data=ingredient)
        assert ing.name == expected.name
        assert ing.quantity == expected.quantity

    else:
        with pytest.raises(expected):
            IngredientSchema().load(data=ingredient)
