import { z } from "zod";
import {
  RecipeIngredientSchema,
  RecipeSchema,
  RecipeTagSchema,
} from "./schemas";

export type RecipeTag = z.infer<typeof RecipeTagSchema>;
export type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;
