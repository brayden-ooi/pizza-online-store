from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^api/menu/$", views.menu_list),
    path("api/menu/<food>", views.menu_details)
]
