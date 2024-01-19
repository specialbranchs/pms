from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin

class designation(models.Model):
    dig_name=models.CharField(max_length=255,null=True,blank=True)
    
    def __str__(self):
        return self.dig_name

class MyUserManager(BaseUserManager):
   
    def create_superuser(self, bpNumber, password=None):
        user = self.model(
            bpNumber=bpNumber
        )
        user.is_admin = True
        user.is_superuser=True
        user.is_staff=True
        # print(password)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_adminuser(self, bpNumber,password=None):
        user = self.model(
            bpNumber=bpNumber
        )
        user.is_admin = True
        user.is_superuser=False
        user.is_staff=True
        # print(password)
        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_user(self, email,password=None):
        user = self.model(
            email=email
        )
        user.is_admin = False
        user.is_superuser=False
        user.is_staff=True
        # print(password)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser,PermissionsMixin):
     
    name=models.CharField(max_length=255,null=True,blank=True)
    bpNumber=models.CharField(max_length=255,unique=True,null=False,blank=False)
    sbid=models.CharField(max_length=255,null=True,blank=True)
    phone=models.CharField(max_length=255,null=True,blank=True)
    email=models.CharField(max_length=255,null=True,blank=True)
    designation=models.ForeignKey(designation,on_delete=models.CASCADE,null=True,blank=True)
    picture = models.ImageField(upload_to='pictures-upload/%Y/%m/%d/', max_length=255, null=True, blank=True)
    password=models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    username=None
    
    
    
    USERNAME_FIELD='bpNumber'
    REQUIRED_FIELDS=[]
    objects = MyUserManager()
    
    def __str__(self):
        return self.bpNumber
   
class Zone(models.Model):
    zone =models.CharField(max_length=255,null=True,blank=True)
   
    def __str__(self):
        return self.zone+''    
class Appointment(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    reason=models.TextField(null=True,blank=True)
    status=models.IntegerField(default=2)
    appoint_time=models.TimeField(null=True,blank=True)
    designation=models.ForeignKey(designation,on_delete=models.CASCADE,null=True,blank=True)
    note=models.TextField(null=True,blank=True)
    created = models.DateTimeField(auto_now_add=True,blank=True)
    desiredtime=models.TimeField(null=True,blank=True)
    location=models.ForeignKey(Zone,on_delete=models.CASCADE,null=True,blank=True)
    other=models.TextField(null=True,blank=True)
    
    def __str__(self):
        return self.reason
       
       