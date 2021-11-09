import http
from random import randint, choice

from app import db
from app.models import MenuItem, CustomerType, Customer, CustomerOrder


class Simulations:

    @classmethod
    def add_simulated_customers(cls, n: int):
        try:
            menu_items_count = MenuItem.total.fget(MenuItem)
            customer_types_count = CustomerType.total.fget(CustomerType)

            if menu_items_count == 0 or customer_types_count == 0:
                return

            item = MenuItem.query.first()
            customer_type = CustomerType.query.first()

            customers = []

            for i in range(1, n):

                customer = {
                    "name": f"simulated_customer_{i}",
                    "orders": [{
                        "id": x,
                        "customer_reaction_id": randint(1, 7),
                        "customer_count": randint(1, 10),
                        "bill_type": choice(["person", "group", "ratio"]),
                        "payment_status": choice(["pending", "paid", "cancelled"]),
                    } for x in range(2, 15)],
                }

                new_customer = Customer(
                    name=customer["name"],
                    customer_type_id=customer_type.id
                )

                for value in customer["orders"]:
                    order = CustomerOrder(
                        menu_item_id=item.id,
                        customer_reaction_id=value["customer_reaction_id"],
                        customer_count=value["customer_count"],
                        bill_type=value["bill_type"],
                        payment_status=value["payment_status"]
                    )
                    new_customer.orders.append(order)

                db.session.add(new_customer)

            db.session.commit()
            return True
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
