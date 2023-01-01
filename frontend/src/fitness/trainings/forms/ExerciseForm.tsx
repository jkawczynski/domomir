import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Checkbox } from "@mui/material";
import { FunctionComponent } from "react";
import { Controller, useForm } from "react-hook-form";

import { IncrementableNumberField } from "../../../common/components/NumberField";
import { TrainingExercise } from "../../api/models";
import { TrainingExerciseSchema } from "../../api/schemas";

export const ExerciseForm: FunctionComponent<{
  exercise: TrainingExercise;
  onSubmit: (exercise: TrainingExercise) => void;
  disabled?: boolean;
}> = ({ exercise, onSubmit, disabled }) => {
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
      sx={{ maxWidth: 500 }}
    >
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Checkbox sx={{mt: 2}} />
        </Grid>
        <Grid item xs={5}>
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
        <Grid item xs={5}>
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
    </Box>
  );
};

