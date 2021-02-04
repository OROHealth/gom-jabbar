from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from rest_framework import routers


# from django.conf import settings
# import core
# from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home'),
    path('registration/', include('django.contrib.auth.urls')),
    path('signup/', include('registration.urls', namespace='registration')),
    path('contact/', views.contact, name='contact'),
    path('admin/', admin.site.urls),
    path('cafe/', include('cafe.urls', namespace='cafe')),
    path('api/', include('api.urls', namespace='api')),


] #+ static(core.settings.dev.STATIC_URL, document_root=core.settings.dev.STATIC_ROOT)

# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         path('__debug__/', include(debug_toolbar.urls)),

#     ] + urlpatterns
