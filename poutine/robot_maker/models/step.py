from marshmallow import post_load, fields, Schema
from sqlalchemy import Column, Integer, ForeignKey, Table
from sqlalchemy.orm import relationship, backref

from robot_maker.db import Base
from robot_maker.models.enums import StatusEnum
from robot_maker.models.ingredient import Ingredient, IngredientSchema
from robot_maker.models.robot import Robot, RobotSchema, Action, ActionSchema

step_ingredients = Table("step_ingredients", Base.metadata,
                         Column('step_id', Integer, ForeignKey('steps.id'), primary_key=True),
                         Column('ingredient_id', Integer, ForeignKey('ingredients.id'), primary_key=True))

step_actions = Table("step_actions", Base.metadata,
                     Column('step_id', Integer, ForeignKey('steps.id'), primary_key=True),
                     Column('action_id', Integer, ForeignKey('actions.id'), primary_key=True))


class Step(Base):
    __tablename__ = 'steps'
    id = Column(Integer, primary_key=True)
    recipe_id = Column(Integer, ForeignKey('recipes.id'), nullable=False)
    robot_id = Column(Integer, ForeignKey('robots.id'))
    robot = relationship("Robot", backref=backref("Step", uselist=False))
    actions = relationship('Action',
                           secondary=step_actions,
                           lazy='subquery',
                           backref=backref('steps', lazy=True))
    ingredients = relationship('Ingredient',
                               secondary=step_ingredients,
                               lazy='subquery',
                               backref=backref('steps', lazy=True))

    def __init__(self, actions: list[Action], ingredients: list[Ingredient], robot: Robot = None, id=None):
        self.id = id
        self.actions = actions
        self.ingredients = ingredients
        self.robot = robot
        self.status = None
        self.log = None
        self.recipe_id = None
        self.robot_id = robot.id if robot is not None else None

    def __repr__(self):
        return f"<Step(id={self.id!r})>"

    def execute(self, executed_actions):
        status, executed_actions, _, log = self.robot.run(executed_actions, self.actions, list(self.ingredients))
        if status:
            self.status = StatusEnum.SUCCESSFUL
        else:
            self.status = StatusEnum.FAILED

        self.log = log
        return self, executed_actions


class StepSchema(Schema):
    id = fields.Integer()
    actions = fields.List(fields.Nested(ActionSchema))
    ingredients = fields.List(fields.Nested(IngredientSchema))
    robot = fields.Nested(RobotSchema)
    status = fields.Str()

    @post_load
    def make_ingredient(self, data, **kwargs):
        return Step(**data)
