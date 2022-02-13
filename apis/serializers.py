from rest_framework import serializers
from users.models import *
from trainers.models import *
from gyms.models import *

class UserSerializer(serializers.ModelSerializer):
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

class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainers
    pass

class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gyms
    pass