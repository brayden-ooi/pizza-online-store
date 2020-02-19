from django.contrib import admin

from .models import UserProfile

class UserProfileAdmin(admin.ModelAdmin):
  list_display = ("user", "address", "city", "zip_code", "state")

# Register your models here.
admin.site.register(UserProfile, UserProfileAdmin)