import django_filters
from foods.models import Recipe


class RecipeFilter(django_filters.rest_framework.FilterSet):
    name = django_filters.CharFilter(lookup_expr="icontains")
    ingredients = django_filters.CharFilter(field_name="ingredients", method="filter_by_ingredients")
    tags = django_filters.CharFilter(field_name="tags__name", method="filter_by_list")
    ingredients = django_filters.CharFilter(field_name="ingredients__name", method="filter_by_list")

    def filter_by_list(self, queryset, field_name, value):

        values = value.split(",")
        for item in values:
            queryset = queryset.filter(**{field_name: item})
        return queryset

    class Meta:
        model = Recipe
        fields = ("tags", "ingredients", "name")
