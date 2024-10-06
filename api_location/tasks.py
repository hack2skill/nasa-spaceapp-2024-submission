from celery import shared_task
from django.core.mail import send_mail
from twilio.rest import Client
from django.conf import settings

@shared_task
def send_email_notification(email, overpass_time):
    send_mail(
        'Landsat Overpass Notification',
        f'Landsat satellite will pass over your target location at {overpass_time}.',
        'no-reply@landsatapp.com',
        [email],
        fail_silently=False,
    )

@shared_task
def send_sms_notification(phone_number, overpass_time):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    client.messages.create(
        body=f'Landsat satellite will pass over your target location at {overpass_time}.',
        from_=settings.TWILIO_PHONE_NUMBER,
        to=phone_number
    )
