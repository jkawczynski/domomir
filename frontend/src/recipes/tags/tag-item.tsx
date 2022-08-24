import Chip from "@mui/material/Chip";
import { FunctionComponent } from "react";

import { RecipeTag } from "../../api/recipes.api";

type TagProps = {
  recipeTag: RecipeTag;
  onClick?: Function;
};

export const Tag: FunctionComponent<TagProps> = ({ recipeTag, onClick }) => {
  return (
    <Chip
      key={recipeTag.name}
      size="small"
      onClick={() => (onClick ? onClick(recipeTag) : null)}
      label={recipeTag.name}
    />
  );
};
