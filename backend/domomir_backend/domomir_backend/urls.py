from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from foods import views as food_views
from shutter import views as shutter_views
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r"recipes", food_views.RecipeViewSet)
router.register(r"tags", food_views.TagsViewSet)
router.register(r"shutter", shutter_views.ShutterViewSet, basename="shutter")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path(
        r"recipes_upload/",
        food_views.RecipeUploadView.as_view(),
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
