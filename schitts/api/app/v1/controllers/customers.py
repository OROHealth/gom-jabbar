import http

from sqlalchemy import or_
from sqlalchemy.orm import load_only

from app import db
from app.models import Customer, CustomerSchema, CustomerType, CustomerTypeSchema, CustomerReaction, \
    CustomerReactionSchema, MenuItem, CustomerOrder, CustomerOrderSchema, CustomerFeedback, CustomerFeedbackSchema
from app.v1.types.customers import CustomerOrderType, CustomerFeedbackType


class Customers:

    @classmethod
    async def add_customer(cls, name: str, type_id: int):
        try:

            customer = Customer(name=name, customer_type_id=type_id)

            db.session.add(customer)
            db.session.commit()

            schema = CustomerSchema()
            result = schema.dump(customer)

            return result, http.HTTPStatus.CREATED
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    def add_customer_type(cls, name: str):
        try:

            customer_type = CustomerType(name=name)

            db.session.add(customer_type)
            db.session.commit()

            schema = CustomerTypeSchema(only=['id', 'name'])
            result = schema.dump(customer_type)

            return result, http.HTTPStatus.CREATED
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    def add_customer_reaction(cls, name: str):
        try:

            customer_type = CustomerReaction(name=name)

            db.session.add(customer_type)
            db.session.commit()

            schema = CustomerReactionSchema(only=['id', 'name'])
            result = schema.dump(customer_type)

            return result, http.HTTPStatus.CREATED
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @property
    async def get_reactions(self):
        try:

            reactions = CustomerReaction.query.all()

            schema = CustomerReactionSchema(only=['id', 'name'], many=True)
            result = schema.dump(reactions)

            return result, http.HTTPStatus.OK
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @property
    async def get_types(self):
        try:

            customer_types = CustomerType.query.all()

            schema = CustomerReactionSchema(only=['id', 'name'], many=True)
            result = schema.dump(customer_types)

            return result, http.HTTPStatus.OK
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    async def add_customer_preference(cls, user_id: int, item_id: int):
        try:

            customer = Customer.query.filter_by(id=user_id).first()
            item = MenuItem.query.filter_by(id=item_id).first()

            customer.preferences.append(item)

            db.session.add(customer)
            db.session.commit()

            schema = CustomerSchema()
            result = schema.dump(customer)

            return result, http.HTTPStatus.OK
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    async def add_customer_order(cls, data: CustomerOrderType):
        try:

            order = CustomerOrder(
                customer_id=data.customer_id,
                menu_item_id=data.menu_item_id,
                customer_reaction_id=data.customer_reaction_id,
                customer_count=data.customer_count,
                bill_type=data.bill_type,
                payment_status=data.payment_status
            )

            db.session.add(order)
            db.session.commit()

            schema = CustomerOrderSchema()
            result = schema.dump(order)

            return result, http.HTTPStatus.CREATED
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    async def add_customer_feedback(cls, data: CustomerFeedbackType):
        try:

            feedback = CustomerFeedback(
                order_id=data.order_id,
                comment=data.comment,
                service_rating=data.service_rating
            )

            db.session.add(feedback)
            db.session.commit()

            schema = CustomerFeedbackSchema()
            result = schema.dump(feedback)

            return result, http.HTTPStatus.CREATED
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    async def search_out_of_town_customer(cls, name: str):
        try:
            conditions = [
                Customer.name.ilike(name + "%"),
            ]

            client = Customer.query.options(
                load_only('id', 'name')
            ).filter(
                or_(*conditions)
            ).order_by(
                Customer.date_added.desc()
            ).all()

            schema = CustomerSchema(many=True, only=('id', 'name', 'customer_type'))
            result = schema.dump(client)

            return {"count": len(result), "customers": result}, http.HTTPStatus.OK
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

