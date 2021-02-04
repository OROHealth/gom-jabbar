from django.db import models
# Allow logical deleting (https://buildmedia.readthedocs.org/media/pdf/django-safedelete/latest/django-safedelete.pdf)
from safedelete.models import SafeDeleteModel, SOFT_DELETE, SOFT_DELETE_CASCADE
# Trace all actions on the database (https://django-simple-history.readthedocs.io/en/latest/)
from simple_history.models import HistoricalRecords
# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#onetoone
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models import Q
import csv
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.db.models.signals import pre_save, post_save
from django.core.mail import send_mail
import random, string
from django.utils.translation import gettext
from functools import wraps
from rest_framework.authtoken.models import Token
from django.conf import settings


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

@receiver(post_save, sender=User)
def email_new_user(sender, instance, created, **kwargs):
    user_email = []
    if created and instance.email != '':
        print("Created")
        password = generer_mot_de_passe(8)  # on génère un mot de passe de 8 caractères
        instance.password = password.get("pbkdf2")
        instance.save()
        user_email.append(instance.email)
        email = email_compte(user_email, instance.username, password.get("plaintext"))
    else:
        print("Not Created")


def generer_mot_de_passe(length):
    """Générer une chaîne aléatoire de longueur fixe"""
    motDePasse = {}
    str = string.hexdigits
    password_plaintext = ''.join(random.choice(str) for i in range(length))
    password_crypt = make_password(password_plaintext)
    motDePasse['plaintext'] = password_plaintext
    motDePasse['pbkdf2'] = password_crypt
    return motDePasse


# envoi d'email lors de la création d'un compte utilisateur
def email_compte(user_email, identifiant, password):
    subject = gettext('[Cafe Tropical] API - User account ')
    message = \
        gettext('Hello,\n\n') + \
        gettext('Here are your login details for the Schitt\'s Creek Cafe Tropical API') + \
        gettext('\n\nEmail: ') + str(user_email[0]) + \
        gettext('\n\nLogin: ') + str(identifiant) + \
        gettext('\n\nPassword: ') + str(password) + \
        gettext('\n\nWe recommend that you change this password the first time you log in.') + \
        '\n\nSchitt\'s Creek Cafe Tropical team'
    email_from = 'j.lecarrou@hotmail.fr'

    email = send_mail(subject, message, email_from, user_email)

    return email



class Thesaurus(SafeDeleteModel):
	""" A class to create a thesaurus variable instance. """

	_safedelete_policy = SOFT_DELETE_CASCADE
	thesaurus_id = models.AutoField(primary_key=True)
	label = models.CharField("Label", max_length=150)
	log = HistoricalRecords()

	class Meta:

		db_table = 'Thesaurus'
		verbose_name_plural = 'Thesaurus'
		ordering = ['thesaurus_id']

	def __str__(self):

		return f"{self.thesaurus_id} : {self.label}"

	@classmethod
	def options_list(cls,thesaurus_id):
		""" return the list of response options for a thesaurus variable. """

		the = Thesaurus.objects.get(pk=int(thesaurus_id))
		the_opts_set = ThesaurusOption.objects.filter(the=the)
		the_opts_list = [(opt.the_opt_cod, opt.the_opt_lab_eng) for opt in the_opts_set]
		the_opts_list.insert(0, (None, ''))
		return the_opts_list

	@classmethod
	def option_label(cls,thesaurus_id,thesaurus_option_code,language):
		""" Return an response option label. """

		the = Thesaurus.objects.get(pk=int(thesaurus_id))
		return ThesaurusOption.objects.get(the=the,thesaurus_option_code=thesaurus_option_code).label


class ThesaurusOption(SafeDeleteModel):
	""" A class to create a response option instance for a thesaurus variable. """

	_safedelete_policy = SOFT_DELETE
	Thesaurus_option_id = models.AutoField(primary_key=True)
	thesaurus = models.ForeignKey(Thesaurus, verbose_name='Thesaurus', related_name='options',
		on_delete=models.CASCADE) # related thesaurus viariable
	code = models.IntegerField("Code") # Response Option Code
	label = models.CharField("Label", max_length=100)
	log = HistoricalRecords()

	class Meta:

		db_table = 'ThesaurusOption'
		verbose_name = 'ThesaurusOptions'
		ordering = ['Thesaurus_option_id','code']

	def __str__(self):

		return f"{self.Thesaurus_option_id} : {self.label} "