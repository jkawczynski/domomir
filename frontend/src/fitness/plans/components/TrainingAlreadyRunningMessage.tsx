import { Link, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";

import { Training } from "../../api/models";

export const TrainingAlreadyRunningMessage: FunctionComponent<{
  training: Training;
}> = ({ training }) => {
  const [, setLocation] = useLocation();
  const trainingPath = `/trainings/${training.id}`;
  return (
    <Typography color="warning.main" variant="body1" mt={2}>
      There is a training that was already started, see it
      <Link onClick={() => setLocation(trainingPath)}> here</Link>
    </Typography>
  );
};
