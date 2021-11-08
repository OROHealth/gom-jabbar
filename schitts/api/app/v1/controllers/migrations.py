import http
import os
import shutil
from pathlib import Path
from config import Base
from app.v1.controllers.customers import Customers

class Migrations(Base, Customers):

    env_file: str = "env.py"

    @classmethod
    def init(cls):
        try:
            migration_dir = Path(os.path.join(os.getcwd(), 'migrations'))
            archive_dir = Path(os.path.join(os.getcwd(), 'archives'))

            if not migration_dir.is_dir(): os.system('flask db init')

            if migration_dir.is_dir():
                for root, dirs, files in os.walk(migration_dir):
                    for name in files:
                        if name == cls.env_file:
                            os.remove(os.path.join(migration_dir, cls.env_file))
                src_file = os.path.join(os.path.join(archive_dir, "alembic"), cls.env_file)
                shutil.copy(src_file, migration_dir)

            return {"message": "successfully created migration directory"}, http.HTTPStatus.CREATED
        except OSError as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.FAILED_DEPENDENCY
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    def migrate(cls):
        try:
            os.system('flask db migrate')
            return {"message": "successfully prepared database schemas"}, http.HTTPStatus.OK
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    def upgrade(cls):
        try:
            os.system('flask db upgrade')
            return {"message": "successfully applied database schemas"}, http.HTTPStatus.OK
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    def downgrade(cls):
        try:
            os.system('flask db downgrade')
            return {"message": "successfully reverted database schemas to previous version."}, http.HTTPStatus.OK
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    def migrate_customer_types(cls):
        try:
            customer_types = map(cls.add_customer_type, cls.DEFAULT_CUSTOMER_TYPES)
            result = [customer_type[0] for customer_type in customer_types]
            return result, http.HTTPStatus.CREATED
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    def migrate_customer_reaction(cls):
        try:
            customer_reactions = map(cls.add_customer_reaction, cls.DEFAULT_CUSTOMER_REACTIONS)
            result = [customer_reaction[0] for customer_reaction in customer_reactions]
            return result, http.HTTPStatus.CREATED
        except Exception as e:
            return {
                       "message": "failed creating migration directory",
                       "error": str(e)
                   }, http.HTTPStatus.INTERNAL_SERVER_ERROR
