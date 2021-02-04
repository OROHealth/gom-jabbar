from celery import shared_task
from django.core import management
from django.core.management.commands import loaddata
from django.utils import timezone
from django.conf import settings
import sys
from django.core.mail import send_mail
import os



@shared_task
def daily_backup():

    try:          
        management.call_command('dbbackup','--verbosity=3','-o=cafe_backup_'+timezone.now().strftime("%Y-%m-%d_%H%M")+'.psql')
        return f"Backed up successfully: {timezone.now()}"
    except:
        return f"Could not be backed up: {timezone.now()}"


