from flask_restx import fields
from app.v1.namespaces.customers import customers_ns

add_customer_model = customers_ns.model("add customer", {
    "name": fields.String(description="expected customer name"),
    "customer_type_id": fields.Integer(description="expected customer type id")
})

add_customer_order_model = customers_ns.model("add customer order", {
    "customer_id": fields.Integer(description="expected customer id"),
    "menu_item_id": fields.Integer(description="expected menu item id"),
    "customer_reaction_id": fields.Integer(description="expected customer order reaction id"),
    "customer_count": fields.Integer(description="expected number of customers on order"),
    "bill_type": fields.String(description="expected bill type"),
    "payment_status": fields.String(description="expected payment status"),
    "is_ready": fields.Boolean(description="expected order status", default=False)
})

add_customer_order_feedback_model = customers_ns.model("add customer order feedback", {
    "order_id": fields.Integer(description="expected order id"),
    "comment": fields.String(description="expected comment"),
    "service_rating": fields.Integer(description="expected rating")
})

search_out_of_town_customer_model = customers_ns.model("search out of town customer", {
    "name": fields.String(description="expected customer name")
})
