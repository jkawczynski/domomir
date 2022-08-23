import { FunctionComponent, useState } from "react";
import { PageButton } from "../../common/page";
import { useLocation } from "wouter";
import { getTags, RecipeTag } from "../../api/recipes.api";
import { Spinner } from "../../common/spinner";
import { Tags } from "./tags";
import { useQuery } from "@tanstack/react-query";
import { RecipesPage } from "../page";

export const TagsListView: FunctionComponent = () => {
    const [_, setLocation] = useLocation();
  return (
    <RecipesPage
      title="Tags"
      pageButtons={[
        <PageButton
          key="new"
          type="success"
          icon="plus-circle"
          name="Add new"
          onClick={() => setLocation("/tags/new")}
        />,
      ]}
  >
      list of tags
    </RecipesPage>
  );
};
