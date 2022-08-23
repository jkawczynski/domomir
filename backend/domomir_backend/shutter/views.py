import requests
from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response

SHUTTER_STATUS_URL = f"http://{settings.SHUTTER_IP_ADDRESS}/api/shutter/state"
SHUTTER_COMMAND_URL = f"http://{settings.SHUTTER_IP_ADDRESS}/s"


def send_command(command: str):
    response = requests.get(f"{SHUTTER_COMMAND_URL}/{command}")
    return response.json()


def get_status():
    response = requests.get(SHUTTER_STATUS_URL)
    return response.json()["shutter"]


class ShutterViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response(data=get_status())

    def create(self, request):
        return Response(data=send_command(request.data["command"]))
