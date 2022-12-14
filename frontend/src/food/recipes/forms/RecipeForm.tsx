import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FunctionComponent } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Spinner } from "../../../common/spinner";
import { Recipe } from "../api/models";
import { RecipeSchema } from "../api/schemas";
import { IngredientsSelect, PictureUploader, TagsSelect } from "../components";
import { RecipeDescription } from "../components/RecipeDescription";

export const RecipeForm: FunctionComponent<{
  recipe?: Recipe;
  onSubmit: Function;
  isLoading: boolean;
  error?: string;
}> = ({ recipe, onSubmit, isLoading, error }) => {
  const tagsSchema = z
    .array(z.string())
    .nonempty({ message: "Select at least one tag" });
  const schema = recipe
    ? RecipeSchema.extend({
        tags: tagsSchema,
      }).partial({ picture: true })
    : RecipeSchema.extend({ tags: tagsSchema });

  const { formState, register, handleSubmit, control } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      id: recipe?.id,
      name: recipe?.name,
      description: recipe?.description,
      url: recipe?.url || "",
      tags: recipe?.tags.map((t) => t.name) || [],
      ingredients: recipe?.ingredients || [
        { id: null, name: "", amount_and_unit: "" },
      ],
    },
  });
  const { errors, isSubmitting } = formState;

  const removeEmptyIngredients = (recipe: z.infer<typeof schema>) => {
    recipe.ingredients = recipe.ingredients.filter((i) => i.name !== "");
    return recipe;
  };

  if (isLoading) return <Spinner />;
  if (error) return <h5>An error occurred: {error}</h5>;

  return (
    <form
      onSubmit={handleSubmit((recipe) =>
        onSubmit(removeEmptyIngredients(recipe))
      )}
      className="needs-validation"
      noValidate
    >
      <Stack spacing={2} mt={2}>
        <TextField
          label="Name"
          size="small"
          error={!!errors?.name?.message}
          helperText={errors?.name?.message}
          {...register("name")}
        />
        <TextField
          label="Link"
          size="small"
          error={!!errors?.url?.message}
          helperText={errors?.url?.message}
          {...register("url")}
        />
        <Controller
          render={({ field: { onChange, value } }) => (
            <RecipeDescription
              value={value}
              error={errors?.description?.message}
              onChange={onChange}
            />
          )}
          name="description"
          control={control}
        />
        <Controller
          render={({ field: { onChange } }) => (
            <PictureUploader
              onFileSelect={onChange}
              error={errors?.picture?.message}
            />
          )}
          name="picture"
          control={control}
        />
        <Controller
          render={({ field: { onChange, value } }) => (
            <TagsSelect
              onChange={onChange}
              value={value}
              error={errors?.tags?.message}
            />
          )}
          name="tags"
          control={control}
        />
        <Controller
          render={({ field: { onChange, value } }) => (
            <IngredientsSelect onChange={onChange} value={value} />
          )}
          name="ingredients"
          control={control}
        />

        <Button type="submit" disabled={isSubmitting} variant="outlined">
          Save
        </Button>
      </Stack>
    </form>
  );
};
