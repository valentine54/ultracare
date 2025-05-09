from django.urls import path
from .views import AppointmentCreateView, JobCreateAPIView, job_list, JobDetailAPIView
from . import views

urlpatterns = [
    path('appointments/', AppointmentCreateView.as_view(), name='create-appointment'),
    # path('jobs/', JobCreateAPIView.as_view(), name='post-job'),
    # path('api/jobs/', job_list, name='job-list'),

    path('jobs/', JobCreateAPIView.as_view(), name='post-job'),  # for POST
    path('api/jobs/', job_list, name='job-list'),  # for GET
    # path('api/jobs/', views.get_jobs),
   
    #  path('jobs/upload/', JobCreateAPIView.as_view(), name='upload_job'),
    # New endpoints
    path('jobs/<int:pk>/', JobDetailAPIView.as_view(), name='job-detail'),
]