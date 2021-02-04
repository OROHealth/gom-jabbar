from django.urls import path
from . import views
from cafe.views import OrderCreateView, OrderUpdateView, DashboardView
from django.contrib.auth.decorators import login_required, permission_required

app_name = 'cafe' 
urlpatterns = [ 
    path('orders/', views.index, name='index'),
    path('orders/tables/', views.tables, name='tables'),
    path('orders/edit/', login_required(OrderCreateView.as_view()), name='edit_order'),
    path('orders/update/<int:pk>/', login_required(OrderUpdateView.as_view()), name='update_order'),
    path('served/', views.served, name='served'),
    path('bill/', views.bill, name='bill'),
    path('paiement/', views.paiement, name='paiement'),
    path('ticket/<int:pk>', views.ticket, name='ticket'),
    path('comment/index/', views.comment_index, name='comment_index'),
    path('comment/', views.comment, name='comment'),
    path('dashboard/', login_required(views.DashboardView.as_view()), name='dashboard'),
    path('dashboard_data/', views.dashboard_data, name='dashboard_data'),
]