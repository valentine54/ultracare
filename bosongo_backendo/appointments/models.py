from django.db import models

# Create your models here.

class Appointment(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    specialty = models.CharField(max_length=100)
    date = models.DateField()
    message = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.specialty} - {self.date}"