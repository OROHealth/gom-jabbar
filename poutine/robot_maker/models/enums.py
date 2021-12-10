from enum import Enum


class ActionEnum(Enum):
    TAKE_CHEESE = "take cheese from a box"
    SQUEEZE_CHEESE = "squeeze cheese"

    DETECT_DRUNK_PEOPLE = "detect drunk people"
    DISPLAY_LYRICS = "display Leonard Cohen lyrics"
    LISTEN_ENVIRONMENT = "listen to other robots' environment sounds"

    CUT_POTATOES = "cut potatoes in dynamically-sized cube"
    ADD_SYRUP = "dip potatoes in maple syrup"
    BOIL_POTATOES = "boil potatoes and give their current softness level"

    FRY_POTATOES = "fry potatoes with multiple oil choices"
    REGULATE_TEMP = "keep things at a specific temperature in a pot"
    PACKAGE = "mix ingredient in a cardboard, allow the box to be sent to needy user"


class StatusEnum(Enum):
    COMPLETE = "COMPLETE"
    INCOMPLETE = "INCOMPLETE"
    SUCCESSFUL = "SUCCESSFUL"
    FAILED = "FAILED"

