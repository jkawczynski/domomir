from rest_framework import viewsets
from rest_framework.response import Response

from users.serializers import UserSerializer

class MeViewSet(viewsets.ViewSet):
    def list(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
