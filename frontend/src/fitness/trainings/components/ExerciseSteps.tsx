import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import moment from "moment";
import { FunctionComponent, useState } from "react";

import { TrainingExercise } from "../../api/models";
import { Exercise } from "./Exercise";

export const ExerciseSteps: FunctionComponent<{
  exercises: TrainingExercise[];
  onFinish: () => void;
}> = ({ exercises, onFinish }) => {
  const activeIndex = exercises.findIndex((e) => !e.completed);
  const [activeStep, setActiveStep] = useState(activeIndex);

  const handleNext = () => {
    if (activeStep === exercises.length - 1) {
      onFinish();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <Box mt={2}>
      {exercises.map((exercise) => (
        <Exercise exercise={exercise} onFinish={handleNext} />
      ))}
    </Box>
  );
};
