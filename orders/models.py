from django.db import models

from menu.models import Menu


class Order(models.Model):
  # PK is transaction ID
  items_ordered = models.ManyToManyField(Menu, related_name="orders")
  time_ordered = models.DateTimeField(auto_now_add=True)
  # customer to access the customer of the order