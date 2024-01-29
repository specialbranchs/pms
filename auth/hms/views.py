from django.shortcuts import render

# Create your views here.

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response

from .timeConvert import convertStringToDateObj
from .serializers import DesignationSerializer, UserSerializer,AppointMentSerializer, ZoneSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from .models import Appointment,CustomUser,designation,Zone
from django.db.models import Q

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, userData):
        token = super().get_token(userData)
        serializer=UserSerializer(userData)
        user=serializer.data
        # Add custom claims
        token['email'] = user['email']
        token['bpNumber']=user['bpNumber']
        token['name']=user['name']
        token['picture']=user['picture']
        token['phone']=user['phone']
        token['designation']=user['designation']
        token['is_superuser']=user['is_superuser']
        token['is_adminuser']=user['is_admin']
        token['is_staff']=user['is_staff']
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

def get_auth_for_user(user):
	tokens = RefreshToken.for_user(user)
	return {
		'user': UserSerializer(user).data,
		'tokens': {
			'access': str(tokens.access_token),
			'refresh': str(tokens),
		}
	}


class SignInView(APIView):
	permission_classes = [AllowAny]

	def post(self, request):
		bpNumber = request.data.get('bpNumber')
		password = request.data.get('password')
		if not bpNumber or not password:
			return Response(status=400)
		
		user = authenticate(bpNumber=bpNumber, password=password)
		if not user:
			return Response(status=401)

		user_data = get_auth_for_user(user)

		return Response(user_data)




class GetUserApiView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        user = CustomUser.objects.filter(is_superuser=False)
        serializer = UserSerializer(user,many=True)
        return Response(serializer.data)
    
class createUserApiView(APIView):
    def post(self,request):
        data=request.data
        serializer = UserSerializer(data=data)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        # print(request.data)
        return Response(serializer.data)

class AppointMentApiView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        created = request.data['created']
        dateObj=convertStringToDateObj(created)
        
        appointments=Appointment.objects.filter(
           Q( created__year=dateObj.year,
            created__month=dateObj.month,
            created__day=dateObj.day)
            ).order_by('status','designation_id','appoint_time')
        serializers=AppointMentSerializer(appointments,many=True)
        return Response(serializers.data)
    
    def put(self,request):
       
        id=request.data['id']
        user=request.user
        appoint_time=request.data['appoint_time']
        note=request.data['note']
        status=request.data['status']
        appointment=Appointment.objects.get(pk=id)
        appointment.appoint_time=appoint_time
        appointment.note=note
        appointment.status=status
        appointment.save()
        serializer=AppointMentSerializer(appointment)
        return Response(serializer.data)
    
    
    
class CreateAppointMentApiView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        id=request.data['id']
        reason = request.data['reason']
        created=request.data['created']
        location=request.data['location']
        other=request.data['other']
        desiredtime=request.data['desiredtime']
        dateObj=convertStringToDateObj(created)
        exist=Appointment.objects.filter(Q(user_id=id),
                                         
                                        Q(
                                            created__year=dateObj.year,
                                            created__month=dateObj.month,
                                            created__day=dateObj.day
                                            ))
        if exist.exists():
            # print('exists')
            serializers=AppointMentSerializer(exist.first())
            return Response(serializers.data)
        else:
            user=CustomUser.objects.get(pk=id)
            appointment=Appointment.objects.create(
               user_id=id,
               reason=reason,
               location_id=location,
               other=other,
               desiredtime=desiredtime,
               designation=user.designation
               )
            appointment.save()
            serializers=AppointMentSerializer(appointment)
            return Response(serializers.data)
  
class GetSingleAppointMentApiView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        id=request.data['id']
        created = request.data['created']
        dateObj=convertStringToDateObj(created)
        try :  
            appointments=Appointment.objects.get(
                Q(user_id=id),
                 Q(
                                            created__year=dateObj.year,
                                            created__month=dateObj.month,
                                            created__day=dateObj.day
                                            ))
            serializers=AppointMentSerializer(appointments)
            return Response({"mess":True,"data":serializers.data})
        except Appointment.DoesNotExist:
            return Response({"mess":False,"data":None})
      
      
class getDesignationApiView(APIView):
    def get(self,request):
        designations=designation.objects.all()
        serializer=DesignationSerializer(designations,many=True)
        return Response(serializer.data)
              

class TotalApprovedApiView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        status=request.data['status']
        created = request.data['created']
        dateObj=convertStringToDateObj(created)
        count=Appointment.objects.filter(
            Q(status=status),
             Q(
                                            created__year=dateObj.year,
                                            created__month=dateObj.month,
                                            created__day=dateObj.day
                                            )
        ).count()   
        
        return Response({'count':count})        
    
class ZoneApiView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request):
        zone=Zone.objects.all()
        serializer=ZoneSerializer(zone,many=True)
        return Response(serializer.data)
    
class ProfileApiView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self,request):
        data=request.data
        id=data['id']
        picture=data['picture']
        user=CustomUser.objects.get(pk=id)
        user.picture=picture
        user.save()
        serializer=UserSerializer(user)
        return Response(serializer.data)
            
class changePassword(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        id=request.data['id']
        currentPassword=request.data['currentPassword']
        newPassword=request.data['newPassword']
        user=CustomUser.objects.get(pk=id)
        if user.check_password(currentPassword):
            user.set_password(newPassword)
            user.save()
            return Response({'data':True})
        
        
        return Response({'data':False})           