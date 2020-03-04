import stripe

from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Order, OrderedFood, OrderedPizza, OrderedPizzaToppings, OrderedSubs
import menu.models # import Pizza, Topping, Subs, SubsAddition, Pasta, Salad, DinnerPlatter
from userdetails.models import UserProfile

stripe.api_key = settings.STRIPE_SECRET_KEY


# Create your views here.
def index(request):
  return HttpResponse("Pizza Homepage")

@api_view(['GET', 'POST'])
def order(request):
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
        new_order_item = OrderedFood(order=new_order, amount=order["quantity"], content_object=new_order_pizza)
        new_order_item.save()

      if (order["groupId"] == "Subs"):
        menu_subs = menu.models.Subs.objects.get(id=order["id"])
        new_order_subs = OrderedSubs(subs_type=menu_subs)
        new_order_subs.save()

        for addOns in order["addOns"]:
          addOn = menu.models.SubsAddition.objects.get(id=addOns["id"])
          new_order_subs.subs_additions.add(addOn)
        new_order_item = OrderedFood(order=new_order, amount=order["quantity"], content_object=new_order_subs)
        new_order_item.save()

      else:
        ordered_food = getattr(menu.models, order["groupId"])
        new_order_item = OrderedFood(order=new_order, amount=order["quantity"], content_object=new_order_item)
        new_order_item.save()
      
      new_order.save()
    return Response(True)
  return Resposne(False)

@api_view(['GET', 'POST'])
def payment(request):
  if request.method == 'POST':
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