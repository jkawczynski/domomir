import z from "zod";

export const ShoppingListItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Cannot be empty" }),
  marked_as_done: z.boolean(),
  loading: z.boolean().optional(),
});
