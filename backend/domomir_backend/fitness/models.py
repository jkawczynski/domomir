from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone


class Training(models.Model):
    started = models.DateTimeField(default=timezone.now)
    completed = models.DateTimeField(null=True)
    description = models.CharField(max_length=128)
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class TrainingExercise(models.Model):
    training = models.ForeignKey(
        Training, on_delete=models.CASCADE, related_name="exercises"
    )
    name = models.CharField(max_length=255)
    started = models.DateTimeField(null=True)
    completed = models.DateTimeField(null=True)
    set_number = models.PositiveSmallIntegerField(null=True)
    reps = models.PositiveSmallIntegerField(null=True)
    weight = models.PositiveSmallIntegerField(null=True)


class TrainingPlan(models.Model):
    WEEKDAYS = [
        "Monday",
        "Tuesday",
        "Wednsday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]
    weekday = models.CharField(
        max_length=2,
        choices=[
            (str(index), weekday) for index, weekday in enumerate(WEEKDAYS, start=1)
        ],
        default="1",
    )
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    description = models.CharField(max_length=128, null=True, blank=True)
    training = models.OneToOneField(
        Training, on_delete=models.CASCADE, null=True, related_name="training_plan"
    )

    @property
    def weekday_verbose(self):
        return self.WEEKDAYS[int(self.weekday) - 1]

    class Meta:
        unique_together = ("weekday", "owner", "training")
        ordering = ("weekday",)


class TrainingPlanExercise(models.Model):
    training_plan = models.ForeignKey(
        TrainingPlan, on_delete=models.CASCADE, related_name="exercises"
    )
    order = models.PositiveSmallIntegerField()
    name = models.CharField(max_length=255)
    sets = models.PositiveSmallIntegerField()
    reps = models.PositiveSmallIntegerField(null=True)
    starting_weight = models.PositiveSmallIntegerField(null=True)
