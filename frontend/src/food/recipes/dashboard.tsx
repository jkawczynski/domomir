import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { useLocation } from "wouter";

import { getRecipes } from "../../api/recipes.api";
import { Spinner } from "../../common/spinner";
import { FoodPage } from "../page";
import { RecipeListItem } from "./list-item";
import { Filters, RecipesFilter } from "./search-filter";

const RecipesList: FunctionComponent<{
  filters: Filters;
}> = ({ filters }) => {
  const { isLoading, data, isError } = useQuery(["getRecipes", filters], () =>
    getRecipes(filters)
  );
  if (!data && isLoading) return <Spinner />;
  if (isError) return <span>Error loading recipe</span>;

  if (!data.length) return <h3>No recipes found.</h3>;

  return (
    <Grid container spacing={2}>
      {data.map((recipe) => (
        <Grid key={recipe.id} item xs={12} md={4}>
          <RecipeListItem
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            description={recipe.description}
            url={recipe.url}
            tags={recipe.tags}
            picture={recipe.picture}
            ingredients={recipe.ingredients}
            thumbnail={recipe.thumbnail}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export const RecipesDashboard: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
  const [filters, setFilters] = useState<Filters>({
    tags: [],
    ingredients: [],
    name: "",
  });
  return (
    <FoodPage
      title="Recipes"
      actions={[
        {
          icon: <AddIcon />,
          name: "Add new",
          onClick: () => setLocation("/recipes/new"),
        },
      ]}
    >
      <Box mt={2} mb={2}>
        <RecipesFilter value={filters} onChange={setFilters} />
      </Box>
      <RecipesList filters={filters} />
    </FoodPage>
  );
};
