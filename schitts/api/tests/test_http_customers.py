import json
import os
import sys
import unittest

from dotenv import load_dotenv, find_dotenv

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
load_dotenv(find_dotenv())

from app import create_app, db
from app.v1.controllers.customers import Customers
from app.models import CustomerOrder, MenuItem, Customer, CustomerType

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

        customer_type_count = CustomerType.total.fget(CustomerType)

        if customer_type_count < 1:
            return

        customer_type = CustomerType.query.first()

        request_body = {
            "name": "test_http_customer",
            "customer_type_id": customer_type.id,
        }

        response = self.app.post(self.uri,
                                 data=json.dumps(request_body),
                                 follow_redirects=False,
                                 headers={'Content-Type': application_json_header})

        self.assertEqual(response.status_code, 201)
        self.assertNotEqual(response.status_code, 500)
        self.assertEqual(isinstance(response.json, dict), True)

    def test_add_customer_order(self):

        total_menu_count = MenuItem.total.fget(MenuItem)
        customer_count = Customer.total.fget(Customer)

        if total_menu_count < 1 or customer_count < 1:
            return

        customer = Customer.query.first()
        item = MenuItem.query.first()

        request_body = {
            "customer_id": customer.id,
            "menu_item_id": item.id,
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

        order_count = CustomerOrder.total.fget(CustomerOrder)

        if order_count < 1:
            return

        order = CustomerOrder.query.first()

        request_body = {
            "order_id": order.id,
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
