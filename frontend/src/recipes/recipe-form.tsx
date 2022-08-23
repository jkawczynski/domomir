import { FunctionComponent } from "react";
import { Recipe, RecipeSchema } from "../api/recipes.api";
import { Tags } from "./tags/tags";
import { PictureUploader } from "./picture-uploader";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "../common/spinner";

export const RecipeForm: FunctionComponent<{
  recipe?: Recipe;
  onSubmit: Function;
  isLoading: boolean;
  error?: string;
}> = ({ recipe, onSubmit, isLoading, error }) => {
  const schema = recipe
    ? RecipeSchema.partial({ picture: true })
    : RecipeSchema;
  const { formState, register, handleSubmit, control } = useForm<Recipe>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: recipe?.id,
      name: recipe?.name,
      description: recipe?.description,
      url: recipe?.url || "",
      tags: recipe?.tags,
    },
  });
  const { errors, isSubmitting } = formState;

  if (isLoading) return <Spinner />;
  if (error) return <h5>An error occurred: {error}</h5>;

  function getErrroClass(formField: any) {
    const validationClass = formField ? "is-invalid" : "";
    return `form-control ${validationClass}`;
  }

  return (
    <form
      onSubmit={handleSubmit((recipe) => onSubmit(recipe))}
      className="needs-validation"
      noValidate
    >
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          placeholder="Name of the recipe"
          className={getErrroClass(errors.name)}
          {...register("name")}
        />
        <div className="invalid-feedback">{errors?.name?.message}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Link</label>
        <input
          type="text"
          placeholder="Put the link here if recipe is from external site"
          className={getErrroClass(errors.url)}
          {...register("url")}
        />
        <div className="invalid-feedback">{errors?.url?.message}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          rows="3"
          placeholder="Description"
          className={getErrroClass(errors.description)}
          {...register("description")}
        />
        <div className="invalid-feedback">{errors?.description?.message}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Picture</label>
        <Controller
          render={({ field: { onChange } }) => (
            <PictureUploader
              onFileSelect={onChange}
              className={getErrroClass(errors.picture)}
            />
          )}
          name="picture"
          control={control}
        />
        <div className="invalid-feedback">{errors?.picture?.message}</div>
        <small>
          {recipe
            ? "Upload new picture to change the current one, leave blank if You don't want to change the picture"
            : ""}
        </small>
      </div>

      <div className="mb-3">
        <Controller
          render={({ field: { onChange } }) => (
            <Tags
              initial={recipe?.tags}
              className={getErrroClass(errors.tags)}
              onChange={onChange}
            />
          )}
          name="tags"
          control={control}
        />
        <div className="invalid-feedback">{errors?.tags?.message}</div>
      </div>

      <button disabled={isSubmitting} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
