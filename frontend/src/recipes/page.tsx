import ListAltIcon from "@mui/icons-material/ListAlt";
import TagIcon from "@mui/icons-material/Tag";
import { FunctionComponent } from "react";

import { Page, PageAction } from "../common/page";

const subNavigation = [
  { name: "Recipes", path: "/list", icon: <ListAltIcon /> },
  { name: "Tags", path: "/tags", icon: <TagIcon /> },
];

export const RecipesPage: FunctionComponent<{
  children?: React.ReactNode;
  actions?: PageAction[];
  title: string;
}> = ({ children, actions, title }) => {
  return (
    <Page title={title} actions={actions} subNavigation={subNavigation}>
      {children}
    </Page>
  );
};
