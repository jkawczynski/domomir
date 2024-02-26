import qs from "qs";

import { api } from "../../../api/publicAxios";
import { Recipe, RecipePicture, RecipeTag } from "./models";

export async function getRecipes(filters: {
  tags: string[];
  ingredients: string[];
  name: string;
}) {
  const { name, tags, ingredients } = filters;
  const url = `${import.meta.env.VITE_APP_API_URL}api/recipes/`;
  const response = await api.get<Recipe[]>(url, {
    params: { tags, ingredients, name },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "comma" }),
  });
  return response.data;
}

export async function getRecipe(recipeId: string) {
  const response = await api.get<Recipe>(
    `${import.meta.env.VITE_APP_API_URL}api/recipes/${recipeId}/`,
  );
  return response.data;
}

export async function deleteRecipe(recipeId: string) {
  return await api.delete(
    `${import.meta.env.VITE_APP_API_URL}api/recipes/${recipeId}/`,
  );
}

export async function createRecipe(recipe: Recipe) {
  return await api({
    method: "POST",
    url: `${import.meta.env.VITE_APP_API_URL}api/recipes/`,
    data: recipe,
  });
}

export async function updateRecipe(recipe: Recipe) {
  return await api({
    method: "PUT",
    url: `${import.meta.env.VITE_APP_API_URL}api/recipes/${recipe.id}/`,
    data: recipe,
  });
}

export async function uploadPicture(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post<RecipePicture>(
    `${import.meta.env.VITE_APP_API_URL}recipes_upload/`,
    formData,
    {
      headers: {
        "Content-Disposition": `Content-Disposition: attachment; filename=${file.name}`,
      },
    },
  );
  return response.data;
}

export async function getIngredients() {
  return await api
    .get<string[]>(`${import.meta.env.VITE_APP_API_URL}api/ingredients/`)
    .then((response) => response.data);
}

export async function getTagsNames() {
  return await api
    .get<string[]>(`${import.meta.env.VITE_APP_API_URL}api/tags_list/`)
    .then((response) => response.data);
}

export async function getTags() {
  return await api
    .get<RecipeTag[]>(`${import.meta.env.VITE_APP_API_URL}api/tags/`)
    .then((response) => response.data);
}

export async function deleteTag(id: number) {
  return await api.delete(`${import.meta.env.VITE_APP_API_URL}api/tags/${id}/`);
}
