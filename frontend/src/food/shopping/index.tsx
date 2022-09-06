import { FunctionComponent } from "react";
import { FoodPage } from "../page";

import { useMutation, useQuery } from "@tanstack/react-query";
import { FullPageLoading } from "../../common/components";
import { getShoppingList, createShoppingListItem, markItemAsDone } from "./api";
import { ShoppingListForm } from "./forms";
import { ShoppingList } from "./components";

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
