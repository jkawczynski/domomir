import factory
from django.contrib.auth import get_user_model
from factory import Sequence
from factory.django import DjangoModelFactory
from factory.fuzzy import FuzzyChoice
from fitness.models import (
    Training,
    TrainingExercise,
    TrainingPlan,
    TrainingPlanExercise,
)


class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()

    name = Sequence(lambda n: "username_%d" % n)


class TrainingFactory(DjangoModelFactory):
    class Meta:
        model = Training


class TrainingExerciseFactory(DjangoModelFactory):
    class Meta:
        model = TrainingExercise

    training = factory.SubFactory(TrainingFactory)
    name = Sequence(lambda n: "Exercise %d" % n)


class TrainingPlanFactory(DjangoModelFactory):
    class Meta:
        model = TrainingPlan

    weekday = FuzzyChoice(TrainingPlan.WEEKDAYS)


class TrainingPlanExerciseFactory(DjangoModelFactory):
    class Meta:
        model = TrainingPlanExercise

    training_plan = factory.SubFactory(TrainingPlanFactory)
