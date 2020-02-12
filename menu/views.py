from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Pizza, Topping, Subs, SubsAddition, Pasta, Salad, DinnerPlatter


@api_view()
def menu_list(request):
  data = Pizza.objects.all()

  serializer = PizzaSerializer(data, context={'request': request}, many=True)

  return Response(serializer.data)

@api_view()
def menu_details(request, food):
  FOOD_MAP = {
    "pasta": Pasta,
    "pizza": Pizza,
    "platter": DinnerPlatter,
    "salad": Salad,
    "subs": Subs,
    "subs_addons": SubsAddition,
    "toppings": Topping
  }

  try:
    menu_item = FOOD_MAP[food].objects.all()

    serializer = FOOD_MAP[food].get_serializer()
    data = serializer(menu_item, context={'request': request}, many=True)

    return Response(data.data)
  except Salad.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
