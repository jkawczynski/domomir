import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";

import { RecipesPage } from "../page";

export const TagsDashboard: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
  return (
    <RecipesPage
      title="Tags"
      actions={[
        {
          icon: <AddIcon />,
          name: "Add new",
          onClick: () => setLocation("/new"),
        },
      ]}
    >
      <Box mt={2} mb={2}>
        Tags here :O
      </Box>
    </RecipesPage>
  );
};
