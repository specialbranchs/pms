from django.urls import path
from .views import * 
from rest_framework_simplejwt.views import (
  
    TokenRefreshView,
)
urlpatterns = [

    # path('register', Register.as_view()),
    path('signin', SignInView.as_view()),
    path('appointments', AppointMentApiView.as_view()),
    path('createappointment',CreateAppointMentApiView.as_view()),
    path('getsingleappoint',GetSingleAppointMentApiView.as_view()),
    path('createuser',createUserApiView.as_view()),
    path('designations',getDesignationApiView.as_view()),
    path('count',TotalApprovedApiView.as_view()),
    # path('logout', LogOutView.as_view()),
    path('zone',ZoneApiView.as_view()),
    path('getuser',GetUserApiView.as_view()),
    path('update-profile',ProfileApiView.as_view()),
    path('change-password',changePassword.as_view()),
    path('user-delete',DeleteUserApiView.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),




]
