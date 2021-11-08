import json
import os
import sys
import unittest

from dotenv import load_dotenv, find_dotenv

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
load_dotenv(find_dotenv())

from app import create_app, db
from app.v1.controllers.menu_items import MenuItems

application_json_header = "application/json"


class MenuItemsHTTPTests(unittest.TestCase, MenuItems):

    def setUp(self):

        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['DEBUG'] = True
        self.app_ctx = self.app.app_context()
        self.app_ctx.push()
        self.app = self.app.test_client()

        self.uri = "/v1/menu_items"

        db.create_all()

    def tearDown(self):
        self.app_ctx.pop()

    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_add_menu_item(self):

        request_body = {
            "name": "test_http_menu_item",
            "price": 4.50,
            "overcooked_level": 1,
            "storage_duration": 1,
            "recent_date": "2021-11-08"
        }

        response = self.app.post(self.uri,
                                 data=json.dumps(request_body),
                                 follow_redirects=False,
                                 headers={'Content-Type': application_json_header})

        self.assertEqual(response.status_code, 201)
        self.assertNotEqual(response.status_code, 500)
        self.assertEqual(isinstance(response.json, dict), True)


if __name__ == "__main__":
    unittest.main()
