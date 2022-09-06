import qs from "qs";
import { authApi } from "../../../api/auth.api";
import { Recipe, RecipeTag } from "./models";

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

export async function getIngredients() {
  return await authApi
    .get<string[]>(`${import.meta.env.VITE_APP_API_URL}api/ingredients/`)
    .then((response) => response.data);
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
