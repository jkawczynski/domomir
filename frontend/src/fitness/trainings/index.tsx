import { Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";

import { FullPageLoading } from "../../common/components";
import { getTrainingById, removeTraining, updateTraining } from "../api";
import { FitnessPage } from "../page";
import {
  RunningTrainingDetails,
  TrainingDetails,
  TrainingSteps,
  TrainingsList,
} from "./components";

export const TrainingsPage: FunctionComponent = () => {
  return (
    <FitnessPage title="Trainings">
      <TrainingsList />
    </FitnessPage>
  );
};

export const TrainingDetailsPage: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const [, setLocation] = useLocation();
  const { data, isLoading, isError, refetch } = useQuery(
    ["getTrainingById", id],
    () => getTrainingById(id)
  );
  const updateMutation = useMutation(updateTraining, {
    onSuccess: () => refetch(),
  });
  const deleteMutation = useMutation(removeTraining, {
    onSuccess: () => setLocation("/trainings"),
  });
  const onFinish = () => {
    if (!data) {
      return;
    }
    data.completed = new Date();
    updateMutation.mutate(data);
  };
  if (isLoading || updateMutation.isLoading || deleteMutation.isLoading) {
    return <FullPageLoading />;
  }
  if (!data && isError) {
    return <Typography color="error.main">Failed to load training </Typography>;
  }
  return (
    <FitnessPage title={data.description}>
      {data.completed ? (
        <TrainingDetails training={data} />
      ) : (
        <>
          <RunningTrainingDetails
            training={data}
            onDelete={() => deleteMutation.mutate(data.id)}
            onFinish={onFinish} 
          />
          <TrainingSteps training={data}/>
        </>
      )}
    </FitnessPage>
  );
};
