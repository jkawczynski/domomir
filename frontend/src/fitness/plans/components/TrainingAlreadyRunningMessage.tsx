import { Link, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Training } from "../../api/models";
import { useLocation } from "wouter";

export const TrainingAlreadyRunningMessage: FunctionComponent<{
  training: Training;
}> = ({ training }) => {
  const [_, setLocation] = useLocation();
  const trainingPath = `/trainings/${training.id}`;
  return (
    <Typography color="warning.main" variant="body1" mt={2}>
      There is a training that was already started, see it
      <Link onClick={() => setLocation(trainingPath)}> here</Link>
    </Typography>
  );
};
