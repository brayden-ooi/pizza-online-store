from django.contrib.contenttypes.fields import GenericRelation
from django.db import models

from .abstract_models import Food, SizedFood, NonSizedFood


class Pizza(SizedFood):
  PIZZA_TYPE = [
    ('RG', 'Regular'),
    ('SC', 'Sicilian')
  ]

  PIZZA_STYLES = [
    ('CZ', 'Cheese'),
    ('1T', '1 Topping'),
    ('2T', '2 Toppings'),
    ('3T', '3 Toppings'),
    ('SP', 'Special')
  ]
  pizza_type = models.CharField(max_length=2, choices=PIZZA_TYPE)
  pizza_styles = models.CharField(max_length=64, choices=PIZZA_STYLES)

  SizedFood._meta.get_field('food_name').verbose_name = 'pizza'

class Topping(Food):
  Food._meta.get_field('food_name').verbose_name = 'topping'

class Subs(SizedFood):
  SizedFood._meta.get_field('food_name').verbose_name = 'subs'

class SubsAddition(SizedFood):
  SizedFood._meta.get_field('food_name').verbose_name = 'subs_addition'

class Pasta(NonSizedFood):
  orders = GenericRelation('orders.OrderedFood', related_query_name='pasta')

  NonSizedFood._meta.get_field('food_name').verbose_name = 'pasta'

class Salad(NonSizedFood):
  orders = GenericRelation('orders.OrderedFood', related_query_name='salad')

  NonSizedFood._meta.get_field('food_name').verbose_name = 'salad'

class DinnerPlatter(SizedFood):
  orders = GenericRelation('orders.OrderedFood', related_query_name='platter')

  SizedFood._meta.get_field('food_name').verbose_name = 'platter'