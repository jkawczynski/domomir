from fitness.models import Training, TrainingPlan, TrainingPlanExercise
from rest_framework import serializers


class TrainingPlanExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingPlanExercise
        fields = (
            "order",
            "name",
            "sets",
            "reps",
            "starting_weight",
        )


class TrainingPlanSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    weekday_verbose = serializers.SerializerMethodField()
    exercises = TrainingPlanExerciseSerializer(many=True)

    def get_weekday_verbose(self, instance: TrainingPlan):
        return instance.weekday_verbose

    def get_owner(self, instance: TrainingPlan) -> str:
        return instance.owner.username

    def create(self, validated_data: dict):
        exercises = validated_data.pop("exercises")
        validated_data["owner"] = self.context["request"].user
        plan = TrainingPlan.objects.create(**validated_data)
        for exercise in exercises:
            TrainingPlanExercise.objects.create(training_plan=plan, **exercise)

        return plan

    def update(self, instance: TrainingPlan, validated_data: dict):
        exercises = validated_data.pop("exercises")
        validated_data["owner"] = self.context["request"].user
        TrainingPlan.objects.filter(pk=instance.pk).update(**validated_data)

        instance.exercises.all().delete()
        for exercise in exercises:
            TrainingPlanExercise.objects.create(training_plan=instance, **exercise)

        instance.refresh_from_db()
        return instance

    class Meta:
        model = TrainingPlan
        fields = (
            "id",
            "description",
            "exercises",
            "owner",
            "weekday",
            "weekday_verbose",
        )

class TrainingSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()

    def get_owner(self, instance: Training) -> str:
        return instance.owner.username

    class Meta:
        model = Training
        fields = "__all__"