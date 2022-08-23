from django.contrib import admin

from foods.models import Recipe, RecipeTag

# Register your models here.

@admin.register(Recipe)
class RecipesAdmin(admin.ModelAdmin):
    pass


@admin.register(RecipeTag)
class RecipeTagsAdmin(admin.ModelAdmin):
    pass
