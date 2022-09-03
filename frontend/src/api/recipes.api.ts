import qs from "qs";
import { z } from "zod";
import { authApi } from "./auth.api";

const RecipeTagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const RecipeIngredientSchema = z.object({
  name: z.string(),
  amount_and_unit: z.string(),
});

export const RecipeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3),
  url: z.string().url().optional().or(z.literal("")),
  picture: z.string(),
  thumbnail: z.string().optional(),
  ingredients: z.array(RecipeIngredientSchema),
  description: z.string().min(3).optional().or(z.literal("")),
  tags: z.array(RecipeTagSchema),
});

export type RecipeTag = z.infer<typeof RecipeTagSchema>;
export type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;

export async function getRecipes(filters: {
  tags: string[];
  ingredients: string[];
  name: string;
}) {
  const { name, tags, ingredients } = filters;
  const url = `${import.meta.env.VITE_APP_API_URL}api/recipes/`;
  const response = await authApi.get<Recipe[]>(url, {
    params: { tags, ingredients, name },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "comma" }),
  });
  return response.data;
}

export async function getRecipe(recipeId: string) {
  const response = await authApi.get<Recipe>(
    `${import.meta.env.VITE_APP_API_URL}api/recipes/${recipeId}/`
  );
  return response.data;
}

export async function deleteRecipe(recipeId: string) {
  return await authApi.delete(
    `${import.meta.env.VITE_APP_API_URL}api/recipes/${recipeId}/`
  );
}

export async function createRecipe(recipe: Recipe) {
  return await authApi({
    method: "POST",
    url: `${import.meta.env.VITE_APP_API_URL}api/recipes/`,
    data: recipe,
  });
}

export async function updateRecipe(recipe: Recipe) {
  return await authApi({
    method: "PUT",
    url: `${import.meta.env.VITE_APP_API_URL}api/recipes/${recipe.id}/`,
    data: recipe,
  });
}

export async function uploadPicture(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return await authApi({
    method: "POST",
    url: `${import.meta.env.VITE_APP_API_URL}recipes_upload/`,
    data: formData,
    headers: {
      "Content-Disposition": `Content-Disposition: attachment; filename=${file.name}`,
    },
  });
}

export async function getTagsNames() {
  return await authApi 
    .get<string[]>(`${import.meta.env.VITE_APP_API_URL}api/tags_list/`)
    .then((response) => response.data);
}

export async function getTags() {
  return await authApi 
    .get<RecipeTag[]>(`${import.meta.env.VITE_APP_API_URL}api/tags/`)
    .then((response) => response.data);
}

export async function deleteTag(id: number) {
  return await authApi.delete(
    `${import.meta.env.VITE_APP_API_URL}api/tags/${id}/`
  );
}

export async function getIngredients() {
  return await authApi 
    .get<string[]>(`${import.meta.env.VITE_APP_API_URL}api/ingredients/`)
    .then((response) => response.data);
}
