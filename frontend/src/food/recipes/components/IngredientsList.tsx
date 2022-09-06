import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FunctionComponent, useState } from "react";

import { RecipeIngredient } from "../api/models";

export const IngredientsList: FunctionComponent<{
  ingredients: RecipeIngredient[];
}> = ({ ingredients }) => {
  const [checked, setChecked] = useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      dense
    >
      {ingredients.map((ingredient: RecipeIngredient) => {
        const labelId = `checkbox-list-label-${ingredient.name}`;

        return (
          <ListItem key={ingredient.name} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(ingredient.name)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(ingredient.name) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={ingredient.name}
                secondary={ingredient.amount_and_unit}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
