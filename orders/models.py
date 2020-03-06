from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from menu.models import Pizza, Topping, Subs, SubsAddition
from userdetails.models import UserProfile


# https://docs.djangoproject.com/en/3.0/ref/contrib/contenttypes/
FALLBACK_CUSTOMER_ID = 1
class Order(models.Model):
  time_ordered = models.DateTimeField(auto_now_add=True)
  total_price = models.DecimalField(max_digits=4, decimal_places=2)
  customer = models.ForeignKey(UserProfile, related_name='order', on_delete=models.CASCADE, default=FALLBACK_CUSTOMER_ID)
  cooked = models.BooleanField(default=False)
  completed = models.BooleanField(default=False)
  paid = models.BooleanField(default=False)

  def __str__(self):
    return f"Order - {self.id}"

class OrderedFood(models.Model):
  order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name='items_ordered')
  amount = models.PositiveSmallIntegerField(default=1)
  isSmall = models.BooleanField(null=True)
  itemPrice = models.DecimalField(max_digits=4, decimal_places=2)
  addOnPrice = models.DecimalField(max_digits=4, decimal_places=2, null=True)

  # Grab food from different tablesn
  content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
  object_id = models.PositiveIntegerField()
  content_object = GenericForeignKey()

  def __str__(self):
    def size(self):
      if (self.isSmall): return 'Small'
      elif (self.isSmall is not None): return "Large"
      else: return "-"

    return f"{self.content_type.model_class().__name__} | {self.content_object} | \
      {size(self)} | \
      $ {self.itemPrice}{' + $ ' + str(self.addOnPrice) if self.addOnPrice else ''}"

class OrderedPizza(models.Model):
  pizza_type = models.ForeignKey(Pizza, on_delete=models.PROTECT, related_name='pizza_orders')
  toppings = models.ManyToManyField(Topping, through='OrderedPizzaToppings', blank=True)
  orders = GenericRelation(OrderedFood, related_query_name='ordered_pizza')

  def __str__(self):
    return f"{self.pizza_type.food_name} - {', '.join([t.food_name for t in self.toppings.all()])}"

class OrderedPizzaToppings(models.Model):
  pizza = models.ForeignKey(OrderedPizza, on_delete=models.CASCADE)
  toppings = models.ForeignKey(Topping, on_delete=models.PROTECT, null=True, blank=True, related_name='topping_orders')
  amount = models.PositiveSmallIntegerField(default=1)

class OrderedSubs(models.Model):
  subs_type = models.ForeignKey(Subs, on_delete=models.PROTECT, related_name='subs_orders')
  subs_additions = models.ManyToManyField(SubsAddition, related_name='subs_additions_orders')
  orders = GenericRelation(OrderedFood, related_query_name='ordered_subs')

  def __str__(self):
    return f"{self.subs_type.food_name} - {', '.join([t.food_name for t in self.subs_additions.all()]) if self.subs_additions.all() else 'None'}"

