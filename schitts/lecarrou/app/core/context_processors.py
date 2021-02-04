from django.conf import settings
from django.contrib.auth.models import User
from django.conf import settings

def data_context_processor(request):
    
    environment = settings.ENVIRONMENT

    if request.user.is_authenticated:
        pass

    return {'environment':environment,}
