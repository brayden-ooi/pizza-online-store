from django.contrib import admin
from django.utils.html import format_html_join
from django.utils.safestring import mark_safe

from .models import Order, OrderedFood


class OrderAdmin(admin.ModelAdmin):
  list_display = ('completed', 'paid', 'time_ordered', 'id', 'items', 'total_price', 'customer')

  def items(self, obj):
    return format_html_join(
            mark_safe('<br>'),
            '{}', ((t.__str__(),) for t in obj.items_ordered.all()),)
  
class OrderedFoodAdmin(admin.ModelAdmin):
  list_display = ('order', 'content_type', 'content_object', 'size', 'amount', 'itemPrice', 'addOnPrice', 'totalPrice')

  def size(self, obj):
    if (obj.isSmall): return 'Small'
    elif (obj.isSmall is not None): return 'Large'
    else: return "-"

  def totalPrice(self, obj):
    return obj.itemPrice + (obj.addOnPrice or 0)

# Register your models here.
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderedFood, OrderedFoodAdmin)
