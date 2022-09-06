import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { FullPageLoading } from "../../../common/components";
import { getRecipes } from "../api";
import { RecipeListItem } from "./RecipeListItem";
import { Filters } from "./RecipesFilter";

export const RecipesList: FunctionComponent<{
  filters: Filters;
}> = ({ filters }) => {
  const { isLoading, data, isError } = useQuery(["getRecipes", filters], () =>
    getRecipes(filters)
  );
  if (!data && isLoading) return <FullPageLoading />;
  if (isError) return <span>Error loading recipe</span>;

  if (!data.length) return <h3>No recipes found.</h3>;

  return (
    <Grid container spacing={2}>
      {data.map((recipe) => (
        <Grid key={recipe.id} item xs={12} md={4}>
          <RecipeListItem key={recipe.id} recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
};
