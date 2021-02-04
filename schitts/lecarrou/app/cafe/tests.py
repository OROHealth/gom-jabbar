from django.test import TestCase
from django.conf import settings
from django.contrib.auth.management import create_permissions
from randomuser import RandomUser
import random
from django.utils import timezone
from datetime import datetime, timedelta 
from dateutil.relativedelta import *
from faker import Faker
import pytz
import requests
from django.contrib.auth.models import User
from cafe.models import Orders, Menus, Tables, Customers, Customers_Orders_Comments, Orders_Menus
from django.db.models import Q
from django.db.models import Max, Min
from datetime import timedelta
from django.db.models import Count
import string
import csv
from distutils.util import strtobool


# ----------------------------------------- Tests unitaires --------------------------------------------------

# pour lancer les tests class par class : py manage.py test cafe.tests.CafeTestCase


# get random string without repeating letters
def get_random_string(length):
    str = string.hexdigits
    return ''.join(random.choice(str) for i in range(length))

class CafeTestCase(TestCase):

    # Define a setUp class to have setUp run only once for each tests
    # if not, setUp is run for every test and generate pk and constraint conflicts
    @classmethod
    def setUpClass(cls):
        super(CafeTestCase, cls).setUpClass()

        # admin, Twyla, Davis Rose, Alexis Rose, Moira Rose already exist in database (data migration to initialize database)
        
        for i in range(9995):
            u = User.objects.create(
                username = get_random_string(8),
                first_name = get_random_string(8),
                last_name = get_random_string(8),
                email = str(get_random_string(8))+'@'+'cafetropical.com',
                password = 'pbkdf2_sha256$150000$qQLXtfRCoMiw$w3OHPMWaU+Xd2oihppp5DQbmZdmAx56KbNvJrrJxKj4=',
                date_joined = timezone.now()
            )

        for customer in Customers.objects.filter(customer_id__gt=5):
            customer.customer_type = 1
            customer.drink_preferences = 1
            customer.food_preferences = 1
            customer.save()

        # print('number of customer created',User.objects.all().count())

        # create orders associated to customers
        
        users = [user.id for user in User.objects.filter(id__gt=5)] 
        menus = [menu.menu_id for menu in Menus.objects.all()]
        tables = [table for table in Tables.objects.all()]
        initial_orders = Orders.objects.all().count()

        # print('users',users)
        # print('menus',menus)
        # print('tables',tables)
        # print('initial_orders - total orders by data migration',initial_orders)
        # fake random date using faker
        fake = Faker()

        # STEP 1
        # loop over the 10000 customers to determine how many orders they did individually 
        # randomly choosen beetween 2 and 14 per year over 2 years (01/01/2021 - 31/12/2022)
        # save in a list of tuples: individuals_orders = [(customer_id,number),]
        # and how many orders in total for the 10000 customers

        # start_date_year1 = timezone.now()+relativedelta(years=-2)
        # end_date_year1= timezone.now()+relativedelta(years=-1,days=-1)
        # start_date_year2 = timezone.now()+relativedelta(years=-1)
        # end_date_year2 = timezone.now()
        start_date_year1 = datetime(2021,1,1) 
        end_date_year1 = datetime(2021,12,31) 
        start_date_year2 = datetime(2022,1,1) 
        end_date_year2 = datetime(2022,12,31) 

        # print('start_date_year1',start_date_year1)
        # print('end_date_year1',end_date_year1)
        # print('start_date_year2',start_date_year2)
        # print('end_date_year2',end_date_year2)

        individuals_orders_year1 = []
        individuals_orders_year2 = []
        total_orders_year1 = 0
        total_orders_year2 = 0

        customers = Customers.objects.filter(customer_id__gt=5)
        for customer in customers:
            n1 = random.randrange(2,14)
            n2 = random.randrange(2,14)
            individuals_orders_year1.append((customer.customer_id,n1))
            individuals_orders_year2.append((customer.customer_id,n2))
            total_orders_year1 += n1
            total_orders_year2 += n2

        # print('individuals_orders_year1',individuals_orders_year1)
        # print('individuals_orders_year2',individuals_orders_year2)
        # print('total_orders_year1',total_orders_year1)
        # print('total_orders_year2',total_orders_year2)

        # STEP 2    
        # loop over the range of total_orders to create Orders
        for order in range(total_orders_year1):
            o = Orders.objects.create(
                table = random.sample(tables,k=1)[0],
                customers = random.randrange(1,6),
                split_bill = random.randrange(1,3),
                delivered = True,
                paid = True,
            )
            o.created_at = fake.date_time_between_dates(datetime_start=start_date_year1, datetime_end=end_date_year1, tzinfo=pytz.utc)
            # print(o.order_id,o.created_at)
            o.save()

        for order in range(total_orders_year2):
            o = Orders.objects.create(
                table = random.sample(tables,k=1)[0],
                customers = random.randrange(1,6),
                split_bill = random.randrange(1,3),
                delivered = True,
                paid = True,
            )
            o.created_at = fake.date_time_between_dates(datetime_start=start_date_year2, datetime_end=end_date_year2, tzinfo=pytz.utc)
            # print(o.order_id,o.created_at)
            o.save()

        # print('Orders.objects.all()',Orders.objects.all())


        # STEP 3
        # 'link' Customers to Orders (model Customers_Orders_Comments)
        # should take account of orders already attributed by data migration
        orders_year1 = list(range(initial_orders+1,initial_orders+total_orders_year1+1))
        # print('orders_year1',orders_year1)
        for customer in individuals_orders_year1:
            # print('customer[0] ',customer[0] )
            for i in range(customer[1]):
                order_id = random.sample(orders_year1,k=1)[0] # selection d'une commande dans la liste des commandes
                # print('order_id',order_id)
                orders_year1.remove(order_id) # suppression de la commande attribuée précédemment
                customer_id = customer[0] 
                Customers_Orders_Comments.objects.create(
                    order_id = order_id,
                    customer_id = customer_id
                )

        orders_year2 = list(range(initial_orders+total_orders_year1+1,initial_orders+total_orders_year1+total_orders_year2+1))
        # print('orders_year2',orders_year2)
        for customer in individuals_orders_year2:

            for i in range(customer[1]):
                order_id = random.sample(orders_year2,k=1)[0] # selection d'une commande dans la liste des commandes
                orders_year2.remove(order_id) # suppression de la commande attribuée précédemment
                customer_id = customer[0] 
                Customers_Orders_Comments.objects.create(
                    order_id = order_id,
                    customer_id = customer_id
                )

        # STEP 4
        # 'link' Menus items to Orders (model Orders_Menus)
        # only one menus item per customer even if it should more (drink, main course, dessert, etc...)
        for order in Orders.objects.all():
            for i in range(order.customers): # an order menus should be created for each customers related to this order
                Orders_Menus.objects.create(
                    order_id = order.order_id,
                    menu_id = random.sample(menus,k=1)[0],
                    tone = random.randrange(1,7),
                    cooking = random.randrange(1,10)
                )
        
    # number of customers created
    def test_users_created(self):
        
        users = User.objects.all().count()
        # print('users',users)
        # 10005 customers (including admin, Twyla, and the 3 Rose's familly members) created
        self.assertEqual(10000,users)

    # order's dates over a period of 2 years (2021 and 2022)
    def test_orders_over_2_years(self):
        delta = timedelta(days=730) # 2 * 365 days
        # print('delta',delta)
        min_date = Orders.objects.all().aggregate(Min('created_at'))['created_at__min'] 
        max_date = Orders.objects.all().aggregate(Max('created_at'))['created_at__max'] 
        calc_delta = max_date - min_date
        # print('calc_delta',calc_delta)
        self.assertLessEqual(calc_delta,delta)

    def test_orders_2_to_14_per_year(self):
    
            for customer in Customers.objects.filter(~Q(user_id = User.objects.get(username='twyla').id) & ~Q(user_id = User.objects.get(username='admin').id)):
                # print('number of order per customer (2021/2022)',customer.user_id,customer.number_orders_year(2021),customer.number_orders_year(2022))
                # print(customer.number_orders)
                # for a in Customers.objects.get(customer_id=customer.customer_id).orders.all():
                #     print(a.created_at,a.order_id)
                self.assertLessEqual(customer.user_id,customer.number_orders_year(2021)>=2 and customer.user_id,customer.number_orders_year(2021) <=12)
                self.assertLessEqual(customer.user_id,customer.number_orders_year(2022)>=2 and customer.user_id,customer.number_orders_year(2022) <=12)
    

 








# ----------------------------------------- Fin tests unitaires --------------------------------------------------