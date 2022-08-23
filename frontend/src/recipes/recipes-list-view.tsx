import { FunctionComponent, useState } from "react";
import { RecipeListItem } from "./recipes-list-item";
import { PageButton } from "../common/page";
import { useLocation } from "wouter";
import { getRecipes, RecipeTag } from "../api/recipes.api";
import { Spinner } from "../common/spinner";
import { Tags } from "./tags/tags";
import { useQuery } from "@tanstack/react-query";
import { RecipesPage } from "./page";

const RecipesList: FunctionComponent<{
  tags: RecipeTag[];
}> = ({ tags }) => {
  const { isLoading, data, isError } = useQuery(
      ["getRecipes", tags], () => getRecipes(tags)
  );
  if (!data && isLoading) return <Spinner />;
  if (isError) return <span>Error loading recipe</span>;

  if (!data.length) return <h3>No recipes found.</h3>;

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
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
    </div>
  );
};

export const RecipesSearchView: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
  const [tags, setTags] = useState<RecipeTag[]>([]);

  return (
    <RecipesPage
      title="Recipes"
      pageButtons={[
        <PageButton
          key="new"
          type="success"
          icon="plus-circle"
          name="Add new"
          onClick={() => setLocation("/new")}
        />,
      ]}
    >
      <Tags onChange={setTags} />
      <RecipesList tags={tags} />
    </RecipesPage>
  );
};
