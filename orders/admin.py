from django.contrib import admin

from .models import Order, OrderedFood


# Register your models here.
admin.site.register(Order)
admin.site.register(OrderedFood)
