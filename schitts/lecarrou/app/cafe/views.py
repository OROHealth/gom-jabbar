from django.shortcuts import render
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import permission_required
from django.core.mail import send_mail
from django.forms import modelformset_factory
from django.utils import timezone
from django.contrib.auth.models import User
from cafe.models import Tables, Orders, Orders_Menus, Comments, Customers, Customers_Orders_Comments
from cafe.forms import TableEditForm, OrderCreateForm, MenuFormset, OrderUpdateForm, UpdateMenuFormset, CustomerFormset, CommentForm, CommentIndexForm, DashboardForm #, BillForm
from django.views.generic.edit import CreateView, UpdateView, FormView
from django.views.generic.base import TemplateView
from django.conf import settings
import io
from django.http import FileResponse
from reportlab.pdfgen import canvas
from datetime import datetime, timedelta 
from django.utils import timezone
from dateutil.relativedelta import *
from django.db.models import Avg
from django.db.models.functions import TruncMonth
from django.db.models import Max, Min, Count, Sum
from django.http import JsonResponse
from django.core import serializers
from django.db.models import Q


@login_required
def index(request):
 
    orders = Orders.objects.all() # only ongoing orders (not paid)
    # orders = Orders.objects.filter(paid = False) # only ongoing orders (not paid)
    print('orders',orders)

    return render(request, 'cafe/index.html', {'orders':orders,})

@login_required
def tables(request):
    if request.method == "POST":
        form = TableEditForm(request, data=request.POST or None)
        if form.is_valid():

            form.save()

            return redirect('home')
    else:
        form = TableEditForm(request.POST) #.POST ?


    return render(request, 'cafe/table.html', {'form':form})


class OrderCreateView(FormView):
    
    template_name = 'cafe/order.html'
    form_class = OrderCreateForm

    def get_form_kwargs(self):
        kwargs = super(OrderCreateView, self).get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)

        # List of option = customers for tables
        tables = {}
        for table in Tables.objects.all():
            options = []
            for i in range(table.number):
                options.append(i+1)
            tables[table.table_id] = options

        # context to distinguish template form and update template
        data["template"] = "new"
        data["tables"] = tables
        # print(tables)
        if self.request.POST:
            data["menu"] = MenuFormset(self.request.POST)
            data["customer"] = CustomerFormset(self.request.POST)
        else:
            data["menu"] = MenuFormset()
            data["customer"] = CustomerFormset()
        return data

    def form_valid(self, form):
        context = self.get_context_data()
        print('table',form.cleaned_data['table'])
        menu = context["menu"]
        # self.object = object Orders_Menus to edit
        self.object = form.save(commit=False)


        if menu.is_valid():
            self.object.save()
            menu.instance = self.object # instance Orders_Menus
            menu.save()
            # table no more available
            Tables.objects.filter(table_id = form.cleaned_data['table'].table_id).update(available = False)
        else:
            return render(self.request, self.template_name, context)

        return super().form_valid(form)

    def get_success_url(self):
        return reverse("cafe:index")



class OrderUpdateView(FormView):
    template_name = 'cafe/order.html'
    form_class = OrderUpdateForm
    
    def get_form_kwargs(self):
        kwargs = super(OrderUpdateView, self).get_form_kwargs()
        kwargs['pk'] = self.kwargs['pk']
        # kwargs['request'] = self.request
        # print('views pk',self.kwargs['pk']) # PK of Order instance
        # print('views kwargs',kwargs)
        return kwargs

    def get_context_data(self, **kwargs):
        data = super(OrderUpdateView,self).get_context_data(**kwargs)
        instance = Orders.objects.get(order_id = self.kwargs['pk'])
        data['instance'] = instance

        # context to distinguish template form and update template
        data["template"] = "update"
       
        if self.request.POST:
            data["menu"] = UpdateMenuFormset(self.request.POST, instance=instance)
        else: 
            data["menu"] = UpdateMenuFormset(instance=instance)
        return data

    def form_valid(self, form):
        context = self.get_context_data()
        menu = context["menu"]
      
        if menu.is_valid():
            menu.save()
            Orders.objects.filter(order_id = self.kwargs['pk']).update(customers = form.cleaned_data['customers'])
        else:
            return render(self.request, self.template_name, context)

        return super().form_valid(form)

    def get_success_url(self):
        return reverse("cafe:index")


# Ajax query to check order as served from dashboard
def served(request):
     
    if request.method == "POST":
        served = request.POST.get('served')
        # print('served',served)
        order_id = request.POST.get('order_id')
        # print('order_id',order_id)
        # Update Orders model
        Orders.objects.filter(order_id = order_id).update(delivered = served)

    return render(request, 'cafe/index.html', {})


# Ajax query to check order as served from dashboard
def bill(request):
     
    if request.method == "POST":
        bill = request.POST.get('bill')
        # print('bill',bill)
        order_id = request.POST.get('order_id')
        # print('order_id',order_id)
        # Update Orders model
        Orders.objects.filter(order_id = order_id).update(split_bill = bill)

    return render(request, 'cafe/index.html', {})


