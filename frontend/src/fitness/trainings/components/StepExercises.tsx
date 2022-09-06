import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import moment from "moment";
import { FunctionComponent, useState } from "react";
import { TrainingExercise } from "../../api/models";
import { Exercise } from "./Exercise";

const ExerciseStep: FunctionComponent<{
  exercise: TrainingExercise;
  onFinish: () => void;
}> = ({ exercise, onFinish }) => {
  const started = exercise.started ? moment(exercise.started) : undefined;
  const completed = exercise.completed ? moment(exercise.completed) : undefined;
  const diff =
    started && completed
      ? moment
          .duration(moment(started).diff(moment(completed)))
          .humanize(false, { ss: 1 })
      : undefined;
  const subText = !diff ? undefined : `Took ${diff}`;

  return (
    <Step>
      <StepLabel optional={subText}>
        {moment.localeData().ordinal(exercise.set_number)} set
      </StepLabel>
      <StepContent>
        <Exercise exercise={exercise} onFinish={onFinish} />
      </StepContent>
    </Step>
  );
};

export const StepExercises: FunctionComponent<{
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
        {exercises.map((exercise) => (
          <ExerciseStep
            key={exercise.id}
            exercise={exercise}
            onFinish={handleNext}
          />
        ))}
      </Stepper>
    </Box>
  );
};
