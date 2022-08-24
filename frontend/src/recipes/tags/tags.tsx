import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Theme, useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";

import { RecipeTag, getTags } from "../../api/recipes.api";
import { Spinner } from "../../common/spinner";

export const Tag: FunctionComponent<{ tag: RecipeTag }> = ({ tag }) => {
  return <Chip key={tag.name} size="small" label={tag.name} />;
};

export const TagsList: FunctionComponent<{
  tags: RecipeTag[];
}> = ({ tags }) => {
  return (
    <Box mt={2} mb={2}>
      <Stack direction="row" spacing={1}>
        {tags.map((tag) => (
          <Tag key={tag.name} tag={tag} />
        ))}
      </Stack>
    </Box>
  );
};

export const TagsFilter: FunctionComponent<{
  onChange?: Function;
}> = ({ onChange }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { isLoading, data, isError } = useQuery(["getTags"], getTags);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let current = [...selectedTags];
    if (selectedTags.includes(event.target.name)) {
      current = selectedTags.filter((tagName) => tagName !== event.target.name);
    } else {
      current = [...current, event.target.name];
    }
    if (onChange) onChange(current);
    setSelectedTags(current);
  };

  if (isLoading) return <Spinner />;
  if (!data || isError) return <span>Error loading tags</span>;

  return (
    <Box mt={2} mb={2}>
      <Typography>Select tags:</Typography>
      <Stack direction="row" spacing={1}>
        <FormGroup row>
          {data.map((tag) => (
            <FormControlLabel
              key={tag.name}
              control={<Checkbox name={tag.name} onChange={handleChange} />}
              label={tag.name}
            />
          ))}
        </FormGroup>
      </Stack>
    </Box>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const TagsSelect: FunctionComponent<{
  value?: string[];
  onChange?: Function;
  error?: string;
}> = ({ onChange, error, value }) => {
  const theme = useTheme();
  const { isLoading, data, isError } = useQuery(["getTags"], getTags);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    const selected = typeof value === "string" ? value.split(",") : value;
    if (onChange) onChange(selected);
  };

  if (isLoading) return <Spinner />;
  if (!data || isError) return <span>Error loading tags</span>;

  return (
    <Box mt={2}>
      <FormControl sx={{ width: 1 }} error={!!error}>
        <InputLabel id="tags-select">Tags</InputLabel>
        <Select
          labelId="tags-select"
          id="tags-select"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((tag) => (
            <MenuItem
              key={tag.name}
              value={tag.name}
              style={getStyles(
                tag.name,
                data.map((t) => t.name),
                theme
              )}
            >
              {tag.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </Box>
  );
};
