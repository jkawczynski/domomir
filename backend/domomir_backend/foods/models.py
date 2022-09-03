import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone
from easy_thumbnails.fields import ThumbnailerImageField


class RecipeTag(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class RecipePicture(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = ThumbnailerImageField(blank=True, null=True, upload_to="recipe_pictures/")
    created = models.DateTimeField(default=timezone.now)


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    tags = models.ManyToManyField(RecipeTag, related_name="tags")
    picture = models.OneToOneField(
        RecipePicture, on_delete=models.CASCADE, related_name="recipe", null=True
    )

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    name = models.CharField(max_length=255)
    amount_and_unit = models.CharField(max_length=255, null=True, blank=True)
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="ingredients"
    )

    def __str__(self):
        return self.name


class ShoppingListItem(models.Model):
    name = models.CharField(max_length=255)
    marked_as_done = models.BooleanField(default=False)
    created = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ("marked_as_done", "-created")
