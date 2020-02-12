from django.contrib import admin

from .models import Pizza, Topping, Subs, SubsAddition, Pasta, Salad, DinnerPlatter


class PizzaAdmin(admin.ModelAdmin):
  list_display = ('food_name', 'pizza_type', 'pizza_styles', 'small_price', 'large_price')

class NonSizedFoodAdmin(admin.ModelAdmin):
    list_display = ('food_name', 'price')

class SizedFoodAdmin(admin.ModelAdmin):
    list_display = ('food_name', 'small_price', 'large_price')

# Register your models here.
admin.site.register(Pizza, PizzaAdmin)
admin.site.register(Topping)
admin.site.register(Subs, SizedFoodAdmin)
admin.site.register(SubsAddition)
admin.site.register(Pasta, NonSizedFoodAdmin)
admin.site.register(Salad, NonSizedFoodAdmin)
admin.site.register(DinnerPlatter, SizedFoodAdmin)