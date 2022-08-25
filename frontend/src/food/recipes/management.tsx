import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";

import {
  Recipe,
  createRecipe,
  getRecipe,
  updateRecipe,
} from "../../api/recipes.api";
import { Page } from "../../common/page";
import { Spinner } from "../../common/spinner";
import { RecipeForm } from "./form";

type Error = {
  message: string;
};

export const NewRecipeView: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
  const mutation = useMutation(createRecipe, {
    onSuccess: () => setLocation("/recipes"),
  });
  const error = mutation?.error as Error;

  return (
    <Page title="Create new recipe">
      <RecipeForm
        onSubmit={(recipe: Recipe) => mutation.mutate(recipe)}
        isLoading={mutation.isLoading}
        error={error?.message}
      />
    </Page>
  );
};
export const EditRecipeView: FunctionComponent<{ id: string }> = ({ id }) => {
  const [_, setLocation] = useLocation();
  const mutation = useMutation(updateRecipe, {
    onSuccess: () => setLocation("/recipes"),
  });
  const error = mutation?.error as Error;

  const { isLoading, data, isError } = useQuery(["getRecipe", id], () =>
    getRecipe(id)
  );

  if (!data && isLoading) return <Spinner />;
  if (isError) return <span>Error loading recipe</span>;

  const title = `Edit ${data.name}`;

  return (
    <Page title={title}>
      <RecipeForm
        recipe={data}
        onSubmit={(recipe: Recipe) => mutation.mutate(recipe)}
        isLoading={mutation.isLoading}
        error={error?.message}
      />
    </Page>
  );
};
