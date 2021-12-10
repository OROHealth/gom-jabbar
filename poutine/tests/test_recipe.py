import pytest

from robot_maker.models.ingredient import Ingredient
from robot_maker.models.recipe import Recipe
from robot_maker.models.step import Step
from tests.defaults import TAKE_CHEESE, SQUEEZE_CHEESE, all_ingredients, Outremona


@pytest.mark.xfail(raises=Exception)
def test_validate():
    step = Step(actions=[TAKE_CHEESE, SQUEEZE_CHEESE],
                ingredients=[Ingredient("butter", 1)],
                robot=Outremona)

    with pytest.raises(Exception):
        Recipe.validate(all_ingredients, steps=[step])


good_step = Step(actions=[TAKE_CHEESE, SQUEEZE_CHEESE],
                 ingredients=all_ingredients,
                 robot=Outremona)

bad_step = Step(actions=[SQUEEZE_CHEESE],
                ingredients=all_ingredients,
                robot=Outremona)


@pytest.mark.parametrize(('recipe', 'should_pass'),
                         ((Recipe(name="Poutine", ingredients=all_ingredients,
                                  steps=[good_step]), True),
                          (Recipe("Poutine", ingredients=all_ingredients,
                                  steps=[bad_step]), False)))
def test_cook(app, recipe, should_pass):
    with app.app_context():
        status, message, log = recipe.cook()

        if should_pass:
            assert status is True
            assert "Successful" in message
        else:
            assert status is False
            assert "Failed" in message
