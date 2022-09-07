import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { FunctionComponent, useState } from "react";

import { Training } from "../../api/models";
import { ExerciseSteps } from "./ExerciseSteps";

export const TrainingSteps: FunctionComponent<{
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
    <Stepper activeStep={activeStep} orientation="vertical">
      {training.training_plan.exercises.map((exercise) => (
        <Step key={exercise.name}>
          <StepLabel>{exercise.name}</StepLabel>
          <StepContent>
            <ExerciseSteps
              onFinish={handleNext}
              exercises={training.exercises.filter(
                (e) => e.name === exercise.name
              )}
            />
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};
