import { FunctionComponent } from "react";
import { Switch, Route } from "wouter";
import { RecipesSearchView } from "./recipes-list-view";
import { RecipeDetailsView } from "./recipes-details-view";
import { NewRecipeView, EditRecipeView } from "./recipes-new-view";
import { TagsListView } from "./tags/tags-list-view";

export const RecipesRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/list" component={RecipesSearchView} />
      <Route path="/new" component={NewRecipeView} />
      <Route path="/tags" component={TagsListView} />
      <Route path="/:id">
        {(params) => <RecipeDetailsView id={params.id} />}
      </Route>
      <Route path="/:id/edit">
        {(params) => <EditRecipeView id={params.id} />}
      </Route>
    </Switch>
  );
};
