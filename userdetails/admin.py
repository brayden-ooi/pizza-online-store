import pprint

from django.contrib.sessions.models import Session
from django.contrib import admin

from rest_framework.authtoken.models import Token
from rest_framework.authtoken.admin import TokenAdmin

from .models import UserProfile


class UserProfileAdmin(admin.ModelAdmin):
  list_display = ("user", "token", "address", "city", "zip_code", "state")

# https://stackoverflow.com/questions/4976015/django-how-to-see-session-data-in-the-admin-interface
# class SessionAdmin(admin.ModelAdmin):
#   def _session_data(self, obj):
#     return pprint.pformat(obj.get_decoded())
#   readonly_fields = ['_session_data']
#   exclude = ['session_data']
#   list_display = ('session_key', '_session_data', 'expire_date')

# Register your models here.
admin.site.register(UserProfile, UserProfileAdmin)
# admin.site.register(Session, SessionAdmin)
admin.site.unregister(Token)