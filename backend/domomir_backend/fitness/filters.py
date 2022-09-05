import django_filters
from fitness.models import TrainingPlan


class TrainingPlanFilter(django_filters.rest_framework.FilterSet):
    weekday = django_filters.CharFilter()

    class Meta:
        model = TrainingPlan
        fields = ("weekday",)

