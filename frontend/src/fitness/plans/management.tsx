import { Page } from "../../common/page";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import { FullPageLoading } from "../../common/components";
import { getNextAvailableWeekday } from "./utils";
import { TrainingPlanForm } from "./forms";
import {
  createTrainingPlan,
  editTrainingPlan,
  getTrainingPlanById,
  getTrainingPlans,
} from "../api";

export const NewTrainingPlanPage: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
  const mutation = useMutation(createTrainingPlan, {
    onSuccess: () => setLocation("/plans"),
  });
  const { data, isLoading } = useQuery(["getTrainingPlans"], getTrainingPlans);
  const error = mutation?.error as Error;

  if (isLoading) return <FullPageLoading />;

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

  if (isLoading) return <FullPageLoading />;
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
