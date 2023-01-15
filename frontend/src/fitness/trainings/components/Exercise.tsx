import { LinearProgress } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { getTrainingExercise, updateTrainingExercise } from "../../api";
import { TrainingExercise } from "../../api/models";
import { ExerciseForm } from "../forms";
import { ExerciseCompletedInfo } from "./ExerciseCompletedInfo";

export const Exercise: FunctionComponent<{
  exercise: TrainingExercise;
}> = ({ exercise }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getTrainingExercise", exercise.id],
    queryFn: () => getTrainingExercise(exercise.id),
    initialData: exercise,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const mutation = useMutation({
    mutationFn: updateTrainingExercise,
    onSuccess: () => {
      console.log("update udany");
      refetch();
    },
  });
  const onSubmit = (formData: TrainingExercise) => {
    const currentDate = new Date();
    formData.completed = currentDate;
    mutation.mutate(formData);
  };
  const onSkip = (skippedExercise: TrainingExercise) => {
    exercise.skipped = true;
    mutation.mutate({
      id: skippedExercise.id,
      skipped: true,
    } as TrainingExercise);
  };
  return (
    <>
      {(isLoading || mutation.isLoading) && <LinearProgress />}
      {data.completed || data.skipped ? (
        <ExerciseCompletedInfo exercise={data} />
      ) : (
        <ExerciseForm
          disabled={isLoading || mutation.isLoading}
          exercise={data}
          onSubmit={onSubmit}
          onSkip={onSkip}
        />
      )}
    </>
  );
};
