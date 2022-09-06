import DeleteIcon from "@mui/icons-material/Delete";
import { ListItem, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { Spinner } from "../../../common/spinner";
import { deleteTag, getTags } from "../api";
import { RecipeTag } from "../api/models";

const TagsManagedListItem: FunctionComponent<{
  tag: RecipeTag;
  onDelete?: (tag: RecipeTag) => void;
}> = ({ tag, onDelete }) => {
  return (
    <ListItem
      key={tag.name}
      secondaryAction={
        onDelete ? (
          <IconButton edge="end" onClick={() => onDelete(tag)}>
            <DeleteIcon />
          </IconButton>
        ) : null
      }
    >
      <ListItemText primary={tag.name} />
    </ListItem>
  );
};

export const TagsManagedList: FunctionComponent = () => {
  const { isLoading, data, isError, refetch } = useQuery(["getTags"], getTags);
  if (isLoading) return <Spinner />;
  if (isError) return <span>Failed to load tags</span>;

  const handleDelete = (tag: RecipeTag) => {
    deleteTag(tag.id);
    refetch();
  };

  return (
    <Paper sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <List dense>
            {data.map((tag: RecipeTag) => (
              <TagsManagedListItem
                key={tag.name}
                tag={tag}
                onDelete={handleDelete}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};
