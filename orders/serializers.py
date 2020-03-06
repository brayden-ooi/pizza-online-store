from rest_framework import serializers

from .models import Order, OrderedFood

class OrderedFoodSerializer(serializers.ModelSerializer):
  size = serializers.SerializerMethodField()
  pizza = serializers.SerializerMethodField()
  subs = serializers.SerializerMethodField()
  # food_type = serializers.SerializerMethodField()
  ordered_item_details = serializers.SerializerMethodField()

  class Meta:
    model = OrderedFood
    fields = ["amount", "size", "itemPrice", "addOnPrice", "ordered_item_details", "pizza", "subs"]
    depth = 1

  def get_size(self, obj):
      if (obj.isSmall): return 'small'
      elif (obj.isSmall is not None): return "large"
      else: return "-"

  def get_pizza(self, obj):
    if obj.ordered_pizza.all():
      ordered_pizza = obj.ordered_pizza.all()[0]
      ordered_pizza_details = {
        'name': ordered_pizza.pizza_type.food_name,
        'toppings': [{ 'name': topping.food_name, 'price': 0 } for topping in ordered_pizza.toppings.all()] 
      }
      return ordered_pizza_details
    return None

  def get_subs(self, obj):
    if obj.ordered_subs.all():
      ordered_subs = obj.ordered_subs.all()[0]
      ordered_subs_details = {
        'name': ordered_subs.subs_type.food_name,
        'addOns': [{ 'name': a.food_name, 'price': a.small_price } for a in ordered_subs.subs_additions.all()]
      }
      return ordered_subs_details
    return None

  def get_ordered_item_details(self, obj):
    try:
      return {
        'name': obj.content_object.food_name,
        'type': obj.content_object.__class__.__name__
      } 
    except:
      return None

class OrderSerializer(serializers.ModelSerializer):
  items_ordered = OrderedFoodSerializer(many=True)
  class Meta:
    model = Order
    fields = ["id", "total_price", "cooked", "completed", "paid", "items_ordered"]
    depth = 2


