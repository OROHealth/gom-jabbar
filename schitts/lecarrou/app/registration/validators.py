from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
import re

class MerevaValidator:
    def __init__(self):
        pass

    def validate(self, password, user=None):
        if len(re.findall(r'[!"#$%&\')(*+,-./:;<=>?@\]\[^_`}{~€|£$%§]',password)) < 2 :
            raise ValidationError(
                _("Ce mot de passe doit contenir au moins 2 caractères spéciaux ([!\"#$%&\')(*+,-./:;<=>?@][^_`}{~€|£$%§])."),
                code='invalid_password',
                params={},
            )

    def get_help_text(self):
        return _(
            "Votre mot de passe doit contenir au moins 2 caractères spéciaux ([!\"#$%&\')(*+,-./:;<=>?@][^_`}{~€|£$%§])."
        )
