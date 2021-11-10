import asyncio
import http

from flask_restx import Namespace, Resource, reqparse

from app.v1.controllers.customers import Customers
from app.v1.types.customers import CustomerOrderType, CustomerFeedbackType

customers_ns = Namespace('customers', description='customers namespace.')

from app.v1.models.customers import (
    add_customer_model,
    add_customer_order_model,
    add_customer_order_feedback_model,
    search_out_of_town_customer_model
)

pagination = customers_ns.parser()
pagination.add_argument('limit', type=int, help="Result set limit", location='args', required=True, default=10)
pagination.add_argument('page', type=int, help="Current page pagination", location='args', required=True, default=1)


@customers_ns.route("", strict_slashes=False)
class AddCustomer(Resource):
    @customers_ns.expect(add_customer_model)
    def post(self):
        """ add a customer. """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop = asyncio.get_event_loop()
            parser = reqparse.RequestParser(bundle_errors=True)
            parser.add_argument('name', type=str, required=True)
            parser.add_argument('customer_type_id', type=int, required=True)
            args = parser.parse_args()
            result = loop.run_until_complete(
                Customers.add_customer(name=args.name, type_id=args.customer_type_id)
            )
            return result
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
        finally:
            loop.close()

    @customers_ns.expect(pagination)
    def get(self):
        """ get customers. """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop = asyncio.get_event_loop()
            parser = reqparse.RequestParser(bundle_errors=True)
            parser.add_argument('page', type=int, required=True)
            parser.add_argument('limit', type=int, required=True)
            args = parser.parse_args()
            result = loop.run_until_complete(
                Customers.get_customers(page=args.page, limit=args.limit)
            )
            return result
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
        finally:
            loop.close()


@customers_ns.route("/reactions")
class GetCustomerReactions(Resource):

    def get(self):
        """ get the list of existing customer reactions. """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop = asyncio.get_event_loop()
            customers = Customers()
            result = loop.run_until_complete(customers.get_reactions)
            return result
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
        finally:
            loop.close()


@customers_ns.route("/types")
class GetCustomerTypes(Resource):

    def get(self):
        """ get the list of existing customer types. """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop = asyncio.get_event_loop()
            customers = Customers()
            result = loop.run_until_complete(customers.get_types)
            return result
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
        finally:
            loop.close()


@customers_ns.route("/orders")
class AddCustomerOrder(Resource):
    @customers_ns.expect(add_customer_order_model)
    def post(self):
        """ add customer order. """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop = asyncio.get_event_loop()
            parser = reqparse.RequestParser(bundle_errors=True)
            parser.add_argument('customer_id', type=int, required=True)
            parser.add_argument('menu_item_id', type=int, required=True)
            parser.add_argument('customer_reaction_id', type=int, required=True)
            parser.add_argument('customer_count', type=int, required=True)
            parser.add_argument('bill_type', type=str, required=False)
            parser.add_argument('payment_status', type=str, required=False)
            parser.add_argument('is_ready', type=bool, required=False)
            args = parser.parse_args()
            result = loop.run_until_complete(
                Customers.add_customer_order(
                    data=CustomerOrderType(
                        customer_id=args.customer_id,
                        menu_item_id=args.menu_item_id,
                        customer_reaction_id=args.customer_reaction_id,
                        customer_count=args.customer_count,
                        bill_type=args.bill_type,
                        payment_status=args.payment_status
                    )
                )
            )
            return result
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
        finally:
            loop.close()


@customers_ns.route("/<customer_id>/orders")
class GetCustomerOrders(Resource):
    @customers_ns.expect(pagination)
    def get(self, customer_id):
        """ get customer orders. """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop = asyncio.get_event_loop()
            parser = reqparse.RequestParser(bundle_errors=True)
            parser.add_argument('page', type=int, required=False)
            parser.add_argument('limit', type=int, required=False)
            args = parser.parse_args()
            result = loop.run_until_complete(
                Customers.get_customer_orders(
                    customer_id=customer_id,
                    page=args.page,
                    limit=args.limit
                )
            )
            return result
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
        finally:
            loop.close()


@customers_ns.route("/orders/feedback")
class AddCustomerFeedback(Resource):
    @customers_ns.expect(add_customer_order_feedback_model)
    def post(self):
        """ add customer feedback. """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop = asyncio.get_event_loop()
            parser = reqparse.RequestParser(bundle_errors=True)
            parser.add_argument('order_id', type=int, required=True)
            parser.add_argument('comment', type=str, required=True)
            parser.add_argument('service_rating', type=int, required=True)
            args = parser.parse_args()
            result = loop.run_until_complete(
                Customers.add_customer_feedback(
                    data=CustomerFeedbackType(
                        order_id=args.order_id,
                        comment=args.comment,
                        service_rating=args.service_rating
                    )
                )
            )
            return result
        except Exception as e:
            return {
                       "message": "failed to add customer feedback",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
        finally:
            loop.close()


@customers_ns.route("/search/out-of-town")
class SearchCustomersOutOfTown(Resource):
    @customers_ns.expect(search_out_of_town_customer_model)
    def post(self):
        """ search customers out of town. """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop = asyncio.get_event_loop()
            parser = reqparse.RequestParser(bundle_errors=True)
            parser.add_argument('name', type=str, required=True)
            args = parser.parse_args()
            result = loop.run_until_complete(
                Customers.search_out_of_town_customer(args.name)
            )
            return result
        except Exception as e:
            return {
                       "message": "failed searching ut of town",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
        finally:
            loop.close()
