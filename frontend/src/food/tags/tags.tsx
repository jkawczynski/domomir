import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
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

const filter = createFilterOptions();

export const TagsSelect: FunctionComponent<{
  value?: string[];
  onChange: Function;
  error?: string;
}> = ({ onChange, error, value }) => {
  const { isLoading, data, isError } = useQuery(["getTagsNames"], getTagsNames);

  if (isLoading) return <Spinner />;
  if (!data || isError) return <span>Error loading tags</span>;

  const filterOptions = (options: string[], params: any) => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    const isExisting = options.some((option) => inputValue === option);

    if (inputValue !== "" && !isExisting) {
      filtered.push({
        inputValue,
        name: `Add "${inputValue}"`,
        new: true,
      });
    }
    return filtered as string[];
  };
  const getOptionLabel = (option: any) => {
    if (typeof option === "string") {
      return option;
    }

    if (option.inputValue) {
      return option.inputValue;
    }

    return option;
  };

  const mapValues = (value: any) => {
    const values = value.map((v: any) => {
      if (v.inputValue) {
        return v.inputValue;
      }
      return v;
    });
    return Array.from(new Set(values));
  };

  return (
    <Box mt={2}>
      <Autocomplete
        multiple
        options={data}
        value={value}
        filterOptions={filterOptions}
        freeSolo
        onChange={(_, value) => onChange(mapValues(value))}
        getOptionLabel={getOptionLabel}
        renderOption={(props: any, option: any) => {
          return <li {...props}>{option.inputValue ? option.name : option}</li>;
        }}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: any, index: number) => {
            return (
              <Chip
                  variant="outlined"
                  size="small"
                label={option.inputValue ? option.inputValue : option}
                {...getTagProps({ index })}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            error={!!error}
            {...params}
            variant="outlined"
            size="small"
            label="Tags"
            helperText={error}
          />
        )}
      />
    </Box>
  );
};
