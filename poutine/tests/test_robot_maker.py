import pytest

from robot_maker.models.recipe import Recipe
from robot_maker.models.robot import Robot


sample_action_1 = {"name": 'TAKE_CHEESE', "value": "take some cheese"}
sample_action_2 = {"name": 'SQUEEZE_CHEESE', "value": "squeeze cheese"}

sample_ingredient_1 = {"name": "cheese", "quantity": 10}
sample_ingredient_2 = {"name": "potatoes", "quantity": 10}

sample_robot_1 = {"name": "Outremona", "actions": [sample_action_1]}
sample_robot_2 = {"name": "Verduny", "actions": [sample_action_2]}

sample_step_1 = {"actions": [sample_action_1], "ingredients": [sample_ingredient_1], "robot": sample_robot_1}
sample_step_2 = {"actions": [sample_action_2], "ingredients": [sample_ingredient_1], "robot": sample_robot_1}

sample_recipe_1 = {"name": "Poutine", "ingredients": [sample_ingredient_1], "steps": [sample_step_1]}
sample_recipe_2 = {"name": "Poutine",
                   "ingredients": [sample_ingredient_1, sample_ingredient_2],
                   "steps": [sample_step_1, sample_step_2]}


def test_get_robots(client):
    actual = list(Robot.query.all())
    response = client.get('/api/robots')

    assert response.status_code == 200
    assert len(response.json) is len(actual)
    assert 'id' in response.json[0]
    assert 'name' in response.json[0]
    assert 'actions' in response.json[0]


def test_execute_robot_action_get(client):
    robot = "Outremona"
    actual = Robot.query.filter_by(name=robot).first()
    response = client.get(f'/api/robots/{robot}')

    assert response.status_code == 200
    assert 'id' in response.json and actual.id == response.json.get('id')
    assert 'name' in response.json and actual.name == response.json.get('name')


@pytest.mark.parametrize(
    ('robot', 'executed_actions', 'actions_to_execute', 'ingredients', 'should_pass'),
    (
            ('Outremona', {}, ['TAKE_CHEESE'], [sample_ingredient_1], True),
            ('Outremona', {'CUT_POTATOES': True}, ['ADD_SYRUP'], [sample_ingredient_1], False),
            ('Pierre', {}, ['PACKAGE'], [], False)
    ))
def test_execute_robot_action_post(client, robot, executed_actions, actions_to_execute, ingredients, should_pass):
    response = client.post(f'/api/robots/{robot}', json={
        "executed_actions": executed_actions,
        "actions_to_execute": actions_to_execute,
        "ingredients": ingredients
    })

    if should_pass:
        assert response.status_code == 200
        assert 'status' in response.json
        assert response.json.get('status') is True
        assert 'message' in response.json and "SUCCESS" in response.json.get('message')
        assert 'log' in response.json

        log = response.json.get('log')
        assert len(log) == 1
        assert 'action' in log[0] and actions_to_execute[0] == log[0].get('action')
        assert 'message' in log[0] and "EXECUTED" in log[0].get('message')

    else:
        assert response.status_code == 417
        assert 'status' in response.json
        assert response.json.get('status') is False
        assert 'message' in response.json and "FAILED" in response.json.get('message')


@pytest.mark.parametrize(('recipe', 'should_pass'),
                         (('Poutine', True),
                          ('Pierre', False)))
def test_recipes_get(client, recipe, should_pass):
    actual = Recipe.query.filter_by(name=recipe).first()
    response = client.get(f'/api/recipes/{recipe}')

    if should_pass:
        assert response.status_code == 200
        assert 'id' in response.json and actual.id == response.json.get('id')
        assert 'name' in response.json and actual.name == response.json.get('name')

    else:
        assert response.status_code == 405


@pytest.mark.parametrize(
    ('recipe', 'is_default', 'data', 'should_pass'),
    (
        ('Poutine', True, {}, True),
        ('Poutine', False, sample_recipe_1, True),
        ('Poutine', False, sample_recipe_2, False),
        ('Pierre', True, sample_recipe_2, False),
        ('Pierre', False, sample_recipe_1, False)
    ))
def test_recipes_post(client, recipe, is_default, data, should_pass):
    response = client.post(f'/api/recipes/{recipe}?is_default={is_default}', json=data)

    if should_pass:
        assert response.status_code == 200
        assert response.json.get('success') is True

    else:
        assert response.status_code == 417 or response.status_code == 405
    json = response.json
