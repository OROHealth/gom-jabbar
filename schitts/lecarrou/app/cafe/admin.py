from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .models import Tables, Orders, Menus, Customers, Comments, Orders_Menus, Customers_Orders_Comments

# class TablesAdmin(SimpleHistoryAdmin):
#     """ A class to allow managing Tables in admin space. """

#     list_display = ('table_id','number','available','created_at')
 

# class OrdersAdmin(SimpleHistoryAdmin):
#     """ A class to allow managing Orders in admin space. """

#     list_display = ('order_id','table','customers','split_bill','delivered','paid','created_at')
 

# class MenusAdmin(SimpleHistoryAdmin):
#     """ A class to allow managing Menus in admin space. """

#     list_display = ('menu_id','orders','item','price','last_order_date','conservation','available','created_at')
    

# class CustomersAdmin(SimpleHistoryAdmin):
#     """ A class to allow managing Customers in admin space. """

#     list_display = ('customer_id','orders','user','customer_type','drink_preferences','food_preferences','created_at')
   

# class CommentsAdmin(SimpleHistoryAdmin):
#     """ A class to allow managing Comments in admin space. """

#     list_display = ('comment_id','title','comment','rate','like','dislike','created_at')
    

# class CustomersOrdersCommentsAdmin(SimpleHistoryAdmin):
#     """ A class to allow managing Customers_Orders_Comments in admin space. """

#     list_display = ('order','customer','comment')
    

# class OrdersMenusAdmin(SimpleHistoryAdmin):
#     """ A class to allow managing Orders_Menus in admin space. """

#     list_display = ('order','menu','cooking','tone')
    

# admin.site.register(Tables,TablesAdmin)
# admin.site.register(Orders,OrdersAdmin)
# admin.site.register(Menus,MenusAdmin)
# admin.site.register(Customers,CustomersAdmin)
# admin.site.register(Comments,CommentsAdmin)
# admin.site.register(Customers_Orders_Comments,CustomersOrdersCommentsAdmin)
# admin.site.register(Orders_Menus,OrdersMenusAdmin)
