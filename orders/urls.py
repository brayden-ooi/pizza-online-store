from django.urls import path

from . import views


urlpatterns = [
    path("api/pending_orders", views.pending_orders, name="pending_orders"),
    path("api/payment", views.payment, name="payment"),
    path("api/order", views.order, name="order")
]
