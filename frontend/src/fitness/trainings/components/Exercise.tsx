import { LinearProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { TimeCounter } from "../../../common/components/TimeCounter";
import { updateTrainingExercise } from "../../api";
import { TrainingExercise } from "../../api/models";
import { ExerciseForm } from "../forms";

export const Exercise: FunctionComponent<{
  exercise: TrainingExercise;
  onFinish: () => void;
}> = ({ exercise, onFinish }) => {
  const mutation = useMutation(updateTrainingExercise, {
    onSuccess: (data) => {
      if (data.completed) {
        onFinish();
      }
    },
  });
  const onSubmit = (formData: TrainingExercise) => {
    const currentDate = new Date();
    if (exercise.started) {
      formData.completed = currentDate;
      exercise.completed = currentDate;
    } else {
      formData.started = currentDate;
      exercise.started = currentDate;
    }
    mutation.mutate(formData);
  };
  return (
    <>
      {mutation.isLoading && <LinearProgress />}
      <ExerciseForm
        disabled={mutation.isLoading}
        exercise={exercise}
        onSubmit={onSubmit}
      />
    </>
  );
};
