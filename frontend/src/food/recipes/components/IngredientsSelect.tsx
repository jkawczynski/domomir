import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EggIcon from "@mui/icons-material/Egg";
import { Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";

import { RecipeIngredient } from "../api/models";

const IngredientSelectItem: FunctionComponent<{
  value: RecipeIngredient;
  onChange: (ingredient: RecipeIngredient) => void;
}> = ({ value, onChange }) => {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        value={value.name}
        onChange={(event) => onChange({ ...value, name: event.target.value })}
        variant="standard"
        size="small"
        label="Name"
        autoFocus={true}
      />
      <TextField
        value={value.amount_and_unit}
        onChange={(event) =>
          onChange({ ...value, amount_and_unit: event.target.value })
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
  onChange: (ingredients: RecipeIngredient[]) => void;
}> = ({ value, onChange }) => {
  const addNextIngredient = () => {
    onChange([...value, { id: null, name: "", amount_and_unit: "" }]);
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
                    onChange={(ingredient: RecipeIngredient) =>
                      onChangeIngredient(index, ingredient)
                    }
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
