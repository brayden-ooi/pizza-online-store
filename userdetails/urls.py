from django.urls import path

from . import views

urlpatterns = [
    path("api/login", views.api_login, name="login"),
    path("api/logout", views.api_logout, name="logout"),
    path("api/register/validate", views.api_validate, name="register_validate"),
    path("api/register", views.api_register, name="register_view"),
    path("api/csrf", views.csrf)
]
