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
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { Link, useLocation } from "wouter";
import {
  getTrainingPlans,
  TrainingPlan,
  TrainingPlanExercise,
} from "../../api/fitness.api";
import { Spinner } from "../../common/spinner";
import { FitnessPage } from "../page";
import CircleIcon from "@mui/icons-material/Circle";

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

const TrainingPlanItem: FunctionComponent<{ plan: TrainingPlan }> = ({
  plan,
}) => {
  return (
    <Card sx={{ minWidth: 275 }} key={plan.id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {plan.weekday_verbose}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {plan.description}
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <List disablePadding>
          {plan.exercises.map((exercise) => {
            const secondaryText = generateExerciseDescription(exercise);
            return (
              <ListItem dense>
                <ListItemText
                  primary={exercise.name}
                  secondary={secondaryText}
                />
              </ListItem>
            );
          })}
        </List>
        <CardActions sx={{ mt: 2 }}>
          <Button variant="outlined" color="secondary">
            Edit
          </Button>
          <Button variant="outlined" color="success">
            Start
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const TrainingPlansList: FunctionComponent = () => {
  const { data, isLoading, isError } = useQuery(["getTrainingPlans"], () =>
    getTrainingPlans()
  );

  if (isLoading) return <Spinner />;
  if (!data && isError) {
    return <Typography> Failed to load training plans </Typography>;
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
        <Grid item xs={12} md={4}>
          <TrainingPlanItem plan={plan} />
        </Grid>
      ))}
    </Grid>
  );
};

export const TrainingPlansPage: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
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
      <TrainingPlansList />
    </FitnessPage>
  );
};
