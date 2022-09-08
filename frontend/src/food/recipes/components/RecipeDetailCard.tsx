import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";

import { Spinner } from "../../../common/spinner";
import { addToShoppingList } from "../../shopping/api";
import { Recipe, RecipeIngredient } from "../api/models";
import { IngredientsList } from "./IngredientsList";
import { TagsList } from "./TagsList";

const RecipeIngredients: FunctionComponent<{
  ingredients: RecipeIngredient[];
}> = ({ ingredients }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<
    RecipeIngredient[]
  >([]);
  const [snackbarOpened, setSnackbarOpened] = useState(false);
  const mutation = useMutation(addToShoppingList, {
    onSuccess: () => {
      setCheckedIngredients([]);
      setSnackbarOpened(true);
    },
  });

  const onAddToShoppingList = () => {
    mutation.mutate(
      checkedIngredients.map((ing) => ({
        name: `${ing.name} - ${ing.amount_and_unit}`,
        marked_as_done: false,
      }))
    );
  };

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Ingredients:
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {ingredients.length < 1 ? "No ingredients provided" : null}
      </Typography>
      {!!ingredients.length && (
        <IngredientsList
          value={ingredients}
          checked={checkedIngredients}
          onChange={setCheckedIngredients}
          disabled={mutation.isLoading}
        />
      )}
      <Grid container>
        <Grid item xs={10}>
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            startIcon={<AddShoppingCartIcon />}
            onClick={onAddToShoppingList}
            disabled={!checkedIngredients.length || mutation.isLoading}
          >
            Add to shopping list
          </Button>
        </Grid>
        <Grid item xs={2}>
          {mutation.isLoading && (
            <Box mt={2}>
              <Spinner />
            </Box>
          )}
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpened}
        onClose={() => setSnackbarOpened(false)}
        autoHideDuration={3000}
      >
        <Alert severity="success">Added to shopping list</Alert>
      </Snackbar>
    </>
  );
};

const RecipeDescription: FunctionComponent<{
  description?: string;
}> = ({ description }) => {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Description:
      </Typography>
      {!description && "No description provided"}
      {!!description &&
        description.split("\n").map((line, index) => (
          <Typography key={index} variant="body2" color="text.secondary">
            {line}
          </Typography>
        ))}
    </>
  );
};

export const RecipeDetailCard: FunctionComponent<{
  recipe: Recipe;
  onDelete: () => void;
  onEdit: () => void;
}> = ({ recipe, onDelete, onEdit }) => {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardMedia
        component="img"
        image={recipe.picture}
        alt="Recipe picture"
        sx={{ maxHeight: 600 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {recipe.name}
        </Typography>
        <TagsList tags={recipe.tags.map((t) => t.name)} />
        <Divider />
        <Grid container mt={2} spacing={2}>
          <Grid item md={6} xs={12}>
            <RecipeIngredients ingredients={recipe.ingredients} />
          </Grid>
          <Grid item md={6} xs={12}>
            <RecipeDescription description={recipe.description} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => onDelete()}
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            onClick={() => onEdit()}
            size="small"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          {!!recipe.url && (
            <Button
              href={recipe.url}
              size="small"
              target="_blank"
              color="secondary"
              startIcon={<OpenInNewIcon />}
            >
              Link
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
};
