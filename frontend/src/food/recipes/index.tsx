import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { useLocation } from "wouter";

import { FullPageLoading } from "../../common/components";
import { FoodPage } from "../page";
import { deleteRecipe, getRecipe } from "./api";
import { RecipeDetailCard, RecipesList, TagsManagedList } from "./components";
import { Filters, RecipesFilter } from "./components/RecipesFilter";

export const RecipesDashboardPage: FunctionComponent = () => {
  const [, setLocation] = useLocation();
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

export const RecipeDetailsPage: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const [, setLocation] = useLocation();
  const { isLoading, data, isError } = useQuery(["getRecipe", id], () =>
    getRecipe(id)
  );
  const mutation = useMutation(deleteRecipe, {
    onSuccess: () => setLocation("/recipes"),
  });
  const deleteError = mutation?.error as Error;

  if ((!data && isLoading) || mutation.isLoading) return <FullPageLoading />;
  if (isError) return <span>Error loading recipe</span>;
  if (deleteError) return <span>Error deleteing recipe</span>;

  return (
    <FoodPage>
      <RecipeDetailCard
        recipe={data}
        onEdit={() => setLocation(`/recipes/${id}/edit`)}
        onDelete={() => mutation.mutate(id)}
      />
    </FoodPage>
  );
};

export const TagsDashboardPage: FunctionComponent = () => {
  return (
    <FoodPage title="Tags">
      <Box mt={4} mb={2}>
        <TagsManagedList />
      </Box>
    </FoodPage>
  );
};
