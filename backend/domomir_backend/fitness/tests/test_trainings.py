import pytest
from fitness.exceptions import TrainingAlreadyRunning
from fitness.tests.factories import TrainingFactory, TrainingPlanFactory, UserFactory
from fitness.trainings import start_training


@pytest.mark.djang_db
class StartTrainingTestCase:
    def test_start_training_running(self):
        """
        Should not allow to start trainig if there is one
        already running for the user
        """
        user = UserFactory()
        TrainingFactory(user=user)
        training_plan = TrainingPlanFactory(user=user)

        with pytest.raises(TrainingAlreadyRunning):
            start_training(training_plan)
