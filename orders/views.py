import stripe

from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Order, OrderedFood, OrderedPizza, OrderedPizzaToppings, OrderedSubs
from .serializers import OrderSerializer

import menu.models
from userdetails.models import UserProfile

stripe.api_key = settings.STRIPE_SECRET_KEY


# Create your views here.
@api_view()
@permission_classes([IsAuthenticated])
def pending_orders(request):
  user = User.objects.get(username=request.user)
  user_profile = UserProfile.objects.get(user=user)
  check_pending_order = Order.objects.filter(customer=user_profile, completed=False, cooked=False)

  serializer = OrderSerializer(check_pending_order, context={'request': request}, many=True)

  return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def order(request):
  user = User.objects.get(username=request.user)
  print(request.user)
  if request.method == 'POST':
    orders = request.data["order"]

    customer = UserProfile.objects.get(token=request.data["userToken"])
    new_order = Order(total_price=request.data["amount"], customer=customer)
    new_order.save()
    for order in orders:
      if (order["groupId"] == "Pizza"):
        menu_pizza = menu.models.Pizza.objects.get(id=order["id"])
        new_order_pizza = OrderedPizza(pizza_type=menu_pizza)
        new_order_pizza.save()

        for addOns in order["addOns"]:
          topping = menu.models.Topping.objects.get(id=addOns["id"])
          ordered_topping = OrderedPizzaToppings(pizza=new_order_pizza, toppings=topping)
          ordered_topping.save()

        new_order_item = OrderedFood(
          order=new_order, 
          amount=order["quantity"], 
          isSmall=True if order["size"] == "small" else False, 
          content_object=new_order_pizza,
          itemPrice=order["itemPrice"],
          addOnPrice=0
        )
        new_order_item.save()

      elif (order["groupId"] == "Subs"):
        addOnsPrice = 0
        menu_subs = menu.models.Subs.objects.get(id=order["id"])
        new_order_subs = OrderedSubs(subs_type=menu_subs)
        new_order_subs.save()

        for addOns in order["addOns"]:
          addOn = menu.models.SubsAddition.objects.get(id=addOns["id"])
          addOnsPrice = addOnsPrice + float(addOns["small_price"])
          new_order_subs.subs_additions.add(addOn)
        new_order_subs.save()

        new_order_item = OrderedFood(
          order=new_order, 
          amount=order["quantity"], 
          isSmall=True if order["size"] == "small" else False, 
          content_object=new_order_subs,
          itemPrice=order["itemPrice"],
          addOnPrice=addOnsPrice
        )
        new_order_item.save()

      else:
        item_size = order["size"] if "size" in order else None

        if (item_size == 'small'): item_size = True
        elif (item_size == 'large'): item_size = False
        else: item_size = None

        ordered_food_type = getattr(menu.models, order["groupId"])
        ordered_food = ordered_food_type.objects.get(id=order["id"])
        new_order_item = OrderedFood(
          order=new_order, 
          amount=order["quantity"], 
          isSmall=item_size,
          content_object=ordered_food,
          itemPrice=order["price"]
        )
        new_order_item.save()
      
      new_order.save()
    return Response(True)
  return Response(False)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def payment(request):
  user = User.objects.get(username=request.user)
  print(request.user)
  if request.method == 'POST':
    orders = request.data["order"]

    customer = UserProfile.objects.get(token=request.data["userToken"])
    new_order = Order(total_price=request.data["amount"] / 100, customer=customer, paid=True)
    new_order.save()
    for order in orders:
      if (order["groupId"] == "Pizza"):
        menu_pizza = menu.models.Pizza.objects.get(id=order["id"])
        new_order_pizza = OrderedPizza(pizza_type=menu_pizza)
        new_order_pizza.save()

        for addOns in order["addOns"]:
          topping = menu.models.Topping.objects.get(id=addOns["id"])
          ordered_topping = OrderedPizzaToppings(pizza=new_order_pizza, toppings=topping)
          ordered_topping.save()

        new_order_item = OrderedFood(
          order=new_order, 
          amount=order["quantity"], 
          isSmall=True if order["size"] == "small" else False, 
          content_object=new_order_pizza,
          itemPrice=order["itemPrice"],
          addOnPrice=0
        )
        new_order_item.save()

      elif (order["groupId"] == "Subs"):
        addOnsPrice = 0
        menu_subs = menu.models.Subs.objects.get(id=order["id"])
        new_order_subs = OrderedSubs(subs_type=menu_subs)
        new_order_subs.save()

        for addOns in order["addOns"]:
          addOn = menu.models.SubsAddition.objects.get(id=addOns["id"])
          addOnsPrice = addOnsPrice + float(addOns["small_price"])
          new_order_subs.subs_additions.add(addOn)
        new_order_subs.save()

        new_order_item = OrderedFood(
          order=new_order, 
          amount=order["quantity"], 
          isSmall=True if order["size"] == "small" else False, 
          content_object=new_order_subs,
          itemPrice=order["itemPrice"],
          addOnPrice=addOnsPrice
        )
        new_order_item.save()

      else:
        item_size = order["size"] if "size" in order else None

        if (item_size == 'small'): item_size = True
        elif (item_size == 'large'): item_size = False
        else: item_size = None

        ordered_food_type = getattr(menu.models, order["groupId"])
        ordered_food = ordered_food_type.objects.get(id=order["id"])
        new_order_item = OrderedFood(
          order=new_order, 
          amount=order["quantity"], 
          isSmall=item_size,
          content_object=ordered_food,
          itemPrice=order["price"]
        )
        new_order_item.save()
      
      new_order.save()

    try:
      charge = stripe.Charge.create(
        amount=request.data["amount"],
        currency='usd',
        source=request.data["token"]["id"]
      )
      return Response(True)
    except:
      return Response(False)
  return Response(False)