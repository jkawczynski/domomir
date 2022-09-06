import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";

import { FullPageLoading } from "../../common/components";
import { Page } from "../../common/page";
import { createRecipe, getRecipe, updateRecipe } from "./api";
import { Recipe } from "./api/models";
import { RecipeForm } from "./forms";

type Error = {
  message: string;
};

export const NewRecipeView: FunctionComponent = () => {
  const [, setLocation] = useLocation();
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
  const [, setLocation] = useLocation();
  const mutation = useMutation(updateRecipe, {
    onSuccess: () => setLocation("/recipes"),
  });
  const error = mutation?.error as Error;

  const { isLoading, data, isError } = useQuery(["getRecipe", id], () =>
    getRecipe(id)
  );

  if (!data && isLoading) return <FullPageLoading />;
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
