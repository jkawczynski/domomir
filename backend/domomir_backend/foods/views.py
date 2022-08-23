from foods.models import Recipe, RecipeTag, RecipePicture
from foods.serializers import (
    RecipeSerializer,
    RecipeTagSerializer,
    RecipeInputSerializer,
)
from rest_framework.parsers import MultiPartParser 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError


class RecipeUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        if 'file' not in request.data:
            raise ValidationError("There is no file in the request")

        file = request.data['file']
        picture = RecipePicture.objects.create(file=file)
        return Response(data={"file_id": picture.pk}, status=200)


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_serializer_class(self):
        if self.action in ("create", "update"):
            return RecipeInputSerializer

        return RecipeSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        tags = self.request.query_params.getlist("tags", [])
        for tag in tags:
            queryset = queryset.filter(tags__name=tag)

        return queryset

class TagsViewSet(ModelViewSet):
    queryset = RecipeTag.objects.all()
    serializer_class = RecipeTagSerializer
