import datetime
import http

from sqlalchemy.sql import func

from app import db, ma


class MenuItem(db.Model):

    __tablename__ = "menu_item"

    id = db.Column(db.INTEGER, primary_key=True, autoincrement=True, unique=True, nullable=False)
    name = db.Column(db.TEXT, nullable=False, unique=True)
    price = db.Column(db.FLOAT, nullable=False)
    overcooked_level = db.Column(db.INTEGER, nullable=False, default=0)
    storage_duration = db.Column(db.INTEGER, nullable=False, default=0)
    orders = db.relationship("CustomerOrder", back_populates="menu_item")
    recent_date = db.Column(db.DATE)
    date_added = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __init__(self,
                 name: str,
                 price: float,
                 overcooked_level: int,
                 storage_duration: 1,
                 recent_date: datetime.date
                 ):
        self.name = name
        self.price = price
        self.overcooked_level = overcooked_level
        self.storage_duration = storage_duration
        self.recent_date = recent_date

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
            'overcooked_level',
            'recent_date',
            'storage_duration',
            'date_added'
        )
    orders = ma.Nested("CustomerOrderSchema", many=True, exclude=["menu_item"])
