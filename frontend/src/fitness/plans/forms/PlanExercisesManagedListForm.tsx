import { FunctionComponent } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { NumberField } from "../../../common/components";

export const PlanExercisesManagedListForm: FunctionComponent = () => {
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
                  <NumberField
                    label="Sets"
                    size="small"
                    error={!!error?.[index]?.sets?.message}
                    helperText={error?.[index]?.sets?.message}
                    adornment="x"
                    {...register(`exercises.${index}.sets` as const)}
                  />
                  <NumberField
                    label="Reps (optional)"
                    size="small"
                    error={!!error?.[index]?.reps?.message}
                    helperText={error?.[index]?.reps?.message}
                    adornment="x"
                    {...register(`exercises.${index}.reps` as const)}
                  />
                  <NumberField
                    label="Starting weight (optional)"
                    size="small"
                    error={!!error?.[index]?.starting_weight?.message}
                    helperText={error?.[index]?.starting_weight?.message}
                    adornment="kg"
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
