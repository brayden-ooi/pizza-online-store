import stripe

from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings

from rest_framework.response import Response
from rest_framework.decorators import api_view

stripe.api_key = settings.STRIPE_SECRET_KEY


# Create your views here.
def index(request):
  return HttpResponse("Pizza Homepage")

@api_view(['GET', 'POST'])
def payment(request):
  if request.method == 'POST':
    try:
      charge = stripe.Charge.create(
        amount=request.data["amount"],
        currency='usd',
        source=request.data["token"]["id"]
      )
      return Response(True)
    except:
      return Response(False)
  return Response(False)