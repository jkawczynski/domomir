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
            <Step key={exercise.id}>
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