# Ajax query to pay from dashboard
def paiement(request):
     
    if request.method == "POST":
        paiement = request.POST.get('paiement')
        # print('paiement',paiement)
        order_id = request.POST.get('order_id')
        # print('order_id',order_id)
        # Update Orders model
        Orders.objects.filter(order_id = order_id).update(paid = paiement)
        # made table available
        table_id = Orders.objects.get(order_id = order_id).table_id
        Tables.objects.filter(table_id = table_id).update(available = True)

    return render(request, 'cafe/paiement.html', {})


# @login_required
def ticket(request, pk): 
    # Create a file-like buffer to receive PDF data.
    buffer = io.BytesIO()
    orders = Orders_Menus.objects.select_related('menu').filter(order_id=pk)

    p = canvas.Canvas(buffer)

    # En-tête du formulaire
    title = 'Schitt\'s Creek Cafe Tropical'
    order_id = str(pk)
    order = Orders.objects.get(order_id = pk)
    order_date = str(timezone.now().strftime("%d/%m/%Y"))

    # Draw things on the PDF. Here's where the PDF generation happens.
    # See the ReportLab documentation for the full list of functionality.
    p.drawImage(str(settings.BASE_DIR) + '/static/images/logo.png', 462, 770,69.25,40.25)
    p.drawString(50, 800, title)
    p.drawString(50, 780, 'order number:')
    p.drawString(150, 780, order_id)
    p.drawString(50, 760, 'order date:')
    p.drawString(150, 760, str(order.created_at.strftime("%d/%m/%Y")))
    p.line(50,750,530,750)

    # bill
    start = 700
    i = 0
    total = 0
    for order in orders:
        total += order.menu.price
        p.drawString(50, start, order.menu.item)
        p.drawString(460, start, str(order.menu.price))
        p.drawString(500, start, ' $ CA ')
        i += 20
        start -= i
    p.line(50,start,530,start)
    p.drawString(50, start - 20, 'Total')
    p.drawString(460, start - 20, str(total))
    p.drawString(500, start - 20, ' $ CA ')


    # Pied de page
    p.drawString(50, 70, 'Thanks for visiting Cafe Tropical.')
    p.drawString(50, 85, 'Please let a comment on our website using www.tropicalecafe.ca using order id.')
    p.drawString(50, 100, 'Print date: ')
    p.drawString(120, 100, order_date)

    # Close the PDF object cleanly, and we're done.
    p.showPage()
    p.save()

    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file.
    buffer.seek(0)

    return FileResponse(buffer, as_attachment=True, filename='ticket_'+order_id+'_'+order_date+'.pdf')


# 'free' access for customers
def comment_index(request):
    
    comments = Customers_Orders_Comments.objects.select_related('customer').filter(~Q(comment_id=None))
    
    return render(request, 'cafe/comment_index.html', {'comments':comments})


# private access for customers that have an account and a valid order_id
@login_required
def comment(request):
     
    if request.method == "POST":
        form = CommentForm(request, request.POST)
        if form.is_valid():
            comment = form.save()
 
            # save data in Customers_Orders_Comments
            # Customers_Orders_Comments.objects.filter(Q(customer_id = Customers.objects.get(user = request.user).customer_id) & Q(order_id = request.POST.get("order_id", ""))).update(comment_id = comment.comment_id)
            Customers_Orders_Comments.objects.create(
                customer_id = Customers.objects.get(user = request.user).customer_id,
                order_id = request.POST.get("order_id", ""),
                comment_id = comment.comment_id
            )
            return redirect('cafe:comment_index')
    else:
        form = CommentForm(request)

    return render(request, 'cafe/comment.html', {'form':form})


class DashboardView(TemplateView):
    template_name='cafe/dashboard.html'
    # https://www.youtube.com/watch?v=1OL5n06kO_w
    def get_context_data(self,**kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = form = DashboardForm()
        start_date = timezone.now()+relativedelta(months=-6)
        end_date = timezone.now()
        context['qs'] = Orders.objects.filter(created_at__range=[start_date,end_date]).annotate(month=TruncMonth('created_at')).values('month').annotate(number=Count('order_id')).values('month', 'number').order_by('month')
        # context['qs1'] = Orders.objects.all()
        
          
        return context


def dashboard_data(request):
     
    qs = None

    if request.is_ajax() and request.method == "POST":
        start_date = datetime.strptime(request.POST.get('start_date'), '%d/%m/%Y')
        end_date = datetime.strptime(request.POST.get('end_date'), '%d/%m/%Y')+timedelta(days=1)
        # print('start_date',start_date)
        # print('end_date',end_date)

        qs = Orders.objects.filter(created_at__range=[start_date,end_date]).annotate(month=TruncMonth('created_at')).values('month').annotate(number=Count('order_id')).values('month', 'number').order_by('month')
 
        return JsonResponse({'data': list(qs)}, status=200)
    return JsonResponse({'data':'error'}, status=400)
