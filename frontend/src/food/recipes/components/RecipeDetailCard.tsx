import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import { Recipe } from "../api/models";
import { IngredientsList } from "./IngredientsList";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TagsList } from "./TagsList";

const RecipeDescription: FunctionComponent<{
  description?: string;
}> = ({ description }) => {
  if (!description) {
    return (
      <Typography variant="body2" color="text.secondary">
        No description provided
      </Typography>
    );
  }
  return (
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  );
};

export const RecipeDetailCard: FunctionComponent<{
  recipe: Recipe;
  onDelete: Function;
  onEdit: Function;
}> = ({ recipe, onDelete, onEdit }) => {
  const recipeUrl = recipe.url ? (
    <Button
      href={recipe.url}
      size="small"
      target="_blank"
      color="secondary"
      startIcon={<OpenInNewIcon />}
    >
      Link
    </Button>
  ) : null;

  return (
    <Card sx={{ minWidth: 350 }}>
      <CardMedia
        component="img"
        height="500"
        image={recipe.picture}
        alt="Recipe picture"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {recipe.name}
        </Typography>
        <TagsList tags={recipe.tags.map((t) => t.name)} />
        <Divider />
        <Grid container mt={2}>
          <Grid item md={6} xs={12}>
            <Typography gutterBottom variant="h5" component="div">
              Ingredients:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {recipe.ingredients.length < 1 ? "No ingredients provided" : null}
            </Typography>
            <IngredientsList ingredients={recipe.ingredients} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography gutterBottom variant="h5" component="div">
              Description:
            </Typography>
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
          {recipeUrl}
        </Stack>
      </CardActions>
    </Card>
  );
};
