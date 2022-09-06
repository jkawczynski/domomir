import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { FunctionComponent } from "react";

export const TagsList: FunctionComponent<{
  tags: string[];
}> = ({ tags }) => {
  return (
    <Box mt={2} mb={2}>
      <Stack direction="row" spacing={1}>
        {tags.map((tag) => (
          <Chip key={tag} size="small" label={tag} />
        ))}
      </Stack>
    </Box>
  );
};
