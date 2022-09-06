import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FunctionComponent, useState } from "react";
import { Link, useLocation } from "wouter";
import { APIError } from "../../api/common";
import { FitnessPage } from "../page";
import { useQuery } from "@tanstack/react-query";
import { FullPageLoading } from "../../common/components";
import { TrainingPlansList } from "./components";
import { Training } from "../api/models";
import { getActiveTraining } from "../api";

export const TrainingAlreadyRunningMessage: FunctionComponent<{
  training: Training;
}> = ({ training }) => {
  const trainingPath = `/trainings/${training.id}`;
  return (
    <Typography color="warning.main" variant="body1" mt={2}>
      There is a training that was already started, see it
      <Link href={trainingPath}> here</Link>
    </Typography>
  );
};

export const TrainingPlansPage: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
  const [activeTraining, setActiveTraining] = useState<Training>();

  const { isLoading } = useQuery<Training, APIError>(
    ["getActiveTraining"],
    getActiveTraining,
    {
      retry: 0,
      onSuccess: (data) => setActiveTraining(data),
      onError: () => setActiveTraining(undefined),
    }
  );

  if (isLoading) return <FullPageLoading />;

  const pageActions = [
    {
      icon: <AddIcon />,
      name: "Add new",
      onClick: () => setLocation("/plans/new"),
    },
  ];

  return (
    <FitnessPage title="Training plans" actions={pageActions}>
      {activeTraining && (
        <TrainingAlreadyRunningMessage training={activeTraining} />
      )}
      <TrainingPlansList disableStart={!!activeTraining} />
    </FitnessPage>
  );
};
