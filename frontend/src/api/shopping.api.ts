import { authApi } from "./auth.api";
import z from "zod";

export const ShoppingListItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Cannot be empty" }),
  author: z.string().optional(),
  marked_as_done: z.boolean(),
  loading: z.boolean().optional(),
});
export type ShoppingListItem = z.infer<typeof ShoppingListItemSchema>;

export const getShoppingList = async () => {
  const response = await authApi.get<ShoppingListItem[]>("api/shopping/");
  return response.data;
};

export const createShoppingListItem = async (item: ShoppingListItem) => {
  const response = await authApi.post<ShoppingListItem>("api/shopping/", item);
  return response.data;
};

export const markItemAsDone = async (item: ShoppingListItem) => {
  const response = await authApi.patch<ShoppingListItem>(
    `api/shopping/${item.id}/`,
    { marked_as_done: true }
  );
  return response.data;
};
