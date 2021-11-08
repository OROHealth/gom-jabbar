import asyncio
import http

from flask_restx import Namespace, Resource, reqparse

from app.v1.controllers.menu_items import MenuItems
from app.v1.types.menu_items import MenuItemType

menu_items_ns = Namespace('menu_items', description='menu items namespace.')

from app.v1.models.menu_items import (
    add_menu_item
)


@menu_items_ns.route("", strict_slashes=False)
class AddMenuItem(Resource):
    @menu_items_ns.expect(add_menu_item)
    def post(self):
        """ add a menu items. """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop = asyncio.get_event_loop()
            parser = reqparse.RequestParser(bundle_errors=True)
            parser.add_argument('name', type=str, required=True)
            parser.add_argument('price', type=float, required=True)
            parser.add_argument('overcooked_level', type=int, required=True)
            parser.add_argument('storage_duration', type=int, required=True)
            parser.add_argument('recent_date', type=str, required=True)
            args = parser.parse_args()
            result = loop.run_until_complete(
                MenuItems.add_menu_item(
                    data=MenuItemType(
                        name=args.name,
                        price=args.price,
                        overcooked_level=args.overcooked_level,
                        storage_duration=args.storage_duration,
                        recent_date=args.recent_date
                    ))
            )
            return result
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
        finally:
            loop.close()