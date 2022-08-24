import { FunctionComponent } from "react";
import { Route, Switch } from "wouter";

import { RecipesDashboard } from "./recipes/dashboard";
import { RecipeDetailsView } from "./recipes/details";
import { EditRecipeView, NewRecipeView } from "./recipes/management";
import { TagsDashboard } from "./tags/tags-dashboard";

export const RecipesRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/recipes" component={RecipesDashboard} />
      <Route path="/recipes/new" component={NewRecipeView} />
      <Route path="/tags" component={TagsDashboard} />
      <Route path="/recipes/:id">
        {(params) => <RecipeDetailsView id={params.id} />}
      </Route>
      <Route path="recipes/:id/edit">
        {(params) => <EditRecipeView id={params.id} />}
      </Route>
    </Switch>
  );
};
