import Box from "@mui/material/Box";
import { FunctionComponent } from "react";

import { FoodPage } from "../page";
import { TagsManagedList } from "./management";

export const TagsDashboard: FunctionComponent = () => {
  return (
    <FoodPage title="Tags">
      <Box mt={4} mb={2}>
        <TagsManagedList />
      </Box>
    </FoodPage>
  );
};
