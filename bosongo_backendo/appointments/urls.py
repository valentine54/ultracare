from django.urls import path
from . import views

urlpatterns = [
    path('appointments/', views.AppointmentCreateView.as_view(), name='create_appointment'),
    path('jobs/', views.job_list, name='job_list'),  # GET + POST
    path('jobs/<int:pk>/', views.JobDetailAPIView.as_view(), name='job_detail'),
]
