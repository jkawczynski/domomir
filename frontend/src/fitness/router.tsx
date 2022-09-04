import { FunctionComponent } from "react";
import { Route, Switch } from "wouter";
import { TrainingPlansPage } from "./plans";
import { NewTrainingPlanPage } from "./plans/management";
import { TrainingsPage } from "./trainings";

export const FitnessRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/plans" component={TrainingPlansPage} />
      <Route path="/plans/new" component={NewTrainingPlanPage} />
      <Route path="/trainings" component={TrainingsPage} />
    </Switch>
  );
};
