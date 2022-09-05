import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { getTrainings } from "../../api/fitness.api";
import { Spinner } from "../../common/spinner";
import { FitnessPage } from "../page";
import InfoIcon from "@mui/icons-material/Info";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import moment from "moment";
import { useLocation } from "wouter";

const TrainingsList = () => {
  const { data, isLoading, isError } = useQuery(["getTrainings"], getTrainings);
  const [_, setLocation] = useLocation();

  if (isLoading) return <Spinner />;
  if (!data && isError) {
    return (
      <Typography color="error.main"> Failed to load trainings </Typography>
    );
  }

  return (
    <List>
      {data.map((training) => {
        const secondaryText = training.completed
          ? `Completed: ${moment(training.completed).fromNow()}`
          : `Started: ${moment(training.started).fromNow()}`;
        const onClick = () => setLocation(`/trainings/${training.id}`);
        return (
          <ListItem
            divider
            secondaryAction={
              training.completed ? (
                <IconButton color="secondary" edge="end" onClick={onClick}>
                  <InfoIcon />
                </IconButton>
              ) : (
                <IconButton color="success" edge="end" onClick={onClick}>
                  <PlayCircleIcon />
                </IconButton>
              )
            }
          >
            <ListItemText
              primary={training.description}
              secondary={secondaryText}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export const TrainingsPage: FunctionComponent = () => {
  return (
    <FitnessPage title="Trainings">
      <TrainingsList />
    </FitnessPage>
  );
};
