import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { FullPageLoading } from "../../common/components";
import { FoodPage } from "../page";
import { createShoppingListItem, getShoppingList, markItemAsDone } from "./api";
import { ShoppingList } from "./components";
import { ShoppingListForm } from "./forms";

export const ShoppingListPage: FunctionComponent = () => {
  const { data, isLoading, refetch } = useQuery(
    ["shoppingList"],
    getShoppingList
  );
  const createMutation = useMutation(createShoppingListItem, {
    onSuccess: () => refetch(),
  });
  const markAsDoneMutation = useMutation(markItemAsDone, {
    onSuccess: () => refetch(),
  });
  if (isLoading) return <FullPageLoading />;
  return (
    <FoodPage title="Shopping List">
      <ShoppingListForm
        onSubmit={(item) => createMutation.mutate(item)}
        loading={createMutation.isLoading}
      />
      <ShoppingList
        data={data || []}
        onMarkedAsDone={(item) => markAsDoneMutation.mutate(item)}
      />
    </FoodPage>
  );
};
