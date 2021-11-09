from sqlalchemy.sql import func

from app import db, ma

# Many-To-Many relationship between customers and menu items, producing customer-item preferences.

customer_preferences = db.Table('customer_preferences', db.Model.metadata,
                                db.Column('customer_id',
                                          db.ForeignKey('customer.id',
                                                        ondelete="CASCADE",
                                                        onupdate="CASCADE"),
                                          nullable=False),
                                db.Column('menu_item_id',
                                          db.ForeignKey('menu_item.id',
                                                        onupdate="CASCADE",
                                                        ondelete="CASCADE"),
                                          nullable=False
                                          ),
                                db.Column('date_added', db.DateTime(timezone=True), server_default=func.now())
                                )


class Customer(db.Model):

    __tablename__ = "customer"

    id = db.Column(db.INTEGER, primary_key=True, autoincrement=True, unique=True, nullable=False)
    name = db.Column(db.VARCHAR(120), nullable=False, unique=True)
    customer_type_id = db.Column(
        db.INTEGER,
        db.ForeignKey('customer_type.id', ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False
    )
    orders = db.relationship("CustomerOrder")
    customer_type = db.relationship('CustomerType', foreign_keys=[customer_type_id])
    preferences = db.relationship("MenuItem", secondary=customer_preferences)
    date_added = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __init__(self, name: str, customer_type_id: int):
        self.name = name
        self.customer_type_id = customer_type_id

    @property
    def total(self):
        count = self.query.count()
        return count


class CustomerSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'customer_type', 'date_added')
    customer_type = ma.Nested('CustomerTypeSchema', only=['name'])


class CustomerType(db.Model):

    __tablename__ = "customer_type"

    id = db.Column(db.INTEGER, primary_key=True, autoincrement=True, unique=True, nullable=False)
    name = db.Column(db.VARCHAR(120), nullable=False, unique=True)
    date_added = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __init__(self, name: str):
        self.name = name

    @property
    def total(self):
        count = self.query.count()
        return count


class CustomerTypeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'date_added')


class CustomerReaction(db.Model):

    __tablename__ = "customer_reaction"

    id = db.Column(db.INTEGER, primary_key=True, autoincrement=True, unique=True, nullable=False)
    name = db.Column(db.VARCHAR(120), nullable=False, unique=True)

    def __init__(self, name: str):
        self.name = name


class CustomerReactionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


class CustomerOrder(db.Model):

    __tablename__ = "customer_order"

    id = db.Column(db.INTEGER, primary_key=True, autoincrement=True, unique=True, nullable=False)
    customer_id = db.Column(
        db.INTEGER,
        db.ForeignKey('customer.id', ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False
    )
    menu_item_id = db.Column(
        db.INTEGER,
        db.ForeignKey("menu_item.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False
    )
    menu_item = db.relationship("MenuItem", back_populates="orders")
    customer_reaction_id = db.Column(
        db.INTEGER,
        db.ForeignKey("customer_reaction.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False
    )
    customer_reaction = db.relationship("CustomerReaction", foreign_keys=[customer_reaction_id])
    customer_count = db.Column(db.INTEGER, default=1, nullable=False)
    bill_type = db.Column(db.Enum(
        'person', 'group', 'ratio',
        name="bill_type",
        create_type=True),
        server_default="person",
        nullable=False
    )
    payment_status = db.Column(db.Enum(
        'pending', 'paid', 'cancelled',
        name="payment_status",
        create_type=True),
        server_default="pending",
        nullable=False
    )
    is_ready = db.Column(db.BOOLEAN, default=False, nullable=False)
    date_added = db.Column(db.DateTime(timezone=True), server_default=func.now())


class CustomerOrderSchema(ma.Schema):
    class Meta:
        fields = (
            'id', 'menu_item', 'customer_reaction',
            'customer_count', 'bill_type', 'payment_status',
            'is_ready', 'date_added'
        )

    menu_item = ma.Nested('MenuItemSchema', exclude=['date_added'])
    customer_reaction = ma.Nested('CustomerReactionSchema', only=['name'])


class CustomerFeedback(db.Model):

    __tablename__ = "customer_feedback"
    id = db.Column(db.INTEGER, primary_key=True, autoincrement=True, unique=True, nullable=False)
    order_id = db.Column(
        db.INTEGER,
        db.ForeignKey('customer_order.id', ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False
    )
    order = db.relationship('CustomerOrder', foreign_keys=[order_id])
    comment = db.Column(db.TEXT, nullable=False)
    service_rating = db.Column(db.INTEGER, nullable=False)
    date_added = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __init__(self, comment: str, service_rating: int, order_id: int):
        self.comment = comment
        self.service_rating = service_rating
        self.order_id = order_id


class CustomerFeedbackSchema(ma.Schema):
    class Meta:
        fields = ('order', 'comment', 'service_rating')

    order = ma.Nested('CustomerOrderSchema')
