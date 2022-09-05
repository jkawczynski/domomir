from django.db.models.expressions import ExpressionWrapper, F
from django.db.models.fields import BooleanField
from django.db.models.query_utils import Q
from django_filters import rest_framework as filters
from fitness.filters import TrainingPlanFilter
from fitness.models import Training, TrainingPlan
from fitness.serializers import TrainingPlanSerializer, TrainingSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response


class TrainingPlanViewset(viewsets.ModelViewSet):
    queryset = TrainingPlan.objects.all()
    serializer_class = TrainingPlanSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TrainingPlanFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(owner=self.request.user)
        return queryset

    @action(detail=True, methods=["POST"])
    def start_training(self, _, pk=None):
        training_plan = get_object_or_404(TrainingPlan, pk=pk)
        training = training_plan.start_training()
        serializer = TrainingSerializer(training)
        return Response(serializer.data)


class TrainingViewset(viewsets.ModelViewSet):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(owner=self.request.user)
        queryset = queryset.annotate(
            is_active=ExpressionWrapper(
                Q(completed=None),
                output_field=BooleanField(),
            )
        )
        return queryset.order_by("is_active", "-completed")

    @action(detail=False, methods=["GET"])
    def get_active(self, request):
        training = get_object_or_404(
            Training, completed__isnull=True, owner=request.user
        )
        serializer = self.get_serializer(training)
        return Response(serializer.data)
