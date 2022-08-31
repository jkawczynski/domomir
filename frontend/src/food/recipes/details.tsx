import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";

import { Recipe, deleteRecipe, getRecipe } from "../../api/recipes.api";
import { Page } from "../../common/page";
import { Spinner } from "../../common/spinner";
import { TagsList } from "../tags/tags";
import { IngredientList } from "./ingredients";

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

const RecipeDetailCard: FunctionComponent<{
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
        <Divider  />
        <Grid container mt={2}>
          <Grid item md={6} xs={12}>
            <Typography gutterBottom variant="h5" component="div">
              Ingredients:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {recipe.ingredients.length < 1 ? "No ingredients provided" : null}
            </Typography>
            <IngredientList ingredients={recipe.ingredients} />
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

export const RecipeDetailsView: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const [_, setLocation] = useLocation();
  const { isLoading, data, isError } = useQuery(["getRecipe", id], () =>
    getRecipe(id)
  );
  const mutation = useMutation(deleteRecipe, {
    onSuccess: () => setLocation("/recipes"),
  });
  const deleteError = mutation?.error as Error;

  if ((!data && isLoading) || mutation.isLoading) return <Spinner />;
  if (isError) return <span>Error loading recipe</span>;
  if (deleteError) return <span>Error deleteing recipe</span>;

  return (
    <Page>
      <RecipeDetailCard
        recipe={data}
        onEdit={() => setLocation(`/recipes/${id}/edit`)}
        onDelete={() => mutation.mutate(id)}
      />
    </Page>
  );
};
