import pytest

from robot_maker.models.enums import StatusEnum
from robot_maker.models.step import Step
from tests.defaults import TAKE_CHEESE, SQUEEZE_CHEESE, all_ingredients, Outremona


@pytest.mark.parametrize(('step', 'should_pass'),
                         ((Step(actions=[TAKE_CHEESE, SQUEEZE_CHEESE],
                                ingredients=all_ingredients,
                                robot=Outremona), True),
                          (Step(actions=[SQUEEZE_CHEESE],
                                ingredients=all_ingredients,
                                robot=Outremona), False)))
def test_execute(app, step: Step, should_pass):
    with app.app_context():
        step, _ = step.execute({})

        if should_pass:
            assert step.status == StatusEnum.SUCCESSFUL
        else:
            assert step.status == StatusEnum.FAILED
