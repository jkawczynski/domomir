import { Typography, Box } from "@mui/material";
import { FunctionComponent } from "react";

import { Training } from "../../api/models";
import { ExerciseSteps } from "./ExerciseSteps";

export const TrainingSteps: FunctionComponent<{
  training: Training;
}> = ({ training }) => {
  return (
    <>
      {training.training_plan.exercises.map((exercise) => (
        <Box mt={2}>
          <Typography color="secondary" variant="h2">
            {exercise.name}
          </Typography>
          <Box ml={2}>
            <ExerciseSteps
              exercises={training.exercises.filter(
                (e) => e.name === exercise.name
              )}
            />
          </Box>
        </Box>
      ))}
    </>
  );
};
