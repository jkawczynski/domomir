import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { getTagsNames } from "../../api/recipes.api";
import { Spinner } from "../../common/spinner";

export const Tag: FunctionComponent<{ tag: string }> = ({ tag }) => {
  return <Chip key={tag} size="small" label={tag} />;
};

export const TagsList: FunctionComponent<{
  tags: string[];
}> = ({ tags }) => {
  return (
    <Box mt={2} mb={2}>
      <Stack direction="row" spacing={1}>
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </Stack>
    </Box>
  );
};

export const TagsSelect: FunctionComponent<{
  value?: string[];
  onChange: Function;
  error?: string;
}> = ({ onChange, error, value }) => {
  const { isLoading, data, isError } = useQuery(["getTagsNames"], getTagsNames);

  if (isLoading) return <Spinner />;
  if (!data || isError) return <span>Error loading tags</span>;

  return (
    <Box mt={2}>
      <Autocomplete
        multiple
        options={data}
        value={value}
        freeSolo
        onChange={(_, value) => onChange(value)}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            error={!!error}
            {...params}
            variant="outlined"
            label="Tags"
            helperText={error}
          />
        )}
      />
    </Box>
  );
};
