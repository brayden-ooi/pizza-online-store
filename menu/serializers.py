from rest_framework import serializers
from .models import Menu

class MenuSerializer(serializers.ModelSerializer):

  class Meta:
    model = Menu
    fields = ("pk", "menu_type", "is_small", "price")