from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.contrib.auth.models import User


# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#onetoone
class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  address = models.CharField(max_length=64, default="74 Winthrop Street")
  city = models.CharField(max_length=64, default="Cambridge")
  zip_code = models.CharField(max_length=5, default="02128")
  state = models.CharField(max_length=64, default="Massachusetts")

# user model extension hook
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
  instance.userprofile.save()