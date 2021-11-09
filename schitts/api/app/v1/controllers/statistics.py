import http
from datetime import date

from sqlalchemy import func

from app.models import MenuItem, MenuItemSchema


class Statistics:

    @classmethod
    async def get_past_semester_rate_eight_dinners(cls):
        try:
            generate_prev_six_months = lambda x: x if x > 1 else 1
            # 1 - get 8 rated cooked dinners for the past six months.
            items = MenuItem.query.filter(
                MenuItem.overcooked_level == 8,
                func.date_part('year', MenuItem.date_added) == date.today().year,
                func.date_part('month', MenuItem.date_added) <= date.today().month,
                func.date_part('month', MenuItem.date_added) >= generate_prev_six_months(date.today().month - 6),
            ).all()

            schema = MenuItemSchema(many=True)
            result = list(map(cls.__income_earned, schema.dump(items)))
            return result, http.HTTPStatus.OK
            # 2 - get the total from orders with status paid for.
            # 3 - get the median rating of the meal if any ratings registered
            pass
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    def __income_earned(cls, item):
        total_orders = len(item["orders"])
        item["price"] = item["price"] * total_orders
        item["total_orders"] = total_orders
        del item["orders"]
        return item
