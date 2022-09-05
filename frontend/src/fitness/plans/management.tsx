import { Page } from "../../common/page";
import { FunctionComponent } from "react";
import { TrainingPlanForm } from "./planForm";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTrainingPlan,
  editTrainingPlan,
  getTrainingPlanById,
  getTrainingPlans,
  TrainingPlan,
} from "../../api/fitness.api";
import { Spinner } from "../../common/spinner";
import { Typography } from "@mui/material";

const weekdays = [...Array(7).keys()].map((i: number) => String(i + 1));

const getNextAvailableWeekday = (plans: TrainingPlan[]) => {
  const availableWeekdays = weekdays.filter(
    (weekday) => !plans.find((plan) => plan.weekday === weekday)
  );
  if (availableWeekdays.length) {
    return availableWeekdays[0];
  }
  // TODO: disable creating new if there are no weekdays available
  return "1";
};

export const NewTrainingPlanPage: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
  const mutation = useMutation(createTrainingPlan, {
    onSuccess: () => setLocation("/plans"),
  });
  const { data, isLoading } = useQuery(["getTrainingPlans"], getTrainingPlans);
  const error = mutation?.error as Error;

  if (isLoading) return <Spinner />;

  return (
    <Page title="New training plan">
      {!!data && (
        <TrainingPlanForm
          nextAvailableWeekday={getNextAvailableWeekday(data)}
          onSubmit={(plan) => mutation.mutate(plan)}
        />
      )}
      {!!error && <Typography color="error">error</Typography>}
    </Page>
  );
};

export const EditTrainingPlanPage: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const [_, setLocation] = useLocation();
  const { data, isLoading, isError } = useQuery(
    ["getTrainingPlanById", id],
    () => getTrainingPlanById(id)
  );
  const mutation = useMutation(editTrainingPlan, {
    onSuccess: () => setLocation("/plans"),
  });
  const error = mutation?.error as Error;

  if (isLoading) return <Spinner />;
  if (!data && isError) {
    return <Typography>Error loading training plan</Typography>;
  }

  return (
    <Page title="New training plan">
      <TrainingPlanForm
        plan={data}
        onSubmit={(plan) => mutation.mutate(plan)}
      />
      {!!error && <Typography color="error">error</Typography>}
    </Page>
  );
};
