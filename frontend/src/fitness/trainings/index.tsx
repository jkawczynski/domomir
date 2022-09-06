import { Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { FullPageLoading } from "../../common/components";
import { getTrainingById, updateTraining } from "../api";
import { FitnessPage } from "../page";
import { TrainingDetails, TrainingSteps, TrainingsList } from "./components";

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
  const { data, isLoading, isError, refetch } = useQuery(
    ["getTrainingById", id],
    () => getTrainingById(id)
  );
  const mutation = useMutation(updateTraining, { onSuccess: () => refetch() });
  const onFinish = () => {
    if (!data) {
      return;
    }
    data.completed = new Date();
    mutation.mutate(data);
  };
  if (isLoading || mutation.isLoading) return <FullPageLoading />;
  if (!data && isError) {
    return <Typography color="error.main">Failed to load training </Typography>;
  }
  return (
    <FitnessPage title={data.description}>
      {data.completed ? (
        <TrainingDetails training={data} />
      ) : (
        <TrainingSteps training={data} onFinish={onFinish} />
      )}
    </FitnessPage>
  );
};
