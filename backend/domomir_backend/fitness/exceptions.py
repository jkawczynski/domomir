from rest_framework.exceptions import ValidationError


class TrainingAlreadyRunning(ValidationError):
    pass
