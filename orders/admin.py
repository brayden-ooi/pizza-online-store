from django.contrib import admin

from .models import Order, OrderedFood, OrderedPizza, OrderedPizzaToppings, OrderedSubs


class OrderAdmin(admin.ModelAdmin):
  list_display = ('id', 'content', 'total_price', 'customer', 'time_ordered')

  def content(self, obj):
    return ", ".join([t.__str__() for t in obj.items_ordered.all()])

class OrderedPizzaAdmin(admin.ModelAdmin):
  list_display = ('id', 'order', 'pizza_type', 'topping')

  def topping(self, obj):
    return ", ".join([t.food_name for t in obj.toppings.all()])

  def order(self, obj):
    return obj.orders.all()[0].id
  
class OrderedFoodAdmin(admin.ModelAdmin):
  list_display = ('order', 'amount', 'content_type', 'content_object')

class OrderedPizzaToppingsAdmin(admin.ModelAdmin):
  list_display = ('pizza', 'toppings', 'amount')

class OrderedSubsAdmin(admin.ModelAdmin):
  list_display = ('id', 'order', 'subs_type', 'subs_addition')

  def order(self, obj):
    return obj.orders.all()[0].id if obj.orders.all() else "None"

  def subs_addition(self, obj):
    return ", ".join([t.food_name for t in obj.subs_additions.all()]) if obj.subs_additions.all() else "None"


# Register your models here.
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderedFood, OrderedFoodAdmin)
admin.site.register(OrderedPizza, OrderedPizzaAdmin)
admin.site.register(OrderedPizzaToppings, OrderedPizzaToppingsAdmin)
admin.site.register(OrderedSubs, OrderedSubsAdmin)
