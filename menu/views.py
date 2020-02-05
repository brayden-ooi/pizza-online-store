from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Menu
from .serializers import *


@api_view()
def menu_list(request):
  data = Menu.objects.all()

  serializer = MenuSerializer(data, context={'request': request}, many=True)

  return Response(serializer.data)

@api_view()
def menu_details(request, pk):
  try:
    menu_item = Menu.objects.get(pk=pk)

    serializer = MenuSerializer(menu_item, context={'request': request})

    return Response(serializer.data)
  except Menu.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)