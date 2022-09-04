import { FunctionComponent } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormHelperText,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

export const PlanExercisesManagableList: FunctionComponent = () => {
  const { control, formState, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "exercises",
    control,
  });
  const { errors } = formState;

  return (
    <Stack>
      <Typography variant="h6">Exercises:</Typography>
      <Stack spacing={4}>
        {fields.map((field, index) => {
          const error = errors?.exercises as unknown as Array<any>;
          return (
            <Card sx={{ minWidth: 275 }} key={field.id}>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Exercise name (eg. Dead lift)"
                    size="small"
                    error={!!error?.[index]?.name?.message}
                    helperText={error?.[index]?.name?.message}
                    {...register(`exercises.${index}.name` as const)}
                  />
                  <TextField
                    label="Sets"
                    size="small"
                    type="number"
                    error={!!error?.[index]?.sets?.message}
                    helperText={error?.[index]?.sets?.message}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">x</InputAdornment>
                      ),
                    }}
                    {...register(`exercises.${index}.sets` as const)}
                  />
                  <TextField
                    label="Reps (optional)"
                    size="small"
                    type="number"
                    error={!!error?.[index]?.reps?.message}
                    helperText={error?.[index]?.reps?.message}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">x</InputAdornment>
                      ),
                    }}
                    {...register(`exercises.${index}.reps` as const)}
                  />
                  <TextField
                    label="Starting weight (optional)"
                    size="small"
                    type="number"
                    error={!!error?.[index]?.starting_weight?.message}
                    helperText={error?.[index]?.starting_weight?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">kg</InputAdornment>
                      ),
                    }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    {...register(`exercises.${index}.starting_weight` as const)}
                  />
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  color="error"
                  size="small"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          );
        })}
        {!!errors?.exercises?.message && fields.length < 1 && (
          <FormHelperText error={true}>
            Exercises list cannot be empty
          </FormHelperText>
        )}
        <Button onClick={() => append({ order: fields.length })}>
          Add new exercise
        </Button>
      </Stack>
    </Stack>
  );
};
