from django.core.management.base import BaseCommand
from django.conf import settings
from foods.models import Recipe
from tqdm import tqdm
import os


class Command(BaseCommand):
    help = "Regenerates thumbnail with the current config"

    def regenerate_thumbnail(self, recipe: Recipe):
        thumbnail_path = f"{recipe.picture.file.path}.recipe_thumb.jpg"

        thumbnail_options = settings.THUMBNAIL_ALIASES[""]["recipe_thumb"]
        new_thumbnail_path = recipe.picture.file.get_thumbnail(thumbnail_options).path

        os.remove(thumbnail_path)
        os.rename(new_thumbnail_path, thumbnail_path)

    def handle(self, *args, **options):
        recipes = Recipe.objects.all()
        self.stdout.write(
            f"Found {recipes.count()} recipes, regenerating thumbnails now..."
        )

        for recipe in tqdm(recipes):
            self.regenerate_thumbnail(recipe)
