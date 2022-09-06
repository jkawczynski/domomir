from django.db import transaction
from fitness.exceptions import TrainingAlreadyRunning
from fitness.models import Training, TrainingExercise, TrainingPlan


def create_training_exercises(plan: TrainingPlan, training: Training):
    exercises = [
        TrainingExercise(
            training=training,
            name=exercise.name,
            set_number=set_number,
            reps=exercise.reps,
            weight=exercise.starting_weight,
        )
        for exercise in plan.exercises.all()
        for set_number in range(1, exercise.sets + 1)
    ]
    TrainingExercise.objects.bulk_create(exercises)


def copy_plan_exercises(original_plan_pk: int, plan: TrainingPlan):
    original_plan = TrainingPlan.objects.get(pk=original_plan_pk)
    for exercise in original_plan.exercises.all():
        exercise.pk = None
        exercise.training_plan = plan
        exercise.save()


@transaction.atomic
def start_training(plan: TrainingPlan):
    original_plan_pk = plan.pk
    existing_training = Training.objects.filter(
        owner=plan.owner, started__isnull=False, completed__isnull=True
    ).first()

    if existing_training:
        raise TrainingAlreadyRunning(
            f"Other training is already running: {existing_training.description}"
        )

    description = plan.weekday_verbose
    description += f" - {plan.description}"

    training = Training.objects.create(
        description=description,
        owner=plan.owner,
    )

    plan.pk = None
    plan.training = training
    plan.save()

    copy_plan_exercises(original_plan_pk, plan)
    create_training_exercises(plan, training)

    return training
