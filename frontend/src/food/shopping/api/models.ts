import z from "zod";

import { ShoppingListItemSchema } from "./schemas";

export type ShoppingListItem = z.infer<typeof ShoppingListItemSchema>;
