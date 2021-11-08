from datetime import date

from flask_restx import fields
from app.v1.namespaces.customers import customers_ns

add_menu_item = customers_ns.model("add menu item", {
    "name": fields.String(description="expected menu item name"),
    "price": fields.Float(description="expected menu item price"),
    "overcooked_level": fields.Integer(description="expected menu item overcooked level"),
    "storage_duration": fields.Integer(description="expected menu item storage duration"),
    "recent_date": fields.Date(description="expected menu item last date it was made", default=date.today())
})
