from django.db import models
# Allow logical deleting (https://buildmedia.readthedocs.org/media/pdf/django-safedelete/latest/django-safedelete.pdf)
from safedelete.models import SafeDeleteModel, SOFT_DELETE, SOFT_DELETE_CASCADE
# Trace all actions on the database (https://django-simple-history.readthedocs.io/en/latest/)
from simple_history.models import HistoricalRecords
# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#onetoone
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.mail import send_mail
import random, string
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Count

class Tables(SafeDeleteModel):
    """ A class to create a new table instance in the Schitt's Creek Cafe Tropical. """

    _safedelete_policy = SOFT_DELETE_CASCADE
    table_id = models.AutoField("Table id", primary_key = True)
    number = models.IntegerField("Number of customer", null=True, blank=True)
    available = models.BooleanField("Available")
    created_at = models.DateTimeField("Date created", auto_now_add = True)
    log = HistoricalRecords()

    class Meta:

        db_table = 'Tables'
        verbose_name_plural = 'Tables'
        ordering = ['table_id']

    def __str__(self):

        return f"Table {self.table_id} - {self.number} person(s)"


class Orders_Menus(SafeDeleteModel):
    """ A class to create a new Orders_Menus instance in the Schitt's Creek Cafe Tropical. """
    
    _safedelete_policy = SOFT_DELETE_CASCADE
    order = models.ForeignKey("Orders", on_delete = models.CASCADE)
    menu = models.ForeignKey("Menus", on_delete = models.CASCADE)
    cooking = models.IntegerField("Cooking", default=0, null=True, blank=True)
    tone = models.IntegerField("Tone", default=0, null=True, blank=True)
    log = HistoricalRecords()

    class Meta:

        db_table = 'Orders_Menus'


class Customers_Orders_Comments(SafeDeleteModel):
    """ A class to create a new Customers_Orders instance in the Schitt's Creek Cafe Tropical. """
    
    _safedelete_policy = SOFT_DELETE_CASCADE
    order = models.ForeignKey("Orders", on_delete = models.CASCADE)
    customer = models.ForeignKey("Customers", on_delete = models.CASCADE)
    comment = models.OneToOneField("Comments", on_delete = models.CASCADE, null=True, blank=True)
    log = HistoricalRecords()

    class Meta:

        db_table = 'Customers_Orders_Comments'

class Orders(SafeDeleteModel):
    """ A class to create a new order instance in the Schitt's Creek Cafe Tropical. """

    _safedelete_policy = SOFT_DELETE_CASCADE
    order_id = models.AutoField("Order id", primary_key = True)
    table = models.ForeignKey(Tables, on_delete = models.CASCADE) # related table
    customers = models.IntegerField("Number of customer", null=True, blank=True)
    split_bill = models.IntegerField("Split bill", null=True, blank=True)
    delivered = models.BooleanField("Delivered", null=True, blank=True, default=False)
    paid = models.BooleanField("Available", null=True, blank=True, default=False)
    created_at = models.DateTimeField("Date created", auto_now_add = True)
    log = HistoricalRecords()

    class Meta:

        db_table = 'Orders'
        verbose_name_plural = 'Orders'
        ordering = ['order_id']

    def __str__(self):

        return f"{self.order_id}"


class Menus(SafeDeleteModel):
    """ A class to create a new Menu instance in the Schitt's Creek Cafe Tropical. """

    _safedelete_policy = SOFT_DELETE_CASCADE
    menu_id = models.AutoField("Order id", primary_key = True)
    orders = models.ManyToManyField("Orders", through = Orders_Menus, related_name = "OrdersMenus") # Orders_Menus
    item = models.CharField("Name", max_length = 100, null=True, blank=True)
    price = models.DecimalField("Price", max_digits=5, decimal_places=2, null=True, blank=True)
    last_order_date = models.DateTimeField("Last order date", null=True, blank=True)
    conservation = models.IntegerField("Conservation (min)", default=0, null=True, blank=True)
    available = models.BooleanField("Available", null=True, blank=True)
    created_at = models.DateTimeField("Date created", auto_now_add = True)
    log = HistoricalRecords()

    class Meta:

        db_table = 'Menus'
        verbose_name_plural = 'Menus'
        ordering = ['menu_id']

    def __str__(self):

        return f"{self.item}"


class Customers(SafeDeleteModel):
    """ A class to create a new Customer instance in the Schitt's Creek Cafe Tropical. """

    _safedelete_policy = SOFT_DELETE_CASCADE
    customer_id = models.AutoField("Customer id", primary_key = True)
    orders = models.ManyToManyField(Orders, through = Customers_Orders_Comments, related_name = "CustomersOrdersComments") #, related_name = "Customers_Orders") # Customers_Orders
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    customer_type = models.IntegerField("Customer type", default=0, null=True, blank=True)
    drink_preferences = models.IntegerField("Drink preferences", default=0, null=True, blank=True)
    food_preferences = models.IntegerField("Food preferences", default=0, null=True, blank=True)
    created_at = models.DateTimeField("Date created", auto_now_add = True)
    log = HistoricalRecords()

    class Meta:

        db_table = 'Customers'
        verbose_name_plural = 'Customers'
        ordering = ['customer_id']

    @property
    def number_orders(self):
        """ return the number of orders for a given customer"""
        # SELECT order_id,count(*) FROM "Customers_Orders_Comments" WHERE customer_id=1 GROUP BY order_id ORDER BY order_id;
        return self.orders.all().annotate(num_orders=Count('order_id')).count()

    def number_orders_year(self,year):
        """ return the number of orders for a given customer and a given year"""
        return self.orders.filter(created_at__year=year).annotate(num_orders=Count('order_id')).count()        

    def __str__(self):

        return f"{self.customer_id}"

# https://simpleisbetterthancomplex.com/tutorial/2017/02/18/how-to-create-user-sign-up-view.html#sign-up-with-profile-model
@receiver(post_save, sender=User)
def create_user_customers(sender, instance, created, **kwargs):
    if created:
        Customers.objects.create(user=instance)


class Comments(SafeDeleteModel):
    """ A class to create a new Comment instance in the Schitt's Creek Cafe Tropical. """

    _safedelete_policy = SOFT_DELETE_CASCADE
    comment_id = models.AutoField("Customer id", primary_key = True)
    title = models.CharField("Title", max_length = 50, null=True, blank=True)
    comment = models.CharField("Comment", max_length = 250, null=True, blank=True)
    rate = models.IntegerField("Rate", null=True, blank=True)
    like = models.IntegerField("Likes", null=True, blank=True)
    dislike = models.IntegerField("Dislikes", null=True, blank=True)
    created_at = models.DateTimeField("Date created", auto_now_add = True)
    log = HistoricalRecords()

    class Meta:

        db_table = 'Comments'
        verbose_name_plural = 'Comments'
        ordering = ['comment_id']

    def __str__(self):

        return f"{self.comment_id}"