import pytest

from tests.defaults import *
from robot_maker.models.robot import Robot, Action


@pytest.mark.parametrize(('robot', 'executed_actions', 'actions_to_execute', 'ingredients'),
                         ((Outremona, {}, [TAKE_CHEESE, SQUEEZE_CHEESE], all_ingredients),
                          (Montroyashi, {}, [LISTEN_ENVIRONMENT, DETECT_DRUNK_PEOPLE, DISPLAY_LYRICS], []),
                          (Verduny, {}, [CUT_POTATOES, ADD_SYRUP], all_ingredients),
                          (Nordo, {ADD_SYRUP.name: True}, [BOIL_POTATOES], all_ingredients),
                          (Bizar, {BOIL_POTATOES.name: True}, [FRY_POTATOES], all_ingredients),
                          (Oldoporto, {}, [REGULATE_TEMP], all_ingredients),
                          (Pierre, all_executed_actions, [PACKAGE], [])
                          ))
def test_run_with_valid_params(app, robot: Robot, executed_actions, actions_to_execute, ingredients):
    with app.app_context():
        status, exec_actions, message, log = robot.run(executed_actions, actions_to_execute, ingredients)

        assert status is True
        assert 'SUCCESS' in message
        actions_to_execute = [action.name for action in actions_to_execute]
        exec_actions = list(exec_actions.keys())
        assert True if any(action in actions_to_execute for action in exec_actions) else False


@pytest.mark.parametrize(('robot', 'executed_actions', 'actions_to_execute', 'ingredients'),
                         ((Outremona, {}, [SQUEEZE_CHEESE], all_ingredients),
                          (Verduny, {}, [ADD_SYRUP], all_ingredients),
                          (Nordo, {ADD_SYRUP.name: False}, [BOIL_POTATOES], all_ingredients),
                          (Bizar, {BOIL_POTATOES.name: False}, [FRY_POTATOES], all_ingredients),
                          (Oldoporto, {}, [REGULATE_TEMP], []),
                          (Pierre, {}, [PACKAGE], []),
                          (Pierre, {}, [SQUEEZE_CHEESE], []),
                          (Pierre, all_executed_actions, [Action('SOME_ACTION', "An Invalid Action")], [])
                          ))
def test_run_with_invalid_params(app, robot: Robot, executed_actions, actions_to_execute, ingredients):
    with app.app_context():
        status, exec_actions, message, _ = robot.run(executed_actions, actions_to_execute, ingredients)

        assert status is False
        assert 'FAILED' in message
        for action_to_exec in actions_to_execute:
            assert False if exec_actions.get(action_to_exec) else True


def test_robot():
    name = "cheese"
    ingredient = Robot(name, [])

    assert ingredient.__repr__() == f"<Robot(name={name!r})>"
