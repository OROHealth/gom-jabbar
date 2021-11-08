from dataclasses import dataclass
from enum import Enum, unique


@unique
class BillEnum(Enum):
    PERSON = 'person'
    GROUP = 'group'
    RATIO = 'ratio'


@unique
class PaymentStatusEnum(Enum):
    PENDING = 'pending'
    PAID = 'paid'
    CANCELLED = 'cancelled'


@dataclass(frozen=True, order=True)
class CustomerOrderType:

    customer_id: int = 0
    menu_item_id: int = 0
    customer_reaction_id: int = 0
    customer_count: int = 0
    bill_type: BillEnum = "person"
    payment_status: PaymentStatusEnum = "pending"
    is_ready: bool = False


@dataclass(frozen=True, order=True)
class CustomerFeedbackType:

    order_id: int = 0
    comment: str = ""
    service_rating: int = 0
