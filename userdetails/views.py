from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core import serializers
from django.middleware.csrf import get_token
from django.http import JsonResponse

from rest_framework.authtoken.models import Token
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
		token = Token.objects.get(user=user)

		return Response({ "user": serializer.data, "token": token.key })
	else:
		return Response(False)

@api_view()
def api_logout(request):
	del request.session
	logout(request)
	return Response(False)

@api_view(['GET', 'POST'])
def api_register(request):
	new_user = User.objects.create_user(request.data["mainPage"]["username"], request.data["mainPage"]["email"], request.data["mainPage"]["password"])

	for detail, detail_value in request.data["detailPage"]["fullName"].items():
		setattr(new_user, detail, detail_value)

	new_user.save()
	login(request, new_user)

	new_user_profile = UserProfile.objects.get(user=new_user)

	for detail, detail_value in request.data["detailPage"]["fullAddress"].items():
		setattr(new_user_profile, detail, detail_value)

	token = Token.objects.get(user=new_user)
	setattr(new_user_profile, "token", token.key)
	new_user_profile.save()

	serializer = UserSerializer(new_user, context={'request': request})

	return Response({ "user": serializer.data, "token": token.key }, status=status.HTTP_201_CREATED)

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