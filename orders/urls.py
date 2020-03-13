from django.urls import path, re_path
from django.conf.urls import include

from . import views


urlpatterns = [
    path("api/pending_orders", views.pending_orders, name="pending_orders"),
    path("api/payment", views.payment, name="payment"),
    path("api/order", views.order, name="order"),
    path("", views.index, name="index"),
    re_path(r"^(?!api/).*", views.index, name="fallback"),
]
