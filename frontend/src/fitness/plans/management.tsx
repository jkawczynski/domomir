import { Page } from "../../common/page";
import { FunctionComponent } from "react";
import { TrainingPlanForm } from "./planForm";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { createTrainingPlan } from "../../api/fitness.api";

export const NewTrainingPlanPage: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
  const mutation = useMutation(createTrainingPlan, {
    onSuccess: () => setLocation("/plans"),
  });
  const error = mutation?.error as Error;

  return (
    <Page title="New training plan">
      <TrainingPlanForm onSubmit={(plan) => mutation.mutate(plan)} />
    </Page>
  );
};
