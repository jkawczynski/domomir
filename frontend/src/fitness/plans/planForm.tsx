import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  getTrainingPlans,
  TrainingPlan,
  TrainingPlanSchema,
} from "../../api/fitness.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { WeekdaySelect } from "../weekdaySelect";
import { PlanExercisesManagableList } from "./planExercisesList";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../common/spinner";

export const TrainingPlanForm: FunctionComponent<{
  plan?: TrainingPlan;
  nextAvailableWeekday?: string;
  onSubmit: (plan: TrainingPlan) => void;
}> = ({ plan, nextAvailableWeekday, onSubmit }) => {
  const { data, isLoading } = useQuery(["getTrainingPlans"], getTrainingPlans);
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
  if (isLoading) return <Spinner />;
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
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">x</InputAdornment>
                ),
              }}
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
