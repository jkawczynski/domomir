import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { FunctionComponent } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { TrainingPlan } from "../../api/models";
import { TrainingPlanSchema } from "../../api/schemas";
import { WeekdaySelect } from "../components";
import { PlanExercisesManagedListForm } from "./PlanExercisesManagedListForm";

export const TrainingPlanForm: FunctionComponent<{
  plan?: TrainingPlan;
  nextAvailableWeekday?: string;
  onSubmit: (plan: TrainingPlan) => void;
}> = ({ plan, nextAvailableWeekday, onSubmit }) => {
  const form = useForm<TrainingPlan>({
    resolver: zodResolver(TrainingPlanSchema),
    defaultValues: {
      id: plan?.id,
      weekday: plan?.weekday || nextAvailableWeekday,
      description: plan?.description,
      exercises: plan?.exercises || [
        {
          order: 0,
        },
      ],
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
                <WeekdaySelect
                  initialValue={plan?.weekday}
                  onChange={onChange}
                  value={value}
                />
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
          <PlanExercisesManagedListForm />
          <Button disabled={isSubmitting} type="submit" variant="outlined">
            Save
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};
