from typing import List, Optional

from django.db import transaction
from foods.models import (
    Recipe,
    RecipeIngredient,
    RecipePicture,
    RecipeTag,
    ShoppingListItem,
)
from rest_framework import serializers


class ShoppingListItemSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    def get_author(self, instance: ShoppingListItem):
        if not instance.author:
            return
        return instance.author.username

    class Meta:
        model = ShoppingListItem
        fields = (
            "id",
            "name",
            "marked_as_done",
            "author",
        )

    @transaction.atomic
    def create(self, validated_data: dict) -> ShoppingListItem:
        validated_data["author"] = self.context.get("request").user
        return super().create(validated_data)


class RecipeTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeTag
        fields = (
            "id",
            "name",
        )


class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = ("id", "name", "amount_and_unit")


class RecipeSerializer(serializers.ModelSerializer):
    tags = RecipeTagSerializer(many=True)
    picture = serializers.SerializerMethodField()
    ingredients = RecipeIngredientSerializer(many=True, required=False)
    thumbnail = serializers.SerializerMethodField()

    def get_picture(self, recipe: Recipe) -> Optional[str]:
        request = self.context.get("request")
        return request.build_absolute_uri(recipe.picture.file.url)

    def get_thumbnail(self, recipe: Recipe) -> Optional[str]:
        picture_url = self.get_picture(recipe)
        return f"{picture_url}.recipe_thumb.jpg"

    class Meta:
        model = Recipe
        fields = "__all__"


class RecipeInputSerializer(RecipeSerializer):
    picture = serializers.CharField(required=False)
    tags = serializers.ListSerializer(child=serializers.CharField())

    def _save_picture(self, instance: Recipe, picture_id: str = None):
        if not picture_id:
            return

        picture = RecipePicture.objects.get(pk=picture_id)
        instance.picture = picture
        instance.save(update_fields=["picture"])

    def _save_tags(self, instance: Recipe, tags: List[str]):
        existing_tags = RecipeTag.objects.filter(name__in=tags)
        new_tags = [tag for tag in tags if not existing_tags.filter(name=tag).exists()]
        new_tags = RecipeTag.objects.bulk_create(
            [RecipeTag(name=tag) for tag in new_tags]
        )
        instance.tags.set(RecipeTag.objects.filter(name__in=tags))

    def _save_ingredients(self, instance: Recipe, ingredients: List[dict]):
        instance.ingredients.all().delete()
        RecipeIngredient.objects.bulk_create(
            [
                RecipeIngredient(**ingredient, recipe=instance)
                for ingredient in ingredients
            ]
        )

    @transaction.atomic
    def update(self, instance: Recipe, validated_data: dict) -> Recipe:
        tags = validated_data.pop("tags")
        picture_id = validated_data.pop("picture", None)
        ingredients = validated_data.pop("ingredients", [])
        Recipe.objects.filter(pk=instance.pk).update(**validated_data)

        self._save_ingredients(instance, ingredients)
        self._save_picture(instance, picture_id)
        self._save_tags(instance, tags)
        return instance

    @transaction.atomic
    def create(self, validated_data: dict) -> Recipe:
        tags = validated_data.pop("tags")
        picture_id = validated_data.pop("picture")
        ingredients = validated_data.pop("ingredients", [])
        recipe = Recipe.objects.create(**validated_data)

        self._save_ingredients(recipe, ingredients)
        self._save_picture(recipe, picture_id)
        self._save_tags(recipe, tags)
        return recipe
