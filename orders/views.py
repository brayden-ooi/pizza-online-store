from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Menu
from .serializers import *


# Create your views here.
def index(request):
    # return HttpResponse("Pizza Homepage")
    if not request.user.is_authenticated:
        return render(request, "users/login.html", {"message": None})
    context = {
        "user": request.user
    }
    return render(request, "users/user.html", context)

def login_view(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "users/login.html", {"message": "Invalid credentials."})

def logout_view(request):
    logout(request)
    return render(request, "users/login.html", {"message": "Logged out."})


@api_view()
def menu_list(request):
  data = Menu.objects.all()

  serializer = MenuSerializer(data, context={'request': request}, many=True)

  return Response(serializer.data)

@api_view()
def menu_details(request, pk):
  try:
    menu_item = Menu.objects.get(pk=pk)

    serializer = MenuSerializer(menu_item, context={'request': request})

    return Response(serializer.data)
  except Menu.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)