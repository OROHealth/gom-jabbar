import http

from flask_restx import Namespace, Resource

from app.v1.controllers.migrations import Migrations

migration_ns = Namespace('migrations', description='database setup.')


@migration_ns.route("/init-migrations")
class CreateMigrationDirectory(Resource):
    def post(self):
        """ init alembic schema path. """
        try:
            init = Migrations.init()
            return init
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR


@migration_ns.route("/migrate-database")
class PrepareDatabaseMigrations(Resource):
    def post(self):
        """ prepare database alembic. """
        try:
            migrate = Migrations.migrate()
            return migrate
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR


@migration_ns.route("/upgrade-database")
class UpgradeDatabase(Resource):
    def post(self):
        """ upgrade database alembic. """
        try:
            upgrade = Migrations.upgrade()
            return upgrade
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR


@migration_ns.route("/downgrade-database")
class DowngradeDatabase(Resource):
    def post(self):
        """ downgrade database alembic. """
        try:
            downgrade = Migrations.downgrade()
            return downgrade
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR


@migration_ns.route("/customer-types")
class AddCustomerTypes(Resource):
    def post(self):
        """ migrate customer types. """
        try:
            downgrade = Migrations.migrate_customer_types()
            return downgrade
        except Exception as e:
            return {
                       "message": "failed migrating customer types",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR


@migration_ns.route("/customer-reactions")
class AddCustomerReactions(Resource):
    def post(self):
        """ migrate customer reactions. """
        try:
            downgrade = Migrations.migrate_customer_reaction()
            return downgrade
        except Exception as e:
            return {
                       "message": "failed migrating customer reactions",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR


@migration_ns.route("/simulate/customer-orders/<total>")
class SimulateCustomerOrders(Resource):
    def post(self, total):
        """ migrate simulate create customer orders. """
        try:
            downgrade = Migrations.migrate_customers_orders_simulation(total)
            return downgrade
        except Exception as e:
            return {
                       "message": "failed migrating customer reactions",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR\



@migration_ns.route("/defaults")
class MigrateDefaults(Resource):
    def post(self):
        """ mmigrate app default. """
        try:
            downgrade = Migrations.migrate_defaults()
            return downgrade
        except Exception as e:
            return {
                       "message": "failed migrating defaults",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
