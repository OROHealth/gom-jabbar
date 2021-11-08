from datetime import date
from dataclasses import dataclass


@dataclass(frozen=True, order=True)
class MenuItemType:

    name: str = ""
    price: float = 0
    overcooked_level: int = 0
    storage_duration: int = 0
    recent_date: date = str(date.today())
