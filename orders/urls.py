from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("api/payment", views.payment, name="payment"),
    path("api/order", views.order, name="order")
]
