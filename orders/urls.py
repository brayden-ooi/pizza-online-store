from django.urls import path
from django.conf.urls import include, url

from . import views


urlpatterns = [
    path("api/pending_orders", views.pending_orders, name="pending_orders"),
    path("api/payment", views.payment, name="payment"),
    path("api/order", views.order, name="order"),
    url(r'', views.index, name="index"),
]
