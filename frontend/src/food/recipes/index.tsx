import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { useLocation } from "wouter";
import { FullPageLoading } from "../../common/components";
import { Page } from "../../common/page";
import { FoodPage } from "../page";
import { deleteRecipe, getRecipe } from "./api";
import { Filters, RecipesFilter } from "./components/RecipesFilter";
import AddIcon from "@mui/icons-material/Add";
import { RecipeDetailCard, RecipesList, TagsManagedList } from "./components";

export const RecipesDashboardPage: FunctionComponent = () => {
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

export const RecipeDetailsPage: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const [_, setLocation] = useLocation();
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
    <Page>
      <RecipeDetailCard
        recipe={data}
        onEdit={() => setLocation(`/recipes/${id}/edit`)}
        onDelete={() => mutation.mutate(id)}
      />
    </Page>
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
