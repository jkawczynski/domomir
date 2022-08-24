import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { FunctionComponent } from "react";

export const Spinner: FunctionComponent = () => (
  <Box sx={{ display: "flex" }}>
    <CircularProgress />
  </Box>
);
