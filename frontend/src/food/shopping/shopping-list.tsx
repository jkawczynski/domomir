import { FunctionComponent, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import {
  ShoppingListItem,
  ShoppingListItemSchema,
} from "../../api/shopping.api";
import { Spinner } from "../../common/spinner";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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

export const ShoppingListInput: FunctionComponent<{
  onSubmit: (item: ShoppingListItem) => void;
  loading?: boolean;
}> = ({ onSubmit, loading }) => {
  const { formState, handleSubmit, register, reset, setFocus } =
    useForm<ShoppingListItem>({
      resolver: zodResolver(ShoppingListItemSchema),
      defaultValues: {
        marked_as_done: false,
      },
    });
  const { errors, isSubmitting, isDirty } = formState;

  const handleOnSubmit = (item: ShoppingListItem) => {
    reset();
    onSubmit(item);
  };

  useEffect(() => {
    if (!isDirty) setFocus("name");
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((item) => handleOnSubmit(item))}
      noValidate
      mt={3}
    >
      <Grid container spacing={1}>
        <Grid item>
          <TextField
            size="small"
            label="Add to shopping list..."
            error={!!errors?.name?.message}
            helperText={errors?.name?.message}
            disabled={isSubmitting || loading}
            {...register("name")}
          />
        </Grid>
        <Grid item alignItems="stretch" sx={{ display: "flex" }}>
          <Button
            type="submit"
            startIcon={<AddShoppingCartIcon />}
            variant="contained"
            disabled={isSubmitting || loading}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {loading && <LinearProgress sx={{ mt: 2 }} />}
    </Box>
  );
};
