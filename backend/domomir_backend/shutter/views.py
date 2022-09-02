from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response


class ShutterViewSet(viewsets.ViewSet):
    def list(self, _):
        return Response(
            data={
                "ip_addr": settings.SHUTTER_IP_ADDRESS,
                "proxy_address": settings.SHUTTER_PROXY_ADDRESS,
            }
        )
