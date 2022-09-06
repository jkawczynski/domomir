import { Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";

import { FullPageLoading } from "../../common/components";
import { Page } from "../../common/page";
import {
  createTrainingPlan,
  editTrainingPlan,
  getTrainingPlanById,
  getTrainingPlans,
} from "../api";
import { TrainingPlanForm } from "./forms";
import { getNextAvailableWeekday } from "./utils";

export const NewTrainingPlanPage: FunctionComponent = () => {
  const [, setLocation] = useLocation();
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
  const [, setLocation] = useLocation();
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
