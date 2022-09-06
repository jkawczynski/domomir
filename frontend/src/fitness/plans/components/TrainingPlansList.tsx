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
import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { Link, useLocation } from "wouter";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import { FullPageLoading } from "../../../common/components";
import { TrainingPlan, TrainingPlanExercise } from "../../api/models";
import { getTrainingPlans, startTraining } from "../../api";

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
  onStart: () => void;
}> = ({ plan, disableStart, onStart }) => {
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
            disabled={disableStart}
            onClick={onStart}
            size="small"
          >
            Start
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export const TrainingPlansList: FunctionComponent<{ disableStart: boolean }> =
  ({ disableStart }) => {
    const [_, setLocation] = useLocation();
    const { data, isLoading, isError } = useQuery(["getTrainingPlans"], () =>
      getTrainingPlans()
    );
    const mutation = useMutation(startTraining, {
      onSuccess: (data) => {
        setLocation(`/trainings/${data.id}`);
      },
    });

    if (isLoading || mutation.isLoading) return <FullPageLoading />;
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
            <TrainingPlanItem
              plan={plan}
              disableStart={disableStart}
              onStart={() => mutation.mutate(plan)}
            />
          </Grid>
        ))}
      </Grid>
    );
  };
