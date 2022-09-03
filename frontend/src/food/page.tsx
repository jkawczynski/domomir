import ListAltIcon from "@mui/icons-material/ListAlt";
import TagIcon from "@mui/icons-material/Tag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FunctionComponent } from "react";

import { Page, PageAction } from "../common/page";

const subNavigation = [
  { name: "Recipes", path: "/recipes", icon: <ListAltIcon /> },
  { name: "Shopping List", path: "/shopping", icon: <ShoppingCartIcon /> },
  { name: "Tags", path: "/tags", icon: <TagIcon /> },
];

export const FoodPage: FunctionComponent<{
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
