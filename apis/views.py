from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import ( JSONParser, MultiPartParser, FileUploadParser, FormParser )
from rest_framework import status

import math, random
from django.utils.html import strip_tags
from django.core.mail import send_mail

from . helper import response_object
from . serializers import *
from users.models import *

# Create your views here.
class RegisterViewSet(viewsets.ModelViewSet):  
    queryset = ''  
    parser_classes = (JSONParser, MultiPartParser, FormParser, FileUploadParser)
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer

    def create(self, request):
        response_data = response_object()
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            user = Users.objects.create(
                username = request.data['username'].lower(),
                fullname = request.data['fullname'],
                email = request.data['email'],
            )

            user.set_password(request.data['password'])
            user.save()

            subject = "GymScanner"

            from_email = 'app@gymscanner.info'
            to_email = request.data['email']
            digits = "0123456789"
            opt_code = ""
            for i in range(4):
                opt_code += digits[math.floor(random.random() * 10)]
            OTP.objects.create(user = user, code = opt_code)
            message = strip_tags("<h1>{}</h1> is your code".format(opt_code))
            send_mail(subject, message, from_email, [to_email], html_message = "<h1>{}</h1> is your code".format(opt_code))
            response_data = {
                'message' : "Account Created Successfully"
            }
            data = {''}
            response_data.set_response(data = data, status = True)
            return Response(response_data.get_response(), status = status.HTTP_200_OK)
        else:
            response_data.set_response(error = serializer.errors)
            return Response(response_data.get_response(), status = status.HTTP_400_BAD_REQUEST)
    @action(detail = True, methods = ['post'])
    def confirm_code(self, request, pk = None):

        pass
    
