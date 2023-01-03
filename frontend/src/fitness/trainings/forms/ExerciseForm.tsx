import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  Grid,
  Checkbox,
  Typography,
  Stack,
} from "@mui/material";
import { FunctionComponent } from "react";
import { Controller, useForm } from "react-hook-form";

import { IncrementableNumberField } from "../../../common/components/NumberField";
import { TrainingExercise } from "../../api/models";
import { TrainingExerciseSchema } from "../../api/schemas";

export const ExerciseForm: FunctionComponent<{
  exercise: TrainingExercise;
  onSubmit: (exercise: TrainingExercise) => void;
  onSkip: (exercise: TrainingExercise) => void;
  disabled?: boolean;
}> = ({ exercise, onSubmit, onSkip, disabled }) => {
  const { handleSubmit, control } = useForm<TrainingExercise>({
    resolver: zodResolver(TrainingExerciseSchema),
    defaultValues: {
      id: exercise.id,
      name: exercise.name,
      set_number: exercise.set_number,
      reps: exercise.reps,
      weight: exercise.weight,
    },
  });
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ maxWidth: 500, mt: 1 }}
    >
      <Typography> # {exercise.set_number} </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Controller
            render={({ field: { onChange, value } }) => (
              <IncrementableNumberField
                label="Reps"
                onChange={onChange}
                value={value}
                disabled={disabled}
              />
            )}
            name="reps"
            control={control}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            render={({ field: { onChange, value } }) => (
              <IncrementableNumberField
                label="Weight (kg)"
                onChange={onChange}
                value={value}
                disabled={disabled}
              />
            )}
            name="weight"
            control={control}
          />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 1 }}
        justifyContent="flex-end"
      >
        <Button
          size="small"
          disabled={disabled}
          color="warning"
          variant="outlined"
          onClick={() => onSkip(exercise)}
        >
          Skip
        </Button>
        <Button
          size="small"
          disabled={disabled}
          color="success"
          variant="outlined"
          type="submit"
        >
          Complete
        </Button>
      </Stack>
    </Box>
  );
};
