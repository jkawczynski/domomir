import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";
import { Recipe } from "../api/models";
import { TagsList } from "./TagsList";

export const RecipeListItem: FunctionComponent<{ recipe: Recipe }> = ({
  recipe,
}) => {
  const [_, setLocation] = useLocation();
  const recipePath = `/recipes/${recipe.id}`;
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
      <CardMedia
        onClick={() => setLocation(recipePath)}
        component="img"
        image={recipe.thumbnail}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.name}
        </Typography>
        <TagsList tags={recipe.tags.map((t) => t.name)} />
      </CardContent>
      <CardActions>{buttons}</CardActions>
    </Card>
  );
};
