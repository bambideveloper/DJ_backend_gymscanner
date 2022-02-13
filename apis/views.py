from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import ( JSONParser, MultiPartParser, FileUploadParser, FormParser )
from rest_framework import status

import math, random, json
from django.utils.html import strip_tags
from django.core.mail import send_mail

from . helper import response_object
from . serializers import *
from users.models import *

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):  
    queryset = ''  
    parser_classes = (JSONParser, MultiPartParser, FormParser)
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
        data = {'message' : "This is Update User API by userid, Coming Soon"}
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
        data = {'message' : "This is Delete User API by userid, Coming Soon"}
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
            return response_data.get_response(status.HTTP_400_BAD_REQUEST)

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
        data = {'message' : "This is Register Trainer API"}
        response_data.set_response(data = data)
        return response_data.get_response(status.HTTP_200_OK)

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
        return response_data.get_response(status.HTTP_200_OK)

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
        user_exist = Users.objects.filter(
            email = request.data.get('email')
        )

        if len(user_exist) > 0:
            if user_exist[0].is_verified:
                if user_exist[0].check_password(request.data.get('password')):
                    if user_exist[0].status:
                        user_exist[0].last_login = timezone.now()
                        user_exist[0].save()
                        business_user = Businesses.objects.filter(user = user_exist[0])
                        business_type = 0 if len(business_user) == 0 else business_user[0].business_type
                        response_data.set_response(data = {
                            'message': 'Login Successful',
                            'user_type': business_type,
                            'data': {
                                'id': user_exist[0].id,
                                'name': user_exist[0].fullname,
                                'email': user_exist[0].email,
                            }
                        })
                        return response_data.get_response(status.HTTP_200_OK)
                    else:
                        response_data.set_response(data = {'message': 'Not Activated'})
                        return response_data.get_response(status.HTTP_423_LOCKED)
                else:
                    response_data.set_response(data = {'message': 'Wrong Password'})
                    return response_data.get_response(status.HTTP_401_UNAUTHORIZED)
            else:
                response_data.set_response(data = {'message': 'Not Verified'})
                return response_data.get_response(status.HTTP_406_NOT_ACCEPTABLE)
        else:
            data = {'message' : "Unregistered User"}
            response_data.set_response(data = data)
            return response_data.get_response(status.HTTP_404_NOT_FOUND)
    
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
        data = {'success' : "logout"}
        response_data.set_response(data = data)
        return response_data.get_response(status.HTTP_404_NOT_FOUND)
    
    # Function Name : 
    # Description : This is Forgot Password API when user forgot password
    # method : Get
    # pk : None
    # Request : { email }
    # Response : 
    #   if success: {}
    #   else : {}
    @action(methods = ['POST'], detail = False, url_path = 'forgotpassword')
    def forgotpassword(self, request):
        response_data = response_object()
        user_exist = Users.objects.filter(
            email = request.data['email']
        )

        if user_exist.is_verified:
            subject = "GymScanner"
            from_email = 'app@gymscanner.info'
            to_email = request.data['email']
            digits = "0123456789"
            opt_code = ""
            for i in range(4):
                opt_code += digits[math.floor(random.random() * 10)]
            OTP.objects.create(user = user_exist, code = opt_code)
            message = strip_tags("<h1>{}</h1> is your code".format(opt_code))
            send_mail(subject, message, from_email, [to_email], html_message = "<h1>{}</h1> is your code".format(opt_code))
            data = {'message' : "Account Created Successfully"}
            response_data.set_response(data = data)
            return response_data.get_response(status.HTTP_200_OK)
        else:
            data = {'error' : "User is not verified"}
            response_data.set_response(data = data)
            return response_data.get_response(status.HTTP_401_UNAUTHORIZED)
    
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
        return response_data.get_response(status.HTTP_200_OK)

    # Function Name : 
    # Description : This is Resend Code when user request code again
    # method : POST
    # pk : None
    # Request : {email, code}
    # Response : 
    #   if success: {}
    #   else : {}

    @action(detail = False, methods = ['POST'], url_path = 'resend')
    def resend(self, request):
        response_data = response_object()
        email_exist = OTP.objects.filter(
            user__email = request.data.get('email')
        )

        if len(email_exist) > 0:
            subject = "GymScanner"
            from_email = 'app@gymscanner.info'
            to_email = request.data['email']
            digits = "0123456789"
            opt_code = ""
            for i in range(4):
                opt_code += digits[math.floor(random.random() * 10)]
            OTP.objects.filter(user = email_exist[0].user).update(code = opt_code)
            message = strip_tags("<h1>{}</h1> is your code".format(opt_code))
            send_mail(subject, message, from_email, [to_email], html_message = "<h1>{}</h1> is your code".format(opt_code))
            data = {'message' : "Account Created Successfully"}
            response_data.set_response(data = data)
            return response_data.get_response(status.HTTP_200_OK)
        else:
            data = {'error' : "Not Existed User"}
            response_data.set_response(data = data)
            return response_data.get_response(status.HTTP_404_NOT_FOUND)

    # Function Name : 
    # Description : This is Reset Password API when user reset password
    # method : POST
    # pk : None
    # Request : {email, code}
    # Response : 
    #   if success: {}
    #   else : {}

    @action(detail = False, methods = ['POST'], url_path = 'verify')
    def verify(self, request):
        response_data = response_object()
        otp_exist = OTP.objects.filter(
            user__email = request.data.get('email'),
            code = request.data.get('code')
        )
        if len(otp_exist) > 0:
            Users.objects.filter(id = otp_exist[0].user.id).update(is_verified = True)
            otp_exist.delete()
            data = {'message': 'Account Verified'}
            response_data.set_response(data = data)
            return response_data.get_response(status.HTTP_200_OK)
        else:
            data = {'error': 'Please try to register again'}
            response_data.set_response(data = data)
            return response_data.get_response(status.HTTP_404_NOT_FOUND)

class TrainerViewSet(viewsets.ModelViewSet):
    queryset = ''  
    parser_classes = (JSONParser, MultiPartParser, FormParser, FileUploadParser)
    permission_classes = (AllowAny, )
    serializer_class = TrainerSerializer
    
    pass 

class GymViewSet(viewsets.ModelViewSet):
    queryset = ''  
    parser_classes = (JSONParser, MultiPartParser, FormParser, FileUploadParser)
    permission_classes = (AllowAny, )
    serializer_class = GymSerializer

    # def list(request)
    pass
