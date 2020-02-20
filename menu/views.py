import json
from urllib.parse import unquote

# from django.contrib.auth.decorators import login_required

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required

import menu.models


@api_view()
# @login_required
@permission_classes([IsAuthenticated])
def menu_list(request):
  print(request.user)
  
  try:
    food = {}
    for attr in dir(menu.models):
      try:
        food_model = getattr(menu.models, attr)

        menu_item = food_model.objects.all()
        serializer = food_model.get_serializer()

        data = serializer(menu_item, context={'request': request}, many=True)

        food[attr] = data.data

      except:
        continue

    return Response(food)
  except:
    return Response(status=status.HTTP_404_NOT_FOUND)

@api_view()
@permission_classes([IsAuthenticated])
def menu_details(request, food_name):
  print(request.user)
  try:
    food_model_name = unquote(food_name).title().replace(' ', '')
    food_model = getattr(menu.models, food_model_name)

    menu_item = food_model.objects.all()
    serializer = food_model.get_serializer()

    data = serializer(menu_item, context={'request': request}, many=True)

    food = {}
    food[food_model_name] = data.data

    return Response(food)
    
  except:
    return Response(status=status.HTTP_404_NOT_FOUND)
  