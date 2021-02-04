from django.urls import path
from .views import UserRecordView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers

# app_name = 'api'
# urlpatterns = [
#     path('user/', UserRecordView.as_view(), name='users'),
#     path('api-token-auth/', obtain_auth_token, name='api-token-auth'),
# ]

from django.conf.urls import url 
from api import views 

app_name = 'api' 
urlpatterns = [ 
    path('user/', UserRecordView.as_view(), name='users'),
    path('api-token-auth/', obtain_auth_token, name='api-token-auth'),
    path('tutorials/', views.tutorial_list),
    path('tutorials/<int:pk>', views.tutorial_detail),
    path('tutorials/published/', views.tutorial_list_published)
]

