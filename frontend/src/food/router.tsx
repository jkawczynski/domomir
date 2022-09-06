import { FunctionComponent } from "react";
import { Route, Switch } from "wouter";
import { RecipeDetailsPage, RecipesDashboardPage, TagsDashboardPage } from "./recipes";

import { EditRecipeView, NewRecipeView } from "./recipes/management";
import { ShoppingListPage } from "./shopping";

export const RecipesRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/recipes" component={RecipesDashboardPage} />
      <Route path="/recipes/new" component={NewRecipeView} />
      <Route path="/recipes/:id">
        {(params) => <RecipeDetailsPage id={params.id} />}
      </Route>
      <Route path="/recipes/:id/edit">
        {(params) => <EditRecipeView id={params.id} />}
      </Route>
      <Route path="/tags" component={TagsDashboardPage} />
      <Route path="/shopping" component={ShoppingListPage} />
    </Switch>
  );
};
