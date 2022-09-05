import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import {
  getTrainingById,
  getTrainings,
  Training,
  TrainingExercise,
  TrainingExerciseSchema,
  updateTraining,
  updateTrainingExercise,
} from "../../api/fitness.api";
import { Spinner } from "../../common/spinner";
import { FitnessPage } from "../page";
import InfoIcon from "@mui/icons-material/Info";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import moment, { relativeTimeThreshold } from "moment";
import { useLocation } from "wouter";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { useForm } from "react-hook-form";

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

export const TrainingsPage: FunctionComponent = () => {
  return (
    <FitnessPage title="Trainings">
      <TrainingsList />
    </FitnessPage>
  );
};

const Exercise: FunctionComponent<{
  exercise: TrainingExercise;
  onFinish: () => void;
}> = ({ exercise, onFinish }) => {
  const { formState, handleSubmit, register } = useForm<TrainingExercise>({
    resolver: zodResolver(TrainingExerciseSchema),
    defaultValues: {
      id: exercise.id,
      name: exercise.name,
      set_number: exercise.set_number,
      reps: exercise.reps,
      weight: exercise.weight,
    },
  });
  const { errors } = formState;
  const mutation = useMutation(updateTrainingExercise);
  const onStart = () => {
    exercise.started = new Date();
    mutation.mutate(exercise);
  };
  const onSubmit = (formData: TrainingExercise) => {
    const completed = new Date();
    formData.completed = completed;
    exercise.completed = completed;
    mutation.mutate(exercise);
    onFinish();
  };
  if (!exercise.started) {
    return (
      <Button
        startIcon={<PlayCircleFilledIcon />}
        onClick={onStart}
        variant="contained"
        size="small"
        sx={{ mt: 1, mr: 1 }}
        disabled={mutation.isLoading}
      >
        Start
      </Button>
    );
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit((exercise) => onSubmit(exercise))}
      noValidate
    >
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            label="Reps"
            margin="normal"
            size="small"
            error={!!errors?.reps?.message}
            helperText={errors?.reps?.message}
            type="number"
            disabled={mutation.isLoading}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">x</InputAdornment>
              ),
            }}
            {...register("reps")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Weight"
            margin="normal"
            size="small"
            error={!!errors?.weight?.message}
            helperText={errors?.weight?.message}
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
            {...register("weight")}
          />
        </Grid>
      </Grid>
      <Button
        startIcon={<PlayCircleFilledIcon />}
        type="submit"
        variant="contained"
        size="small"
        color="success"
        sx={{ mt: 1, mr: 1 }}
      >
        Complete Set
      </Button>
    </Box>
  );
};

const Exercises: FunctionComponent<{
  exercises: TrainingExercise[];
  onFinish: () => void;
}> = ({ exercises, onFinish }) => {
  const [activeStep, setActiveStep] = useState(
    exercises.findIndex((e) => !e.completed)
  );
  const handleNext = () => {
    if (activeStep === exercises.length - 1) {
      onFinish();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <Box mt={2}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {exercises.map((exercise) => {
          const started = exercise.started
            ? moment(exercise.started)
            : undefined;
          const completed = exercise.completed
            ? moment(exercise.completed)
            : undefined;

          const diff =
            started && completed
              ? moment
                  .duration(moment(started).diff(moment(completed)))
                  .humanize(false, { ss: 1 })
              : undefined;
          const subText = !diff ? undefined : `Took ${diff}`;
          return (
            <Step key={exercise.set_number}>
              <StepLabel optional={subText}>
                {moment.localeData().ordinal(exercise.set_number)} set
              </StepLabel>
              <StepContent>
                <Exercise exercise={exercise} onFinish={handleNext} />
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

const TrainingRunPage: FunctionComponent<{
  training: Training;
  onFinish: () => void;
}> = ({ training, onFinish }) => {
  const activeExercise = training.exercises.filter(
    (exercise) => !exercise.completed
  )[0];
  const [activeStep, setActiveStep] = useState(
    training.training_plan.exercises.findIndex(
      (e) => e.name == activeExercise.name
    )
  );

  const handleNext = () => {
    if (activeStep === training.training_plan.exercises.length - 1) {
      onFinish();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box mt={4}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {training.training_plan.exercises.map((exercise, index) => (
          <Step key={exercise.name}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {exercise.name}
            </StepLabel>
            <StepContent>
              <Exercises
                onFinish={handleNext}
                exercises={training.exercises.filter(
                  (e) => e.name === exercise.name
                )}
              />
            </StepContent>
          </Step>
        ))}
      </Stepper>
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
  if (isLoading || mutation.isLoading) return <Spinner />;
  if (!data && isError) {
    return <Typography color="error.main">Failed to load training </Typography>;
  }
  if (!data.completed) {
    return <TrainingRunPage training={data} onFinish={onFinish} />;
  }
  return <Typography> Completed </Typography>;
};
