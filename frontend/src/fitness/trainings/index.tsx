import { Box, Divider, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { FullPageLoading } from "../../common/components";
import { getTrainingById, updateTraining } from "../api";
import { Training } from "../api/models";
import { FitnessPage } from "../page";
import { TrainingSteps, TrainingsList } from "./components";

export const TrainingsPage: FunctionComponent = () => {
  return (
    <FitnessPage title="Trainings">
      <TrainingsList />
    </FitnessPage>
  );
};

const TrainingRunPage: FunctionComponent<{
  training: Training;
  onFinish: () => void;
}> = ({ training, onFinish }) => {
  return (
    <Box mt={2}>
      <Typography variant="h4">{training.description}</Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <TrainingSteps training={training} onFinish={onFinish} />
    </Box>
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
  if (!data.completed) {
    return <TrainingRunPage training={data} onFinish={onFinish} />;
  }
  return <Typography> Completed </Typography>;
};
