from robot_maker.models.enums import ActionEnum
from robot_maker.models.ingredient import Ingredient
from tests.utils import get_robot, get_action

all_ingredients = Ingredient.query.all()

Outremona = get_robot(name="Outremona")
Montroyashi = get_robot(name="Montroyashi")
Verduny = get_robot(name="Verduny")
Nordo = get_robot(name="Nordo")
Bizar = get_robot(name="Bizar")
Oldoporto = get_robot(name="Oldoporto")
Pierre = get_robot(name="Pierre")

TAKE_CHEESE = get_action(ActionEnum.TAKE_CHEESE.name)
SQUEEZE_CHEESE = get_action(ActionEnum.SQUEEZE_CHEESE.name)
DETECT_DRUNK_PEOPLE = get_action(ActionEnum.DETECT_DRUNK_PEOPLE.name)
DISPLAY_LYRICS = get_action(ActionEnum.DISPLAY_LYRICS.name)
LISTEN_ENVIRONMENT = get_action(ActionEnum.LISTEN_ENVIRONMENT.name)
CUT_POTATOES = get_action(ActionEnum.CUT_POTATOES.name)
ADD_SYRUP = get_action(ActionEnum.ADD_SYRUP.name)
BOIL_POTATOES = get_action(ActionEnum.BOIL_POTATOES.name)
FRY_POTATOES = get_action(ActionEnum.FRY_POTATOES.name)
REGULATE_TEMP = get_action(ActionEnum.REGULATE_TEMP.name)
PACKAGE = get_action(ActionEnum.PACKAGE.name)

all_executed_actions = {TAKE_CHEESE.name: True,
                        SQUEEZE_CHEESE.name: True,
                        DETECT_DRUNK_PEOPLE.name: True,
                        DISPLAY_LYRICS.name: True,
                        LISTEN_ENVIRONMENT.name: True,
                        CUT_POTATOES.name: True,
                        ADD_SYRUP.name: True,
                        BOIL_POTATOES.name: True,
                        FRY_POTATOES.name: True,
                        REGULATE_TEMP.name: True}
