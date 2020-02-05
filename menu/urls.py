from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^api/menu/$", views.menu_list),
    url(r"^api/menu/(?P<pk>[0-9]+)$", views.menu_details)
]
