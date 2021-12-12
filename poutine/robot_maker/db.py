import os
import sqlite3
from pathlib import Path

import click
from flask import current_app, g
from flask.cli import with_appcontext
from robot_maker.logger import console
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlite3 import OperationalError


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def init_db(resource):
    db = get_db()

    with current_app.open_resource(resource) as f:
        db.executescript(f.read().decode('utf8'))


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    try:
        with console.status("Loading examples db", spinner="line"):
            init_db('schema.sql')
    except OperationalError as e:
        console.log("[bold red]An error occured while applying DB schema[/]", markup=True)
        
    console.log("[bold green]Successfully applied database schema[/]", markup=True)


@click.command('dump-db')
@with_appcontext
def dump_db_command():
    """Clear the existing data and create new tables."""
    try:
        with console.status("Loading examples db", spinner="line"):
            init_db('dump.sql')
    
    except OperationalError as e:
        console.log("[bold red]An error occured while loading example DB[/]", markup=True)
    console.log('[bold green]Successfully loaded example DB[/]', markup=True)


instance_path = os.path.join(Path(__file__).parent.parent, 'instance')

engine = create_engine(f"sqlite:///{os.path.join(instance_path, 'robot_maker.sqlite')}")
metadata = MetaData()
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()


def init_sql_alchemy():
    import robot_maker.models
    Base.metadata.create_all(bind=engine)


def init_app(app):
    metadata.create_all(bind=engine)
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(dump_db_command)
