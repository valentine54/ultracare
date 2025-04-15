from rest_framework import generics, status
from rest_framework.response import Response
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail, BadHeaderError
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from smtplib import SMTPException
import logging

logger = logging.getLogger(__name__)

@permission_classes([AllowAny])
class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"message": "Validation error", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Save appointment first
            self.perform_create(serializer)
            appointment = serializer.instance

            # Send email
            self.send_appointment_email(appointment)

            headers = self.get_success_headers(serializer.data)
            return Response(
                {
                    "message": "Appointment successfully booked! You will receive further details about the doctor's availability and office location soon.",
                    "appointment_id": appointment.id
                },
                status=status.HTTP_201_CREATED,
                headers=headers
            )
            
        except Exception as e:
            logger.error(f"Error creating appointment: {str(e)}")
            return Response(
                {"message": "Appointment was saved but we encountered an error sending the confirmation. Please contact the hospital directly."},
                status=status.HTTP_201_CREATED  # Still return 201 because the appointment was saved
            )

    def send_appointment_email(self, appointment):
        subject = f"New Appointment Booking - {appointment.name}"
        
        try:
            # HTML email content
            html_message = render_to_string('appointments/appointment_email.html', {
                'appointment': appointment,
            })
            
            plain_message = strip_tags(html_message)
            
            send_mail(
                subject=subject,
                message=plain_message,
                from_email=None,  # Uses DEFAULT_FROM_EMAIL
                recipient_list=['muriukivalentine583@gmail.com'],
                html_message=html_message,
                fail_silently=False,
            )
            
        except BadHeaderError:
            logger.error("Invalid email header")
            raise
        except SMTPException as e:
            logger.error(f"SMTP error sending email: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error sending email: {str(e)}")
            raise