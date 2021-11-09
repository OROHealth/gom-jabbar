from datetime import date
from dataclasses import dataclass
from enum import unique, Enum


@unique
class MenuItemCategory(Enum):
    DRINK = 'drink'
    FOOD = 'food'


@dataclass(frozen=True, order=True)
class MenuItemType:

    name: str = ""
    price: float = 0
    overcooked_level: int = 0
    storage_duration: int = 0
    recent_date: date = str(date.today())
    category: str = 'food'

