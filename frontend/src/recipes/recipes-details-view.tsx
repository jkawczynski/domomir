import { Page } from "../common/page";
import { FunctionComponent } from "react";
import { Spinner } from "../common/spinner";
import { getRecipe, deleteRecipe, Recipe } from "../api/recipes.api";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

const RecipeDetailCard: FunctionComponent<{
  recipe: Recipe;
  onDelete?: Function;
}> = ({ recipe, onDelete }) => {
  const recipeUrl = recipe.url ? (
    <h5 className="card-title">
      <a href={recipe.url}>Recipe Link</a>
    </h5>
  ) : null;

  return (
    <div className="card">
      <img src={recipe.picture} alt={recipe.name} />
      <div className="card-body">
        {recipeUrl}
        <p className="card-text">{recipe.description}</p>
      </div>
      <div className="card-footer">
        <div className="btn-toolbar justify-content-end">
          <div className="btn-group" role="group">
            <Link
              role="button"
              className="btn btn-primary"
              to={`/${recipe.id}/edit`}
            >
              Edit
            </Link>
            <button
              role="button"
              className="btn btn-danger"
              onClick={() => {
                if (onDelete) onDelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecipeDetailsView: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const [_, setLocation] = useLocation();
  const { isLoading, data, isError } = useQuery(["getRecipe", id], () =>
    getRecipe(id)
  );

  if (!data && isLoading) return <Spinner />;
  if (isError) return <span>Error loading recipe</span>;

  return (
    <Page title={data.name}>
      <RecipeDetailCard
        recipe={data}
        onDelete={() => deleteRecipe(id).then(() => setLocation("/"))}
      />
    </Page>
  );
};
