import { Box, LinearProgress } from "@mui/material";
import { FunctionComponent } from "react";

export const FullPageLoading: FunctionComponent = () => {
  return (
    <Box mt={2}>
      <LinearProgress />
    </Box>
  );
};
