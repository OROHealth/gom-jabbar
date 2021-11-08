from .customers import (
    Customer,
    CustomerSchema,
    CustomerType,
    CustomerTypeSchema,
    CustomerReaction,
    CustomerReactionSchema,
    CustomerOrder,
    CustomerOrderSchema,
    CustomerFeedback,
    CustomerFeedbackSchema
)

from .items import (MenuItem, MenuItemSchema)

MODELS_SCHEMAS = [
    Customer,
    CustomerSchema,
    Customer,
    CustomerSchema,
    CustomerType,
    CustomerTypeSchema,
    CustomerReaction,
    CustomerReactionSchema,
    CustomerOrder,
    CustomerOrderSchema,
    CustomerFeedback,
    CustomerFeedbackSchema,
    MenuItem,
    MenuItemSchema
]


# Execute model and schema
def init():
    for models_n_schema in MODELS_SCHEMAS:
        return models_n_schema
