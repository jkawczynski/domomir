import { zodResolver } from "@hookform/resolvers/zod";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Box, Button, Grid } from "@mui/material";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";

import { NumberField } from "../../../common/components";
import { TrainingExercise } from "../../api/models";
import { TrainingExerciseSchema } from "../../api/schemas";

export const ExerciseForm: FunctionComponent<{
  exercise: TrainingExercise;
  onSubmit: (exercise: TrainingExercise) => void;
  disabled?: boolean;
}> = ({ exercise, onSubmit, disabled }) => {
  const { formState, handleSubmit, register } = useForm<TrainingExercise>({
    resolver: zodResolver(TrainingExerciseSchema),
    defaultValues: {
      id: exercise.id,
      name: exercise.name,
      set_number: exercise.set_number,
      reps: exercise.reps,
      weight: exercise.weight,
    },
  });
  const { errors } = formState;
  return (
    <Box
      component="form"
      onSubmit={handleSubmit((exercise) => onSubmit(exercise))}
      noValidate
    >
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <NumberField
            label="Reps"
            margin="normal"
            size="small"
            error={!!errors?.reps?.message}
            helperText={errors?.reps?.message}
            disabled={disabled}
            {...register("reps")}
          />
        </Grid>
        <Grid item xs={6}>
          <NumberField
            label="Weight"
            margin="normal"
            size="small"
            error={!!errors?.weight?.message}
            helperText={errors?.weight?.message}
            disabled={disabled}
            {...register("weight")}
          />
        </Grid>
      </Grid>
      <Button
        startIcon={<PlayCircleFilledIcon />}
        type="submit"
        variant="contained"
        size="small"
        color="success"
        sx={{ mt: 1, mr: 1 }}
      >
        Complete Set
      </Button>
    </Box>
  );
};
