import InfoIcon from "@mui/icons-material/Info";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useLocation } from "wouter";

import { FullPageLoading } from "../../../common/components";
import { getTrainings } from "../../api";

export const TrainingsList = () => {
  const { data, isLoading, isError } = useQuery(["getTrainings"], getTrainings);
  const [, setLocation] = useLocation();

  if (isLoading) return <FullPageLoading />;
  if (!data && isError) {
    return (
      <Typography color="error.main"> Failed to load trainings </Typography>
    );
  }
  if (!data.length) {
    return <Typography mt={2}>Trainings history is empty</Typography>;
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
            key={training.started.toString()}
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
