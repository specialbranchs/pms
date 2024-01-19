
from rest_framework import serializers
from .models import CustomUser as User,Appointment,designation,Zone
class UserSerializer(serializers.ModelSerializer):
   
    class Meta:
        model=User
        fields='__all__'
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        password=validated_data.pop('password',None)
        instance=self.Meta.model(**validated_data)
        if password is not None :
            instance.set_password(password)
        
        instance.save()    
        return instance    
    

class AppointMentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appointment
        fields='__all__'
        depth=2


class DesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model=designation
        fields='__all__'
      

class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model=Zone
        fields='__all__'