from django import template
from parameters.models import Thesaurus, ThesaurusOption


register = template.Library()

@register.simple_tag
def option_label(thesaurus_id, code, language, *args, **kwargs):
	try :
		return Thesaurus.option_label(int(thesaurus_id), int(code), language)
	except:
		return ''
