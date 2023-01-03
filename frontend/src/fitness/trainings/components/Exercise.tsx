import { LinearProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { updateTrainingExercise } from "../../api";
import { TrainingExercise } from "../../api/models";
import { ExerciseForm } from "../forms";
import { ExerciseCompletedInfo } from "./ExerciseCompletedInfo";

export const Exercise: FunctionComponent<{
  exercise: TrainingExercise;
}> = ({ exercise }) => {
  const mutation = useMutation(updateTrainingExercise);
  const onSubmit = (formData: TrainingExercise) => {
    const currentDate = new Date();
    formData.completed = currentDate;
    exercise.completed = currentDate;
    mutation.mutate(formData);
  };
  const onSkip = (skippedExercise: TrainingExercise) => {
    exercise.skipped = true;
    mutation.mutate({ id: skippedExercise.id, skipped: true });
  };
  return (
    <>
      {mutation.isLoading && <LinearProgress />}
      {exercise.completed || exercise.skipped ? (
        <ExerciseCompletedInfo exercise={exercise} />
      ) : (
        <ExerciseForm
          disabled={mutation.isLoading}
          exercise={exercise}
          onSubmit={onSubmit}
          onSkip={onSkip}
        />
      )}
    </>
  );
};
