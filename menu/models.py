from django.db import models

# Create your models here.
class Menu(models.Model):
  menu_type = models.CharField(max_length=64)
  is_small = models.BooleanField(blank=True) # To accomodate size neutral items
  price = models.DecimalField(max_digits=4, decimal_places=2, blank=True) # To accomodate toppings
  # orders to access all the orders contained the item