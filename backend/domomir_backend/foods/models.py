import uuid

from django.db import models
from easy_thumbnails.fields import ThumbnailerImageField


class RecipeTag(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


# TODO: remove periodically pictures not attached to any recipe
class RecipePicture(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = ThumbnailerImageField(blank=True, null=True, upload_to="recipe_pictures/")
    created = models.DateTimeField(auto_now_add=True)


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    tags = models.ManyToManyField(RecipeTag, related_name="tags")
    ingredients = models.JSONField(null=True, blank=True)
    picture = models.OneToOneField(
        RecipePicture, on_delete=models.CASCADE, related_name="recipe", null=True
    )

    def __str__(self):
        return self.name
