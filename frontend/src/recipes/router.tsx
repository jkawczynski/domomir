import { FunctionComponent } from "react";
import { Route, Switch } from "wouter";

import { RecipeDetailsView } from "./recipes-details-view";
import { RecipesSearchView } from "./recipes-list-view";
import { EditRecipeView, NewRecipeView } from "./recipes-new-view";

export const RecipesRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/list" component={RecipesSearchView} />
      <Route path="/new" component={NewRecipeView} />
      <Route path="/:id">
        {(params) => <RecipeDetailsView id={params.id} />}
      </Route>
      <Route path="/:id/edit">
        {(params) => <EditRecipeView id={params.id} />}
      </Route>
    </Switch>
  );
};
