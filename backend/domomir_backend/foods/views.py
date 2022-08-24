from foods.models import Recipe, RecipeIngredient, RecipePicture, RecipeTag
from foods.serializers import (
    RecipeInputSerializer,
    RecipeSerializer,
)
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet


class RecipeUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        if "file" not in request.data:
            raise ValidationError("There is no file in the request")

        file = request.data["file"]
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
        ingredients = self.request.query_params.getlist("ingredients", [])
        for tag in tags:
            if not tag:
                continue
            queryset = queryset.filter(tags__name=tag)

        for ing in ingredients:
            if not ing:
                continue
            queryset = queryset.filter(ingredients__name=ing)

        return queryset


class TagsViewSet(viewsets.ViewSet):
    def list(self, request):
        tags = list(RecipeTag.objects.all().values_list("name", flat=True).distinct())
        return Response(tags)


class IngredientsViewSet(viewsets.ViewSet):
    def list(self, request):
        ingredients = list(
            RecipeIngredient.objects.all().values_list("name", flat=True).distinct()
        )
        return Response(ingredients)
