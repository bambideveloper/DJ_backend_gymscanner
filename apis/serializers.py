from rest_framework import serializers
from users.models import *
from trainers.models import *
from gyms.models import *

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            'id',
            'email',
            'username',
            'fullname',
            'password'
        )
        write_only_fields = ('password')
        read_only_fields = ('id', )
    
    def create(self, validated_data):
        pass