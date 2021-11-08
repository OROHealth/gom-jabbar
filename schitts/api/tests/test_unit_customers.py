import asyncio
import os
import sys
import unittest

from dotenv import load_dotenv, find_dotenv

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
load_dotenv(find_dotenv())

from app import create_app, db
from app.v1.controllers.customers import Customers
from app.models import MenuItem
from app.v1.types.customers import CustomerOrderType, CustomerFeedbackType

application_json_header = "application/json"


class CustomersUnitTests(unittest.TestCase, Customers):

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

    def test_add_customer(self):

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        test_customer = loop.run_until_complete(
            self.add_customer(name="test_unit_customer", type_id=4)
        )

        loop.close()

        self.assertEqual(test_customer[1], 201)
        self.assertNotEqual(test_customer[1], 500)
        self.assertEqual(isinstance(test_customer[0], dict), True)

    def test_add_customer_preference(self):

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        # Change this to handles 100000+ requests -> list of objects

        total_menu_count = MenuItem.total.fget(MenuItem)

        if total_menu_count < 1:
            return

        test_customer = loop.run_until_complete(
            self.add_customer_preference(user_id=6, item_id=16)
        )

        loop.close()

        self.assertEqual(test_customer[1], 200)
        self.assertNotEqual(test_customer[1], 500)
        self.assertEqual(isinstance(test_customer[0], dict), True)

    def test_add_customer_order(self):

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        test_customer = loop.run_until_complete(
            self.add_customer_order(
                data=CustomerOrderType(
                    customer_id=6,
                    menu_item_id=16,
                    customer_reaction_id=1,
                    customer_count=2
                )
            )
        )

        loop.close()

        self.assertEqual(test_customer[1], 201)
        self.assertNotEqual(test_customer[1], 500)
        self.assertEqual(isinstance(test_customer[0], dict), True)

    def test_add_customer_feedback(self):

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        test_feedback = loop.run_until_complete(
            self.add_customer_feedback(
                data=CustomerFeedbackType(
                    order_id=1,
                    comment="test unit customer feedback comment",
                    service_rating=4
                )
            )
        )

        loop.close()

        self.assertEqual(test_feedback[1], 201)
        self.assertNotEqual(test_feedback[1], 500)
        self.assertEqual(isinstance(test_feedback[0], dict), True)


if __name__ == "__main__":
    unittest.main()
