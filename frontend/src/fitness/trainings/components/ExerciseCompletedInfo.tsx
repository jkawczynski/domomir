import { FunctionComponent } from "react";
import {
  Box,
  Typography,
} from "@mui/material";

import { TrainingExercise } from "../../api/models";

export const ExerciseCompletedInfo: FunctionComponent<{
  exercise: TrainingExercise;
}> = ({ exercise }) => {
  return (
    <Box>
      # {exercise.set_number}
      <Typography variant="caption" display="block">
        Reps: {exercise.reps}
      </Typography>
      {exercise.weight && (
        <Typography variant="caption" display="block">
          Weight: {exercise.weight}kg
        </Typography>
      )}
      <Typography
        color={exercise.completed ? "green" : "orange"}
        variant="subtitle2"
        display="block"
      >
       {exercise.completed ? "Completed" : "Skipped"} 
      </Typography>
    </Box>
  );
};
