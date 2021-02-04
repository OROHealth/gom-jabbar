from django.urls import path
from . import views
# from django.contrib.auth import views
from registration import views


app_name='registration'
urlpatterns = [
    # path('login/', views.login, name='login'),
    # path('logout/', views.logout, name='logout'),
    path('', views.signup, name='signup'),
    path('profile/', views.profile, name='profile'),
]