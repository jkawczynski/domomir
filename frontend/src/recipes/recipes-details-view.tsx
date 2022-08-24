import { Page } from "../common/page";
import { FunctionComponent } from "react";
import { Spinner } from "../common/spinner";
import { getRecipe, deleteRecipe, Recipe } from "../api/recipes.api";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { TagsList } from "./tags/tags";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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
        <Typography gutterBottom variant="h5" component="div">
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <TagsList tags={recipe.tags} />
          {recipe.description}
        </Typography>
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

  if (!data && isLoading) return <Spinner />;
  if (isError) return <span>Error loading recipe</span>;

  return (
    <Page>
      <RecipeDetailCard
        recipe={data}
        onEdit={() => setLocation(`/${id}/edit`)}
        onDelete={() => deleteRecipe(id).then(() => setLocation("/list"))}
      />
    </Page>
  );
};
