import { Divider, Stack } from "@mui/material";
import { FunctionComponent } from "react";

import { TrainingExercise } from "../../api/models";
import { Exercise } from "./Exercise";

export const ExerciseSteps: FunctionComponent<{
  exercises: TrainingExercise[];
}> = ({ exercises }) => {
  return (
    <Stack mt={2} direction="column" divider={<Divider />} spacing={2}>
      {exercises.map((exercise) => (
        <Exercise exercise={exercise} />
      ))}
    </Stack>
  );
};
