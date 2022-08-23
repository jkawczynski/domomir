from rest_framework import serializers
from typing import Optional, List

from foods.models import Recipe, RecipeTag, RecipePicture


class RecipeTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeTag
        fields = ("name", "tag_type")


class RecipeSerializer(serializers.ModelSerializer):
    tags = RecipeTagSerializer(many=True)
    picture = serializers.SerializerMethodField()

    def get_picture(self, recipe: Recipe) -> Optional[str]:
        request = self.context.get("request")
        return request.build_absolute_uri(recipe.picture.file.url)

    class Meta:
        model = Recipe
        fields = "__all__"


class RecipeInputSerializer(RecipeSerializer):
    picture = serializers.CharField(required=False)

    def _save_picture(self, instance: Recipe, picture_id: str = None):
        if not picture_id:
            return

        picture = RecipePicture.objects.get(pk=picture_id)
        instance.picture = picture
        instance.save(update_fields=["picture"])

    def _save_tags(self, instance: Recipe, tags: List[dict]):
        tags = RecipeTag.objects.filter(name__in=[tag["name"] for tag in tags])
        instance.tags.set(tags)

    def update(self, instance: Recipe, validated_data: dict) -> Recipe:
        tags = validated_data.pop("tags")
        picture_id = validated_data.pop("picture", None)
        Recipe.objects.filter(pk=instance.pk).update(**validated_data)

        self._save_picture(instance, picture_id)
        self._save_tags(instance, tags)
        return instance

    def create(self, validated_data: dict) -> Recipe:
        tags = validated_data.pop("tags")
        picture_id = validated_data.pop("picture")
        recipe = Recipe.objects.create(**validated_data)

        self._save_picture(recipe, picture_id)
        self._save_tags(recipe, tags)
        return recipe
