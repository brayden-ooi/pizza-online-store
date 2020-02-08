import json

from django.contrib.auth import authenticate, login, logout
from django.core import serializers

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET', 'POST'])
def login_view(request):
    username, password = json.loads(str(request.body, encoding='utf-8')).values()
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({ "isAuthenticated": True })
    else:
        return Response({ "isAuthenticated": False })

@api_view()
def logout_view(request):
    logout(request)
    return Response({ "isAuthenticated": False })

# def user_view():
#     if not request.user.is_authenticated:
#       return render(request, "users/login.html", {"message": None})
#     context = {
#         "user": request.user
#     }
#     return render(request, "users/user.html", context)