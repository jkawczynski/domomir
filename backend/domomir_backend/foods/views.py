from django_filters import rest_framework as filters
from foods.filters import RecipeFilter
from foods.models import Recipe, RecipeIngredient, RecipePicture, RecipeTag
from foods.serializers import (RecipeInputSerializer, RecipeSerializer,
                               RecipeTagSerializer)
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView


class RecipeUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        if "file" not in request.data:
            raise ValidationError("There is no file in the request")

        file = request.data["file"]
        picture = RecipePicture.objects.create(file=file)
        return Response(
            data={"file_id": picture.pk, "file_name": file.name}, status=200
        )


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = RecipeFilter

    def get_serializer_class(self):
        if self.action in ("create", "update"):
            return RecipeInputSerializer

        return RecipeSerializer


class TagsViewSet(viewsets.ModelViewSet):
    queryset = RecipeTag.objects.all()
    serializer_class = RecipeTagSerializer


class TagsListViewSet(viewsets.ViewSet):
    def list(self, request):
        tags = list(RecipeTag.objects.all().values_list("name", flat=True).distinct())
        return Response(tags)


class IngredientsViewSet(viewsets.ViewSet):
    def list(self, request):
        ingredients = list(
            RecipeIngredient.objects.all().values_list("name", flat=True).distinct()
        )
        return Response(ingredients)
