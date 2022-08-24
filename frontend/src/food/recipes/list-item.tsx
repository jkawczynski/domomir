import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";

import { Recipe } from "../../api/recipes.api";
import { TagsList } from "../tags/tags";

function getThumbnail(url: string): string {
  let ext = url.split(".")[1];
  if (ext === "jpeg") {
    ext = "jpg";
  }
  return `${url}.recipe_thumb.${ext}`;
}

export const RecipeListItem: FunctionComponent<Recipe> = (recipe: Recipe) => {
  const thumbnail = getThumbnail(recipe.picture);
  const [_, setLocation] = useLocation();
  const recipePath = `/${recipe.id}`;
  let buttons = [
    <Button
      onClick={() => setLocation(recipePath)}
      key={recipePath}
      size="small"
    >
      Details
    </Button>,
  ];
  if (recipe.url) {
    buttons = [
      <Button href={recipe.url} key={recipe.url} target="_blank" size="small">
        Link
      </Button>,
      ...buttons,
    ];
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" image={thumbnail} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <TagsList tags={recipe.tags.map((t) => t.name)} />
        </Typography>
      </CardContent>
      <CardActions>{buttons}</CardActions>
    </Card>
  );
};
