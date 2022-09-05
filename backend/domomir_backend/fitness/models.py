from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone
from fitness.exceptions import TrainingAlreadyRunning


class Training(models.Model):
    started = models.DateTimeField(default=timezone.now)
    completed = models.DateTimeField(null=True)
    description = models.CharField(max_length=128)
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class TrainingExercise(models.Model):
    training = models.ForeignKey(Training, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    reps = models.PositiveSmallIntegerField()
    sets = models.PositiveSmallIntegerField(null=True)
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

    @property
    def weekday_verbose(self):
        return self.WEEKDAYS[int(self.weekday) - 1]

    def start_training(self):
        existing_training = Training.objects.filter(
            owner=self.owner, started__isnull=False, completed__isnull=True
        ).first()

        if existing_training:
            raise TrainingAlreadyRunning(
                f"Other training is already running: {existing_training.description}"
            )

        description = self.weekday_verbose
        description += f" - {self.description}"
        return Training.objects.create(
            description=description,
            owner=self.owner,
        )

    class Meta:
        unique_together = ("weekday", "owner")
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
