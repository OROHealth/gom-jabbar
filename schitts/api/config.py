import os


class Base:

    SQLALCHEMY_TRACK_MODIFICATIONS = bool(os.environ.get("SQLALCHEMY_TRACK_MODIFICATIONS", "False") == 'true')
    SQLALCHEMY_ECHO = bool(os.environ.get("SQLALCHEMY_ECHO", "False") == 'true')
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': int(os.environ.get("SQLALCHEMY_ENGINE_OPTIONS_POOL_SIZE")),
        'pool_recycle': int(os.environ.get("SQLALCHEMY_ENGINE_OPTIONS_POOL_RECYCLE")),
        'max_overflow': int(os.environ.get("SQLALCHEMY_POOL_MAX_OVERFLOW")),
        'pool_pre_ping': bool(os.environ.get("SQLALCHEMY_ENGINE_OPTIONS_POOL_PRE_PING", "False") == 'true')
    }
    SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")

    SWAGGER_BASEPATH = os.environ.get("SWAGGER_BASEPATH")
    SWAGGER_UI_JSONEDITOR = os.environ.get("SWAGGER_UI_JSONEDITOR")
    CORS_HEADERS = os.environ.get("CORS_HEADERS")
    BUNDLE_ERRORS = os.environ.get("BUNDLE_ERRORS")
    SWAGGER_UI_OPERATION_ID = os.environ.get("SWAGGER_UI_OPERATION_ID")
    SWAGGER_UI_REQUEST_DURATION = os.environ.get("SWAGGER_UI_REQUEST_DURATION")
    RESTX_INCLUDE_ALL_MODELS = bool(os.environ.get("RESTX_INCLUDE_ALL_MODELS", "False") == 'true')

    COMPRESS_MIMETYPES = os.environ.get("COMPRESS_MIMETYPES").split(',')
    COMPRESS_LEVEL = int(os.environ.get("COMPRESS_LEVEL"))
    COMPRESS_MIN_SIZE = int(os.environ.get("COMPRESS_MIN_SIZE"))
    COMPRESS_REGISTER = os.environ.get("COMPRESS_REGISTER")

    REDIS_HOST = os.environ.get("REDIS_HOST")
    REDIS_URL = os.environ.get("REDIS_URL")
    REDIS_PORT = int(os.environ.get("REDIS_PORT"))
    REDIS_DB = os.environ.get("REDIS_DB")
    REDIS_CHARSET = os.environ.get("REDIS_CHARSET")
    REDIS_DECODE_RESPONSES = os.environ.get("REDIS_DECODE_RESPONSES")

    CACHE_TYPE = os.environ.get("CACHE_TYPE")
    CACHE_DEFAULT_TIMEOUT = int(os.environ.get("CACHE_DEFAULT_TIMEOUT"))
    CACHE_REDIS_URL = os.environ.get("CACHE_REDIS_URL")

    DEFAULT_CUSTOMER_TYPES = os.environ.get("DEFAULT_CUSTOMER_TYPES").split(',')
    DEFAULT_CUSTOMER_REACTIONS = os.environ.get("DEFAULT_CUSTOMER_REACTIONS").split(',')
