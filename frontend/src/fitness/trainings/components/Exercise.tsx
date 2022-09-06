import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { updateTrainingExercise } from "../../api";
import { TrainingExercise } from "../../api/models";
import { ExerciseForm } from "../forms";

export const Exercise: FunctionComponent<{
  exercise: TrainingExercise;
  onFinish: () => void;
}> = ({ exercise, onFinish }) => {
  const mutation = useMutation(updateTrainingExercise);
  const onStart = () => {
    exercise.started = new Date();
    mutation.mutate(exercise);
  };
  const onSubmit = (formData: TrainingExercise) => {
    const completed = new Date();
    formData.completed = completed;
    exercise.completed = completed;
    mutation.mutate(exercise);
    onFinish();
  };
  if (!exercise.started) {
    return (
      <Button
        startIcon={<PlayCircleFilledIcon />}
        onClick={onStart}
        variant="contained"
        size="small"
        sx={{ mt: 1, mr: 1 }}
        disabled={mutation.isLoading}
      >
        Start
      </Button>
    );
  }
  return (
    <ExerciseForm
      disabled={mutation.isLoading}
      exercise={exercise}
      onSubmit={onSubmit}
    />
  );
};
