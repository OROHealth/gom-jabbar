from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.conf import settings
import requests


def home(request):
    
    print('ENVIRONMENT',settings.ENVIRONMENT)
    return render(request, 'home.html', {
        'environment':settings.ENVIRONMENT,
        
    })


def contact(request):
    authenticated = request.user.is_authenticated
    return render(request, 'contacts.html', {'authenticated':authenticated,})

# https://comments.eu1.gigya.com/comments.getUserComments

