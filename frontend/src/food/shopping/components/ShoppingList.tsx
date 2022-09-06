import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FunctionComponent } from "react";

import { Spinner } from "../../../common/spinner";
import { ShoppingListItem } from "../api/models";

export const ShoppingList: FunctionComponent<{
  data: ShoppingListItem[];
  onMarkedAsDone: (item: ShoppingListItem) => void;
}> = ({ data, onMarkedAsDone }) => {
  if (!data.length) {
    return <Typography>The list is empty</Typography>;
  }
  const handleMarkedAsDone = (item: ShoppingListItem) => {
    item.loading = true;
    onMarkedAsDone(item);
  };
  return (
    <List sx={{ width: "100%", maxWidth: 400 }}>
      {data.map((item) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            role={undefined}
            dense
            sx={{ maxWidth: 60 }}
            onClick={() => handleMarkedAsDone(item)}
            disabled={item.marked_as_done || item.loading}
          >
            <ListItemIcon>
              {item.loading ? (
                <Spinner />
              ) : (
                <Checkbox
                  checked={item.marked_as_done}
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  disabled={item.marked_as_done}
                />
              )}
            </ListItemIcon>
          </ListItemButton>
          <ListItemText
            sx={{
              textAlign: "left",
              textDecoration: item.marked_as_done ? "line-through" : "none",
            }}
            primary={item.name}
            secondary={item.author}
          />
        </ListItem>
      ))}
    </List>
  );
};
