import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { z } from "zod";

const recipeTagSchema = z.object({
  name: z.string(),
  tag_type: z.enum([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "link",
  ]),
});

export const RecipeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3),
  url: z.string().url().optional().or(z.literal("")),
  picture: z.string(),
  description: z.string().min(3).optional().or(z.literal("")),
  tags: z.array(recipeTagSchema),
});

export type RecipeTag = z.infer<typeof recipeTagSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;

export async function getRecipes(tags: RecipeTag[]) {
  const url = `${import.meta.env.VITE_APP_API_URL}api/recipes/`;
  return await axios
    .get<Recipe[]>(url, {
      params: { tags: tags.map((tag: RecipeTag) => tag.name) },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    })
    .then((response) => response.data);
}

export async function getRecipe(recipeId: string) {
  return await axios
    .get<Recipe>(`${import.meta.env.VITE_APP_API_URL}api/recipes/${recipeId}/`)
    .then((response) => response.data);
}

export function deleteRecipe(recipeId: string): Promise<AxiosResponse> {
  return axios.delete(
    `${import.meta.env.VITE_APP_API_URL}api/recipes/${recipeId}/`
  );
}

export function createRecipe(recipe: Recipe) {
  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_APP_API_URL}api/recipes/`,
    data: recipe,
  });
}

export function updateRecipe(recipe: Recipe) {
  return axios({
    method: "PUT",
    url: `${import.meta.env.VITE_APP_API_URL}api/recipes/${recipe.id}/`,
    data: recipe,
  });
}

export function uploadPicture(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_APP_API_URL}recipes_upload/`,
    data: formData,
    headers: {
      "Content-Disposition": `Content-Disposition: attachment; filename=${file.name}`,
    },
  });
}

export async function getTags() {
  return await axios
    .get<RecipeTag[]>(`${import.meta.env.VITE_APP_API_URL}api/tags/`)
    .then((response) => response.data);
}
