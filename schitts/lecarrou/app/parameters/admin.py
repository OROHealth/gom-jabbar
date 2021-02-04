from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from parameters.models import Thesaurus, ThesaurusOption
from django.contrib.auth.models import User

class ThesaurusOptionInLine(admin.TabularInline):
    """ A class to allow managing responses options of thesaurus in admin space. """

    model = ThesaurusOption
    extra = 0

class ThesaurusAdmin(SimpleHistoryAdmin):
    """ A class to allow managing thesaurus in admin space. """

    list_display = ('thesaurus_id','label')
    search_fields = ('thesaurus_id','label')
    inlines = [
        ThesaurusOptionInLine,
    ]



admin.site.register(Thesaurus, ThesaurusAdmin)
