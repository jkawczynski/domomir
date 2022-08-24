import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EggIcon from "@mui/icons-material/Egg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FunctionComponent, useState } from "react";

import { RecipeIngredient } from "../api/recipes.api";

export const IngredientList: FunctionComponent<{
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

const IngredientSelectItem: FunctionComponent<{
  value: RecipeIngredient;
  onChange: Function;
}> = ({ value, onChange }) => {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        value={value.name}
        onChange={(event) => onChange({ ...value, name: event.target.value})}
        variant="standard"
        size="small"
        label="Name"
      />
      <TextField
        value={value.amount_and_unit}
        onChange={(event) =>
          onChange({ ...value, amount_and_unit: event.target.value})
        }
        variant="standard"
        size="small"
        label="Amount and Unit"
      />
    </Stack>
  );
};

export const IngredientsSelect: FunctionComponent<{
  value: RecipeIngredient[];
  onChange: Function;
}> = ({ value, onChange }) => {
  const addNextIngredient = () => {
    onChange([...value, { name: "", amount_and_unit: "" }]);
  };
  const removeIngredient = (index: number) => {
    onChange(value.filter((_, idx) => index !== idx));
  };

  const onChangeIngredient = (index: number, ingredient: RecipeIngredient) => {
    onChange([
      ...value.slice(0, index),
      ingredient,
      ...value.slice(index + 1, value.length),
    ]);
  };
  return (
    <Box>
      <Typography gutterBottom variant="h6" component="div">
        Ingredients:
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {value.map((ingredient: RecipeIngredient, index: number) => {
          return (
            <ListItem key={index} disablePadding>
              <ListItemIcon>
                <EggIcon />
              </ListItemIcon>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <IngredientSelectItem
                    value={ingredient}
                    onChange={(i) => onChangeIngredient(index, i)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeIngredient(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
      <Button
        onClick={() => addNextIngredient()}
        size="small"
        startIcon={<AddIcon />}
      >
        Add next ingredient
      </Button>
    </Box>
  );
};
