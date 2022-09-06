import { z } from "zod";

export const RecipeTagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const RecipeIngredientSchema = z.object({
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

