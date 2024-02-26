import { api } from "../../../api/publicAxios";
import { ShoppingListItem } from "./models";

export const getShoppingList = async () => {
  const response = await api.get<ShoppingListItem[]>("api/shopping/");
  return response.data;
};

export const createShoppingListItem = async (item: ShoppingListItem) => {
  const response = await api.post<ShoppingListItem>("api/shopping/", item);
  return response.data;
};

export const addToShoppingList = async (items: ShoppingListItem[]) => {
  const response = await api.post<ShoppingListItem>("api/shopping/add_bulk/", items);
  return response.data;
}

export const markItemAsDone = async (item: ShoppingListItem) => {
  const response = await api.patch<ShoppingListItem>(
    `api/shopping/${item.id}/`,
    { marked_as_done: true }
  );
  return response.data;
};
