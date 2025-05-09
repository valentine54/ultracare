from django.contrib import admin

# Register your models here.
from .models import Appointment, Job  # Import Job

admin.site.register(Appointment)
admin.site.register(Job)  # Register Job