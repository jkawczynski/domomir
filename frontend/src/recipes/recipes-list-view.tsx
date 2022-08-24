import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { useLocation } from "wouter";

import { getRecipes } from "../api/recipes.api";
import { Page } from "../common/page";
import { Spinner } from "../common/spinner";
import { RecipeListItem } from "./recipes-list-item";
import { TagsFilter } from "./tags/tags";

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
    <Grid container spacing={2}>
      {data.map((recipe) => (
        <Grid item xs={12} md={4}>
          <RecipeListItem
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            description={recipe.description}
            url={recipe.url}
            tags={recipe.tags}
            picture={recipe.picture}
          />
        </Grid>
      ))}
    </Grid>
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
