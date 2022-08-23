import { FunctionComponent } from "react";
import { RecipeTag } from "../api/recipes.api";

type TagProps = {
  recipeTag: RecipeTag;
  onClick?: Function;
};

export const Tag: FunctionComponent<TagProps> = ({ recipeTag, onClick }) => {
  let tagClassName = `badge rounded-pill bg-${recipeTag.tag_type} me-1`;
  if (["warning", "info", "light"].includes(recipeTag.tag_type)) {
    tagClassName += " text-dark";
  }
  if (onClick) {
    tagClassName += " clickable";
  }
  const tagClicked = () => {
    if (onClick) {
      onClick(recipeTag);
    }
  };

  return (
    <h5 onClick={tagClicked} className={tagClassName}>
      {recipeTag.name}
    </h5>
  );
};
