import { FunctionComponent } from "react";
import { FoodPage } from "../page";

import {
  createShoppingListItem,
  getShoppingList,
  markItemAsDone,
} from "../../api/shopping.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "../../common/spinner";
import { ShoppingList, ShoppingListInput } from "./shopping-list";

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
  if (isLoading) return <Spinner />;
  return (
    <FoodPage title="Shopping List">
      <ShoppingListInput
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
