from django.db.models.expressions import ExpressionWrapper
from django.db.models.fields import BooleanField
from django.db.models.query_utils import Q
from django_filters import rest_framework as filters
from fitness.filters import TrainingPlanFilter
from fitness.models import Training, TrainingExercise, TrainingPlan
from fitness.serializers import (
    TrainingExerciseSerializer,
    TrainingPlanSerializer,
    TrainingSerializerDetailed,
    TrainingSerializerSimple,
)
from fitness.trainings import start_training
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
        queryset = queryset.filter(owner=self.request.user, training__isnull=True)
        return queryset

    @action(detail=True, methods=["POST"])
    def start_training(self, _, pk=None):
        training_plan = get_object_or_404(TrainingPlan, pk=pk)
        training = start_training(training_plan)
        serializer = TrainingSerializer(training)
        return Response(serializer.data)


class TrainingViewset(viewsets.ModelViewSet):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializerSimple

    def get_serializer_class(self):
        if self.action == "retrieve":
            return TrainingSerializerDetailed
        return super().get_serializer_class()

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

class TrainingExerciseVewiset(viewsets.ModelViewSet):
    queryset = TrainingExercise.objects.all()
    serializer_class = TrainingExerciseSerializer
