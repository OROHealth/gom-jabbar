from django import template
from cafe.models import Menus, Orders, Orders_Menus


register = template.Library()

@register.filter(name='total')
def total(order, *args, **kwargs):
    orders = Orders_Menus.objects.select_related('menu').filter(order_id=order.order_id)
    total = 0
    for order in orders:
        total += order.menu.price
    return total
