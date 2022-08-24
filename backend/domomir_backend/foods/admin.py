from django.contrib import admin

from foods.models import Recipe, RecipeTag, RecipePicture

# Register your models here.

@admin.register(Recipe)
class RecipesAdmin(admin.ModelAdmin):
    pass


@admin.register(RecipeTag)
class RecipeTagsAdmin(admin.ModelAdmin):
    pass


@admin.register(RecipePicture)
class RecipePictureAdmin(admin.ModelAdmin):
    pass
