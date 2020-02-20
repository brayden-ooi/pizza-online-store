from django.urls import path

from rest_framework.authtoken import views as auth_views

from . import views

urlpatterns = [
    path("api/login", views.api_login, name="login"),
    path("api/logout", views.api_logout, name="logout"),
    path("api/register/validate", views.api_validate, name="register_validate"),
    path("api/register", views.api_register, name="register_view"),
    path("api/userstatus", views.user_current_status, name="user_status"),
    path("api-token-auth/", auth_views.obtain_auth_token, name="api-tokn-auth"),
    path("api/csrf", views.csrf)
]
