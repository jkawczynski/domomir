import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { FunctionComponent } from "react";

export const Spinner: FunctionComponent<{ size?: number | string }> = ({
  size,
}) => (
  <Box sx={{ display: "flex" }}>
    <CircularProgress size={size} />
  </Box>
);
