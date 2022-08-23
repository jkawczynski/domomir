import { FunctionComponent } from "react";
import { Tag } from "./tags/tag-item";
import { Link } from "wouter";
import { Recipe, RecipeTag } from "../api/recipes.api";

function getThumbnail(url: string): string {
  let ext = url.split(".")[1];
  if (ext === "jpeg") {
    ext = "jpg";
  }
  return `${url}.recipe_thumb.${ext}`;
}

export const RecipeListItem: FunctionComponent<Recipe> = (recipe: Recipe) => {
  const thumbnail = getThumbnail(recipe.picture);
  const recipePath = `/${recipe.id}`;
  let buttons = [
    <Link
      role="button"
      key={recipePath}
      className="btn btn-outline-primary"
      to={recipePath}
    >
      Details
    </Link>,
  ];
  if (recipe.url) {
    buttons = [
      <a
        key={recipe.url}
        role="button"
        className="btn btn-outline-primary"
        href={recipe.url}
        target="_blank"
      >
        Link
      </a>,
      ...buttons,
    ];
  }

  return (
    <div className="col">
      <div className="card">
        <img className="card-img-top" src={thumbnail} alt="Card image cap" />
        <div className="card-body">
          <h4 className="card-title">{recipe.name}</h4>
          {recipe.tags.map((tag: RecipeTag) => (
            <Tag key={tag.name} recipeTag={tag} />
          ))}
        </div>
        <div className="card-footer">
          <div className="btn-toolbar justify-content-end">
            <div className="btn-group" role="group">
              {buttons}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
