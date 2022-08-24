import { FunctionComponent, useState } from "react";
import { RecipeListItem } from "./recipes-list-item";
import { Page } from "../common/page";
import { useLocation } from "wouter";
import { getRecipes } from "../api/recipes.api";
import { Spinner } from "../common/spinner";
import { TagsFilter } from "./tags/tags";
import { useQuery } from "@tanstack/react-query";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";

const RecipesList: FunctionComponent<{
  tags: string[];
}> = ({ tags }) => {
  const { isLoading, data, isError } = useQuery(["getRecipes", tags], () =>
    getRecipes(tags)
  );
  if (!data && isLoading) return <Spinner />;
  if (isError) return <span>Error loading recipe</span>;

  if (!data.length) return <h3>No recipes found.</h3>;

  return (
    <Stack spacing={2} direction="row">
      {data.map((recipe) => (
        <RecipeListItem
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          description={recipe.description}
          url={recipe.url}
          tags={recipe.tags}
          picture={recipe.picture}
        />
      ))}
    </Stack>
  );
};

export const RecipesSearchView: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
  const [tags, setTags] = useState<string[]>([]);

  return (
    <Page
      title="Recipes"
      actions={[
        {
          icon: <AddIcon />,
          name: "Add new",
          onClick: () => setLocation("/new"),
        },
      ]}
    >
      <TagsFilter onChange={setTags} />
      <RecipesList tags={tags} />
    </Page>
  );
};
