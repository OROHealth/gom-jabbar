# Generated by Django 2.2.5 on 2021-01-18 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cafe', '0002_auto_20201216_1039'),
    ]

    operations = [
        migrations.AddField(
            model_name='customers',
            name='orders',
            field=models.ManyToManyField(related_name='CustomersOrdersComments', through='cafe.Customers_Orders_Comments', to='cafe.Orders'),
        ),
    ]
