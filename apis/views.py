from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
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
class UserViewSet(viewsets.ModelViewSet):  
    queryset = ''  
    parser_classes = (JSONParser, MultiPartParser, FormParser, FileUploadParser)
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer

    # Function Name : 
    # Description : This is Get User API by userid
    # method : Get
    # pk : userid
    # Request : {}
    # Response : 
    #   if success: {}
    #   else : {}
    def retrieve(self, request, pk):
        response_data = response_object()
        data = {'message' : "This is Get User API by userid"}
        response_data.set_response(data = data)
        return response_data.get_response(status.HTTP_200_OK)

    # Function Name : 
    # Description : This is Update User API by userid
    # method : Update
    # pk : userid
    # Request : {}
    # Response : 
    #   if success: {}
    #   else : {}
    def update(self, request, pk):
        response_data = response_object()
        data = {'message' : "This is Update User API by userid"}
        response_data.set_response(data = data)
        return response_data.get_response(status.HTTP_200_OK)

    # Function Name : 
    # Description : This is Delete User API by userid
    # method : Delete
    # pk : userid
    # Request : {}
    # Response : 
    #   if success: {}
    #   else : {}
    def destroy(self, request, pk):
        response_data = response_object()
        data = {'message' : "This is Delete User API by userid"}
        response_data.set_response(data = data)
        return response_data.get_response(status.HTTP_200_OK)

    # Function Name : register
    # Description : This is Register API function
    # method : POST
    # Request : {username, fullname, email, password}
    # Response : 
    #   if success: {data: success_message, status = true}
    #   else : {error: error_message, status = false}
    @action(methods = ['POST'], detail = False, url_path = 'register')
    def register(self, request):
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
            data = {'message' : "Account Created Successfully"}
            response_data.set_response(data = data)
            return response_data.get_response(status.HTTP_200_OK)
        else:
            data = {'error' : serializer.errors}
            response_data.set_response(data = data)
            return response_data.get_response( status.HTTP_400_BAD_REQUEST)

    # Function Name : trainer (User)
    # Description : This is Register Trainer API function
    # method : POST
    # pk : None
    # Request : {userid, vendor}
    # Response : 
    #   if success: {data: success_message, status = true}
    #   else : {error: error_message, status = false}
    @action(methods = ['POST'], detail = False, url_path = 'register_trainer')
    def register_trainer(self, request):
        response_data = response_object()
        serializer = self.get_serializer(data = request.data)
        
        data = {'message' : "This is Register Trainer API"}
        response_data.set_response(data = data)
        return response_data.get_response( status.HTTP_200_OK)

    # Function Name : gym (User)
    # Description : This is Register Gym User API function
    # method : POST
    # pk : None
    # Request : {userid, vendor}
    # Response : 
    #   if success: {data: success_message, status = true}
    #   else : {error: error_message, status = false}
    @action(methods = ['POST'], detail = False, url_path = 'register_gym')
    def register_gym(self, request):
        response_data = response_object()
        data = {'message' : "This is Register Gym User API"}
        response_data.set_response(data = data)
        return response_data.get_response( status.HTTP_200_OK)

    # Function Name : 
    # Description : This is Login API when user login
    # method : Post
    # pk : None
    # Request : { email, password}
    # Response : 
    #   if success: {}
    #   else : {}
    @action(methods = ['POST'], detail = False, url_path = 'login')
    def login(self, request):
        response_data = response_object()
        data = {'message' : "This is Login API"}
        response_data.set_response(data = data)
        return response_data.get_response( status.HTTP_200_OK)
    
    # Function Name : 
    # Description : This is Logout API when user logout
    # method : Get
    # pk : userid
    # Request : {}
    # Response : 
    #   if success: {}
    #   else : {}
    @action(methods = ['GET'], detail = False, url_path = 'logout')
    def logout(self, request, pk):
        response_data = response_object()
        data = {'message' : "This is Logout API"}
        response_data.set_response(data = data)
        return response_data.get_response( status.HTTP_200_OK)
    
    # Function Name : 
    # Description : This is Forgot Password API when user forgot password
    # method : Get
    # pk : None
    # Request : {}
    # Response : 
    #   if success: {}
    #   else : {}
    @action(methods = ['GET'], detail = False, url_path = 'forgotpassword')
    def forgotpassword(self, request):
        response_data = response_object()
        data = {'message' : "This is Forgot Password API"}
        response_data.set_response(data = data)
        return response_data.get_response( status.HTTP_200_OK)
    
    # Function Name : 
    # Description : This is Reset Password API when user reset password
    # method : POST
    # pk : None
    # Request : {}
    # Response : 
    #   if success: {}
    #   else : {}
    @action(methods = ['POST'], detail = False, url_path = 'resetpassword')
    def resetpassword(self, request):
        response_data = response_object()
        data = {'message' : "This is Reset Password API"}
        response_data.set_response(data = data)
        return response_data.get_response( status.HTTP_200_OK)

    @action(detail = False, methods = ['POST'], url_path = 'verify')
    def verify(self, request, pk = None):
        response_data = response_object()
        data = {'message': 'This is OTP verification code API'}
        response_data.set_response(data = data)
        return response_data.get_response( status.HTTP_200_OK)
        pass

class TrainerViewSet(viewsets.ModelViewSet):
    queryset = ''  
    parser_classes = (JSONParser, MultiPartParser, FormParser, FileUploadParser)
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer
    
    pass 

class GymViewSet(viewsets.ModelViewSet):
    queryset = ''  
    parser_classes = (JSONParser, MultiPartParser, FormParser, FileUploadParser)
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer
    pass
