from django.conf import settings
from django.http import HttpResponseRedirect
from django.core import serializers
from django.contrib import auth
from django.contrib.auth.models import User
from django.db.models import Q
from datetime import datetime, timedelta

def initialisation(get_response):

    def middleware(request):
        response = get_response(request)

        return response

    return middleware