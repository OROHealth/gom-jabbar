import asyncio
import os
import sys
import unittest
from datetime import date

from dotenv import load_dotenv, find_dotenv

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
load_dotenv(find_dotenv())

from app import create_app, db
from app.v1.controllers.menu_items import MenuItems
from app.v1.types.menu_items import MenuItemType

application_json_header = "application/json"


class MenuItemsUnitTests(unittest.TestCase, MenuItems):

    def setUp(self):

        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['DEBUG'] = True
        self.app_ctx = self.app.app_context()
        self.app_ctx.push()
        self.app = self.app.test_client()

        db.create_all()

    def tearDown(self):
        self.app_ctx.pop()

    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_add_menu_item(self):

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        test_customer = loop.run_until_complete(
            self.add_menu_item(
                data=MenuItemType(
                    name="test_unit_menu_item",
                    price=4.05,
                    overcooked_level=1,
                    storage_duration=2,
                    recent_date=date.today()
                ))
        )

        loop.close()

        self.assertEqual(test_customer[1], 201)
        self.assertNotEqual(test_customer[1], 500)
        self.assertEqual(isinstance(test_customer[0], dict), True)


if __name__ == "__main__":
    unittest.main()
