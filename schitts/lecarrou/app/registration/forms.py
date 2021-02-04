from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm):
    # birth_date = forms.DateField(help_text='Required. Format: YYYY-MM-DD')

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')


class ProfileForm(forms.Form):
    first_name = forms.CharField(label='First name')
    last_name = forms.CharField(label='Last name')
    email = forms.EmailField(label='Email',help_text='A valid email address, please.')
    customer_type = forms.ChoiceField(label = "Customer type ", widget = forms.Select(),choices = [(None,''),(1,'Out of town'),(2,'In town'),(3,'Part of the Rose\'s familly'),])
    drink_preferences = forms.ChoiceField(label = "What kind of drinks do you prefers? ", widget = forms.Select(),choices = [(None,''),(1,'Wine'),(2,'Cocktails with alchool'),(3,'Cocktails without alchool'),(4,'Sodas')])
    food_preferences = forms.ChoiceField(label = "What kind of drinks do you prefers?", widget = forms.Select(),choices = [(None,''),(1,'Vegan'),(2,'Vegetarian'),(3,'Flexitarian')])


