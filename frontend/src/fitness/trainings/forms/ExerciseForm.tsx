import { zodResolver } from "@hookform/resolvers/zod";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Box, Button, Divider, Grid } from "@mui/material";
import { FunctionComponent } from "react";
import { Controller, useForm } from "react-hook-form";

import { IncrementableNumberField } from "../../../common/components/NumberField";
import { TrainingExercise } from "../../api/models";
import { TrainingExerciseSchema } from "../../api/schemas";

const StepButton: FunctionComponent<{
  exercise: TrainingExercise;
  disabled?: boolean;
}> = ({ exercise, disabled }) => {
  if (exercise.started) {
    return (
      <Button
        startIcon={<CheckCircleIcon />}
        type="submit"
        variant="contained"
        size="small"
        color="success"
        sx={{ mt: 1, mr: 1 }}
        disabled={disabled}
      >
        Complete Set
      </Button>
    );
  } else {
    return (
      <Button
        startIcon={<PlayCircleFilledIcon />}
        type="submit"
        variant="contained"
        size="small"
        sx={{ mt: 1, mr: 1 }}
        disabled={disabled}
      >
        Start Set
      </Button>
    );
  }
};

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
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
      <Divider sx={{ mt: 2, mb: 1 }} />
      <StepButton disabled={disabled} exercise={exercise} />
    </Box>
  );
};
