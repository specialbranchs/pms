from django.contrib import admin

# Register your models here.
from .models import CustomUser,designation,Appointment,Zone


@admin.register(CustomUser)
class CustomAdmin(admin.ModelAdmin):
    list_display=("id","bpNumber",'sbid',"name","email","designation","is_superuser","is_admin","is_staff")
    

@admin.register(designation)
class DesignationAdmin(admin.ModelAdmin):
    list_display=("id","dig_name")
    
@admin.register(Zone)
class ZoneAdmin(admin.ModelAdmin):
    list_display=("id","zone")
            
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display=("id","reason" ,"desiredtime","location","other","status","appoint_time","note","created")
           