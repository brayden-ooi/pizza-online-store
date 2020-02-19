from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core import serializers
from django.middleware.csrf import get_token
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import UserProfile
from .serializers import UserSerializer


@api_view(['GET', 'POST'])
def api_login(request):
	user = authenticate(request, **request.data)
	if user is not None:
		login(request, user)

		serializer = UserSerializer(user, context={'request': request})

		return Response({ "isAuthenticated": serializer.data })
	else:
		return Response({ "isAuthenticated": False })

@api_view()
def api_logout(request):
	logout(request)
	return Response({ "isAuthenticated": False })

@api_view(['GET', 'POST'])
def api_register(request):
	try:
		new_user = User()

		for detail, detail_value in request.data.items():
			setattr(new_user, detail, detail_value)

		new_user.save()

		new_user_profile = UserProfile.objects.get(user=new_user)

		for detail, detail_value in request.data.items():
			setattr(new_user_profile, detail, detail_value)

		new_user_profile.save()

		login(request, new_user)

		serializer = UserSerializer(new_user, context={'request': request})

		return Response(serializer.data, status=status.HTTP_201_CREATED)
	except:
		return Response(serializer.errors, status=status.HTTP_201_CREATED)

@api_view(['GET', 'POST'])
def api_validate(request):
	username_used = User.objects.filter(username=request.data["username"])
	email_used = User.objects.filter(email=request.data["email"])

	return Response({
		"rejectUsername": bool(username_used),
		"rejectEmail": bool(email_used)
	})

def csrf(request):
	return JsonResponse({'csrfToken': get_token(request)})

# def user_view():
#     if not request.user.is_authenticated:
#       return render(request, "users/login.html", {"message": None})
#     context = {
#         "user": request.user
#     }
#     return render(request, "users/user.html", context)