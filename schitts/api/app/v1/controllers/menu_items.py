import http

from app.models import MenuItem, MenuItemSchema
from app.v1.types.menu_items import MenuItemType
from app import db


class MenuItems:

    @classmethod
    async def add_menu_item(cls, data: MenuItemType):
        try:

            item = MenuItem(
                name=data.name,
                price=data.price,
                overcooked_level=data.overcooked_level,
                storage_duration=data.storage_duration,
                recent_date=data.recent_date,
                category=data.category,
            )

            db.session.add(item)
            db.session.commit()

            schema = MenuItemSchema(exclude=["orders"])
            result = schema.dump(item)

            return result, http.HTTPStatus.CREATED
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
