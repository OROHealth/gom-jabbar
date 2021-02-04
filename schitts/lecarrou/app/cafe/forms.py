from django import forms
from cafe.models import Tables, Orders, Menus, Orders_Menus, Customers, Customers_Orders_Comments, Comments

from django.forms.models import ModelForm, inlineformset_factory
from django.forms import BaseInlineFormSet
from django.forms import modelformset_factory
from django.forms import ModelChoiceField
from django.forms.models import ModelChoiceIterator
from django.forms.fields import ChoiceField
from django.core.exceptions import ValidationError
from django.db.models import Q
from django.utils import timezone
from datetime import datetime, timedelta 
from dateutil.relativedelta import *

class TableEditForm(forms.ModelForm):

    def __init__(self, request, *args, **kwargs):
        super(TableEditForm, self).__init__(*args, **kwargs)
        TABLES = [(table.table_id,'Table n°'+str(table.table_id)) for table in Tables.objects.filter(available = True)]
        TABLES.insert(0, (None, ''))
        self.fields["table_id"] = forms.ChoiceField(label = "Table number", widget = forms.Select, choices = TABLES)
    
    class Meta:
        model = Tables
        fields = ('table_id',)


class OrderCreateForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop("request")
        super(OrderCreateForm, self).__init__(*args, **kwargs)
        TABLES = Tables.objects.filter(available = True)

        self.fields["table"] = forms.ModelChoiceField(queryset = TABLES, label = "Table", widget = forms.Select())
        self.fields["customers"] = forms.IntegerField(label = "Customers number", widget = forms.Select())

    class Meta:
        model = Orders
        fields = ('order_id','table','customers',)


class OrderUpdateForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop("pk")
        super(OrderUpdateForm, self).__init__(*args, **kwargs)
        ORDER = Orders.objects.get(order_id = self.request)
        print('pk',self.request)
        print('ORDER.customers',ORDER.customers)
        TABLES = Tables.objects.filter(available = True)
        CUSTOMERS = Customers.objects.all()
        self.fields["table"] = forms.ModelChoiceField(queryset = TABLES, label = "Table", widget = forms.Select(attrs={'readonly':'readonly'}), initial = ORDER.table)
        self.fields["customers"] = forms.IntegerField(label = "Customers number", initial = ORDER.customers)

    class Meta:
        model = Orders
        fields = ('order_id','table','customers',)


COOKING = [(None,''),(1,'1'),(2,'2'),(3,'3'),(4,'4'),(5,'5'),(6,'6'),(7,'7'),(8,'8'),(9,'9'),(10,'10')]# TO DO: choice list to be conditionned on selected table
TONES = [(None,''),(1,'Angry'),(2,'Happy'),(3,'Overwhelmed'),(4,'Pregnant'),(5,'Moody'),(6,'Bored'),(7,'Excited')] # TO DO: choice list to be conditionned on thesaurus

MenuFormset = inlineformset_factory(
    Orders, Orders_Menus, 
    fields=('cooking','menu','tone'),
    widgets={
        'cooking': forms.Select(choices = COOKING),
        'tone': forms.Select(choices = TONES),
        'menu': forms.Select(),
    },
    extra=1,
    can_delete=True,
    
)

UpdateMenuFormset = inlineformset_factory(
    Orders, Orders_Menus,  
    fields=('cooking','menu','tone'),
    widgets={
        'cooking': forms.Select(choices = COOKING),
        'tone': forms.Select(choices = TONES),
        'menu': forms.Select(),
    },
    extra=0,
    can_delete=True,
)

CustomerFormset = inlineformset_factory(
    Orders, Customers_Orders_Comments,
    fields=('order','customer','comment'),
    extra=1,
    can_delete=True,
)



class CommentIndexForm(forms.Form):
    def __init__(self, request, *args, **kwargs):
        super(CommentIndexForm, self).__init__(*args, **kwargs)
        self.fields["order_id"] = forms.IntegerField(label = "Order id", widget = forms.TextInput())
    

class CommentForm(forms.ModelForm):

    def __init__(self, request, *args, **kwargs):
        super(CommentForm, self).__init__(*args, **kwargs)
        self.request = request
        self.user = request.user.id
        print('user',self.user)

    order_id = forms.IntegerField(label = "Order number (available on your bill)", widget = forms.TextInput())
    title = forms.CharField(label='Title')
    comment = forms.CharField(widget=forms.Textarea)
    rate = forms.ChoiceField(label = "How would you rate your experience at Schitt\'s Creek Cafe Tropical? ", widget = forms.Select(),choices = [(None,''),(0,'Bad experience'),(1,'Quite good experience'),(2,'Good experience'),(3,'Very good experience')])

    def clean(self):
        cleaned_data = super(CommentForm, self).clean()
        c_id = Customers.objects.get(user = self.user).customer_id
        if Customers_Orders_Comments.objects.filter(Q(customer_id = c_id) & Q(order_id = self.data.get('order_id')) & ~Q(comment_id = None)).exists():
            raise forms.ValidationError('You have already add a comment for this order. You can only add one comment per order.')


    class Meta:
        model = Comments
        fields = ('order_id','title','comment','rate')
    
    def clean_order_id(self):
        data = self.cleaned_data['order_id']
        if not Orders.objects.filter(Q(order_id = data) & Q(paid = True)).exists():
            raise forms.ValidationError('This order id does not exist. Please check your bill.')
        return data


# formulaire non lié à un model
class DashboardForm(forms.Form):

    def __init__(self, *args, **kwargs):
        super(DashboardForm, self).__init__(*args, **kwargs)
        orders = Orders.objects.all()
        self.fields["start_date"] = forms.DateField(
            label = "Start date", 
            widget=forms.DateInput(format='%d/%m/%Y',attrs={'placeholder': '01/01/2021'}),
            input_formats=['%d/%m/%Y',],
            required=True, initial=timezone.now()+relativedelta(months=-6)
        )
        # empêche l'autocomplétion
        self.fields['start_date'].widget.attrs.update({
            'autocomplete': 'off'
        })
        self.fields["end_date"] = forms.DateField(
            label = "End date", 
            widget=forms.DateInput(format='%d/%m/%Y',attrs={'placeholder': '01/01/2021'}),
            input_formats=['%d/%m/%Y',],
            required=True, initial=timezone.now()
        )
        self.fields['end_date'].widget.attrs.update({
            'autocomplete': 'off'
        })
    
    def clean(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get("start_date")
        end_date = cleaned_data.get("end_date")
        if start_date and end_date:
            if start_date > end_date:
                raise ValidationError('Start date can not be posterior to end date')
    
    def clean_start_date(self):
        data = self.cleaned_data['start_date']
        entrydate = datetime.datetime.strptime(str(data), "%Y-%m-%d")
        currentdate = datetime.datetime.now()
        if entrydate > currentdate:
            raise forms.ValidationError(_("Please check entry date"))
        return data
    
    def clean_end_date(self):
        data = self.cleaned_data['end_date']
        entrydate = datetime.datetime.strptime(str(data), "%Y-%m-%d")
        currentdate = datetime.datetime.now()
        if entrydate > currentdate:
            raise forms.ValidationError(_("Please check entry date"))
        return data
