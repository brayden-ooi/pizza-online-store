from django.db import models

from rest_framework import serializers

class Food(models.Model):
  food_name = models.CharField("food", max_length=64)
  img_url = models.URLField(max_length=200, null=True, blank=True)

  def __str__(self):
    return self.food_name

  class Meta: 
    abstract = True

  @classmethod
  def get_serializer(cls):
    class BaseSerializer(serializers.ModelSerializer):
      class Meta:
        model = cls
        fields = '__all__'

    return BaseSerializer

class NonSizedFood(Food):
  price = models.DecimalField(max_digits=4, decimal_places=2)

  class Meta: 
    abstract = True

class SizedFood(Food):
  small_price = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
  large_price = models.DecimalField(max_digits=4, decimal_places=2)

  class Meta: 
    abstract = True