from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from foods import views as food_views
from rest_framework.routers import DefaultRouter
from shutter import views as shutter_views

router = DefaultRouter()
router.register(r"recipes", food_views.RecipeViewSet)
router.register(r"tags_list", food_views.TagsListViewSet, basename="tags")
router.register(r"tags", food_views.TagsViewSet)
router.register(r"ingredients", food_views.IngredientsViewSet, basename="ingredients")
router.register(r"shutter", shutter_views.ShutterViewSet, basename="shutter")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path(
        r"recipes_upload/",
        food_views.RecipeUploadView.as_view(),
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
