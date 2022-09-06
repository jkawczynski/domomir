import { FilterOptionsState } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { Spinner } from "../../../common/spinner";
import { getTagsNames } from "../api";

const filter = createFilterOptions<TagOption>();

export type TagOption = {
  inputValue: string;
  name: string;
  new: boolean;
};

export const mapToTagOption = (tag: string): TagOption => ({
  inputValue: tag,
  name: tag,
  new: false,
});

export const TagsSelect: FunctionComponent<{
  value?: string[];
  onChange: (options: string[]) => void;
  error?: string;
}> = ({ onChange, error, value }) => {
  const { isLoading, data, isError } = useQuery(["getTagsNames"], getTagsNames);

  if (isLoading) return <Spinner />;
  if (!data || isError) return <span>Error loading tags</span>;

  const filterOptions = (
    options: TagOption[],
    params: FilterOptionsState<TagOption>
  ) => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    const isExisting = options.some(
      (option) => inputValue.toLowerCase() === option.inputValue.toLowerCase()
    );

    if (inputValue !== "" && !isExisting) {
      filtered.push({
        inputValue,
        name: `Add "${inputValue}"`,
        new: true,
      });
    }
    return filtered;
  };

  const handleOnChange = (options: (string | TagOption)[]) => {
    const values = options.map((option) =>
      typeof option === "string" ? option : option.inputValue
    );
    onChange(Array.from(new Set(values)));
  };

  return (
    <Box mt={2}>
      <Autocomplete
        multiple
        options={data.map(mapToTagOption)}
        value={value?.map(mapToTagOption)}
        filterOptions={filterOptions}
        freeSolo
        onChange={(_, options) => handleOnChange(options)}
        getOptionLabel={(option: string | TagOption) =>
          typeof option === "string" ? option : option.inputValue
        }
        renderOption={(props: object, option: TagOption) => {
          return <li {...props}>{option.name}</li>;
        }}
        renderTags={(options: readonly TagOption[], getTagProps) =>
          options.map((option: TagOption, index: number) => {
            return (
              <Chip
                variant="outlined"
                size="small"
                label={option.inputValue}
                {...getTagProps({ index })}
                key={option.name}
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
