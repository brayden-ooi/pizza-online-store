from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# 1st iteration will add a menu table, and customer table will add a MtM field to access 
# customer's respective orders with the menu items' FK

class Menu(models.Model):
  menu_type = models.CharField(max_length=64)
  is_small = models.BooleanField(blank=True) # To accomodate size neutral items
  price = models.DecimalField(max_digits=4, decimal_places=2, blank=True) # To accomodate toppings
  # orders to access all the orders contained the item

class Order(models.Model):
  # PK is transaction ID
  items_ordered = models.ManyToManyField(Menu, related_name="orders")
  time_ordered = models.DateTimeField(auto_now_add=True)
  # customer to access the customer of the order

# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#onetoone
class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  # associated with no orders
  purchase_history = models.ManyToManyField(Order, blank=True, related_name="customer")

# user model extension hook
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
  instance.userprofile.save()