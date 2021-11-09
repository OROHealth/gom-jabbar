import asyncio
import http

from flask_restx import Namespace, Resource

from app.v1.controllers.statistics import Statistics

statistics_ns = Namespace('statistics', description='statistics namespace.')


@statistics_ns.route("", strict_slashes=False)
class GetEightRatedCurrentSemesterIcome(Resource):
    def get(self):
        """ get current semester eight rated items. """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop = asyncio.get_event_loop()
            result = loop.run_until_complete(
                Statistics.get_past_semester_rate_eight_dinners()
            )
            return result
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
        finally:
            loop.close()
