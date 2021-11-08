import os

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(
        host=os.getenv('APP_HOST'),
        port=int(os.getenv('APP_PORT')),
        debug=bool(os.environ.get("APP_DEBUG", "False") == 'true')
    )
