import datetime
import http

from sqlalchemy.sql import func

from app import db, ma
from app.v1.types.menu_items import MenuItemCategory


class MenuItem(db.Model):

    __tablename__ = "menu_item"

    id = db.Column(db.INTEGER, primary_key=True, autoincrement=True, unique=True, nullable=False)
    name = db.Column(db.TEXT, nullable=False, unique=True)
    price = db.Column(db.FLOAT, nullable=False)
    overcooked_level = db.Column(db.INTEGER, nullable=False, default=0)
    storage_duration = db.Column(db.INTEGER, nullable=False, default=0)
    orders = db.relationship("CustomerOrder", back_populates="menu_item")
    recent_date = db.Column(db.DATE)
    category = db.Column(db.Enum(
        'food', 'drink',
        name="menu_item_category",
        create_type=True),
        server_default="food",
        nullable=False
    )

    date_added = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __init__(self,
                 name: str,
                 price: float,
                 overcooked_level: int,
                 storage_duration: int,
                 recent_date: datetime.date,
                 category: MenuItemCategory = 'food'
                 ):
        self.name = name
        self.price = price
        self.overcooked_level = overcooked_level
        self.storage_duration = storage_duration
        self.recent_date = recent_date
        self.category = category

    @property
    def total(self):
        count = MenuItem.query.count()
        return count


class MenuItemSchema(ma.Schema):
    class Meta:
        fields = (
            'id',
            'name',
            'price',
            'orders',
            'category',
            'overcooked_level',
            'recent_date',
            'storage_duration',
            'date_added'
        )
    orders = ma.Nested("CustomerOrderSchema", many=True, exclude=["menu_item"])
