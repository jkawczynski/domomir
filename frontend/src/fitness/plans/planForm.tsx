import { Controller, FormProvider, useForm } from "react-hook-form";
import { TrainingPlan, TrainingPlanSchema } from "../../api/fitness.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { WeekdaySelect } from "../weekdaySelect";
import { PlanExercisesManagableList } from "./planExercisesList";

export const TrainingPlanForm: FunctionComponent<{
  onSubmit: (plan: TrainingPlan) => void;
}> = ({ onSubmit }) => {
  const form = useForm<TrainingPlan>({
    resolver: zodResolver(TrainingPlanSchema),
    defaultValues: {
      weekday: "1",
      exercises: [{
          order: 0,
      }],
    },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <FormProvider {...form}>
      <Box
        component="form"
        onSubmit={form.handleSubmit((plan) => onSubmit(plan))}
        noValidate
        sx={{ mt: 2 }}
      >
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Controller
              render={({ field: { onChange, value } }) => (
                <WeekdaySelect onChange={onChange} value={value} />
              )}
              name="weekday"
              control={form.control}
            />
            <TextField
              label="Short description"
              size="small"
              error={!!errors?.description?.message}
              helperText={errors?.description?.message}
              {...form.register("description")}
            />
          </Stack>
          <PlanExercisesManagableList />
          <Button disabled={isSubmitting} type="submit" variant="outlined">
            Save
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};
