import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQueries, useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { Link, useLocation } from "wouter";
import {
  getActiveTraining,
  getTrainingPlans,
  Training,
  TrainingPlan,
  TrainingPlanExercise,
} from "../../api/fitness.api";
import { Spinner } from "../../common/spinner";
import { FitnessPage } from "../page";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import { APIError } from "../../api/common";

const generateExerciseDescription = (exercise: TrainingPlanExercise) => {
  let result = "";
  if (exercise.starting_weight) {
    result += `${exercise.starting_weight}kg `;
  }
  result += `${exercise.sets}x`;
  if (exercise.reps) {
    result += exercise.reps;
  }
  return result;
};

const TrainingPlanItem: FunctionComponent<{
  plan: TrainingPlan;
  disableStart: boolean;
}> = ({ plan, disableStart }) => {
  const [_, setLocation] = useLocation();
  const day = String(new Date().getDay() || 7);
  const trainingIsTodayText = plan.weekday === day ? "This is today!" : "";
  return (
    <Card sx={{ minWidth: 275 }} key={plan.id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {plan.weekday_verbose}
          <Typography variant="subtitle2" color="warning.main">
            {trainingIsTodayText}
          </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {plan.description}
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <List disablePadding>
          {plan.exercises.map((exercise) => {
            const secondaryText = generateExerciseDescription(exercise);
            return (
              <ListItem key={exercise.order} dense>
                <ListItemText
                  primary={exercise.name}
                  secondary={secondaryText}
                />
              </ListItem>
            );
          })}
        </List>
        <CardActions sx={{ mt: 2 }}>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            color="secondary"
            onClick={() => setLocation(`/plans/${plan.id}/edit`)}
            size="small"
          >
            Edit
          </Button>
          <Button
            startIcon={<PlayArrowIcon />}
            variant="outlined"
            color="success"
            size="small"
            disabled={disableStart}
          >
            Start
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const TrainingPlansList: FunctionComponent<{ disableStart: boolean }> = ({
  disableStart,
}) => {
  const { data, isLoading, isError } = useQuery(["getTrainingPlans"], () =>
    getTrainingPlans()
  );

  if (isLoading) return <Spinner />;
  if (!data && isError) {
    return (
      <Typography color="error"> Failed to load training plans </Typography>
    );
  }

  if (!data.length) {
    return (
      <Typography mt={2}>
        There are no plans yet, create new training plan
        <Link href="/plans/new"> here.</Link>
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {data.map((plan) => (
        <Grid item xs={12} md={4} key={plan.weekday}>
          <TrainingPlanItem plan={plan} disableStart={disableStart} />
        </Grid>
      ))}
    </Grid>
  );
};

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
  const { data, isLoading, error } = useQuery<Training, APIError>(
    ["getActiveTraining"],
    getActiveTraining,
    { retry: 0 }
  );

  if (isLoading) return <Spinner />;

  return (
    <FitnessPage
      title="Training plans"
      actions={[
        {
          icon: <AddIcon />,
          name: "Add new",
          onClick: () => setLocation("/plans/new"),
        },
      ]}
    >
      {data && <TrainingAlreadyRunningMessage training={data} />}
      <TrainingPlansList disableStart={!!data} />
    </FitnessPage>
  );
};
