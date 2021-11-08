import json
import os
import sys
import unittest

from dotenv import load_dotenv, find_dotenv

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
load_dotenv(find_dotenv())

from app import create_app, db
from app.v1.controllers.customers import Customers

application_json_header = "application/json"


class CustomersHTTPTests(unittest.TestCase, Customers):

    def setUp(self):

        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['DEBUG'] = True
        self.app_ctx = self.app.app_context()
        self.app_ctx.push()
        self.app = self.app.test_client()

        self.uri = "/v1/customers"

        db.create_all()

    def tearDown(self):
        self.app_ctx.pop()

    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_add_customer(self):

        request_body = {
            "name": "test_http_customer",
            "customer_type_id": 4,
        }

        response = self.app.post(self.uri,
                                 data=json.dumps(request_body),
                                 follow_redirects=False,
                                 headers={'Content-Type': application_json_header})

        self.assertEqual(response.status_code, 201)
        self.assertNotEqual(response.status_code, 500)
        self.assertEqual(isinstance(response.json, dict), True)

    def test_add_customer_order(self):

        request_body = {
            "customer_id": 6,
            "menu_item_id": 16,
            "customer_reaction_id": 2,
            "customer_count": 2,
            "bill_type": "group",
            "payment_status": "pending"
        }

        response = self.app.post(self.uri+"/orders",
                                 data=json.dumps(request_body),
                                 follow_redirects=False,
                                 headers={'Content-Type': application_json_header})

        self.assertEqual(response.status_code, 201)
        self.assertNotEqual(response.status_code, 500)
        self.assertEqual(isinstance(response.json, dict), True)

    def test_add_customer_feedback(self):

        request_body = {
            "order_id": 1,
            "comment": "test http customer feedback comment",
            "service_rating": 2
        }

        response = self.app.post(self.uri+"/orders/feedback",
                                 data=json.dumps(request_body),
                                 follow_redirects=False,
                                 headers={'Content-Type': application_json_header})

        self.assertEqual(response.status_code, 201)
        self.assertNotEqual(response.status_code, 500)
        self.assertEqual(isinstance(response.json, dict), True)


if __name__ == "__main__":
    unittest.main()
