import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FunctionComponent } from "react";

import { RecipeIngredient } from "../api/models";

const IngredientsListItem: FunctionComponent<{
  ingredient: RecipeIngredient;
  checked: boolean;
  onClick: (isChecked: boolean) => void;
  disabled?: boolean;
}> = ({ ingredient, checked, onClick, disabled }) => {
  const labelId = `checkbox-list-label-${ingredient.name}`;

  return (
    <ListItem key={ingredient.name} disablePadding disabled={disabled} dense>
      <ListItemButton
        role={undefined}
        onClick={() => onClick(checked)}
        sx={{ pt: 0, pb: 0 }}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ m: 0 }}
          id={labelId}
          primary={ingredient.name}
          secondary={ingredient.amount_and_unit}
        />
      </ListItemButton>
    </ListItem>
  );
};

export const IngredientsList: FunctionComponent<{
  value: RecipeIngredient[];
  checked: RecipeIngredient[];
  onChange: (checked: RecipeIngredient[]) => void;
  disabled?: boolean;
}> = ({ value, checked, onChange, disabled }) => {
  const onToggle = (isChecked: boolean, ingredient: RecipeIngredient) => {
    if (!isChecked) {
      onChange([...checked, ingredient]);
    } else {
      onChange(checked.filter((ing) => ing.id !== ingredient.id));
    }
  };
  return (
    <Box>
      <List sx={{ width: "100%", maxWidth: 360 }} dense>
        {value.map((ingredient: RecipeIngredient) => (
          <IngredientsListItem
            disabled={disabled}
            ingredient={ingredient}
            onClick={(isChecked) => onToggle(isChecked, ingredient)}
            checked={!!checked.find((ing) => ing.id === ingredient.id)}
          />
        ))}
      </List>
    </Box>
  );
};
