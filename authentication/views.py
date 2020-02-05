from django.contrib.auth import authenticate, login, logout

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.

# def login_view(request):
#     username = request.POST["username"]
#     password = request.POST["password"]
#     user = authenticate(request, username=username, password=password)
#     if user is not None:
#         login(request, user)
#         return HttpResponseRedirect(reverse("index"))
#     else:
#         return render(request, "users/login.html", {"message": "Invalid credentials."})

@api_view(['GET', 'POST'])
def login_view(request):
    print(request.body)
    return Response({ "isAuthenticated": True })

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