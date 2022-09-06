import { FunctionComponent, useEffect } from "react";

import { Box, Button, Grid, LinearProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ShoppingListItem } from "../api/models";
import { ShoppingListItemSchema } from "../api/schemas";

export const ShoppingListForm: FunctionComponent<{
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
