from django.contrib import admin

from foods.models import Recipe, RecipeTag, RecipePicture, RecipeIngredient


class RecipeIngredientAdmin(admin.TabularInline):
    model = RecipeIngredient


@admin.register(Recipe)
class RecipesAdmin(admin.ModelAdmin):
    inlines = [RecipeIngredientAdmin]


@admin.register(RecipeTag)
class RecipeTagsAdmin(admin.ModelAdmin):
    pass


@admin.register(RecipePicture)
class RecipePictureAdmin(admin.ModelAdmin):
    pass
