import { FunctionComponent } from "react";
import { Recipe, RecipeSchema } from "../api/recipes.api";
import { TagsSelect } from "./tags/tags";
import { PictureUploader } from "./picture-uploader";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "../common/spinner";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { z } from "zod";

export const RecipeForm: FunctionComponent<{
  recipe?: Recipe;
  onSubmit: Function;
  isLoading: boolean;
  error?: string;
}> = ({ recipe, onSubmit, isLoading, error }) => {
  const schema = recipe
    ? RecipeSchema.extend({
        tags: z.array(z.string()),
      }).partial({ picture: true })
    : RecipeSchema.extend({ tags: z.array(z.string()) });

  const { formState, register, handleSubmit, control } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      id: recipe?.id,
      name: recipe?.name,
      description: recipe?.description,
      url: recipe?.url || "",
      tags: recipe?.tags.map((t) => t.name),
    },
  });
  const { errors, isSubmitting } = formState;

  if (isLoading) return <Spinner />;
  if (error) return <h5>An error occurred: {error}</h5>;

  return (
    <form
      onSubmit={handleSubmit((recipe) => onSubmit(recipe))}
      className="needs-validation"
      noValidate
    >
      <Stack spacing={2} mt={2}>
        <TextField
          label="Name"
          error={!!errors?.name?.message}
          helperText={errors?.name?.message}
          {...register("name")}
        />
        <TextField
          label="Link"
          error={!!errors?.url?.message}
          helperText={errors?.url?.message}
          {...register("url")}
        />
        <TextField
          label="Description"
          error={!!errors?.description?.message}
          helperText={errors?.description?.message}
          {...register("description")}
          multiline
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
          render={({ field: { onChange } }) => (
            <TagsSelect
              error={errors?.tags?.message}
              onChange={onChange}
              initial={recipe?.tags.map((t) => t.name)}
            />
          )}
          name="tags"
          control={control}
        />

        <Button type="submit" disabled={isSubmitting} variant="outlined">
          Save
        </Button>
      </Stack>
    </form>
  );
};
