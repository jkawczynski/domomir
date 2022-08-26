import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, FunctionComponent } from "react";

import { getIngredients, getTagsNames } from "../../api/recipes.api";
import { Spinner } from "../../common/spinner";

export type Filters = {
  tags: string[];
  ingredients: string[];
  name: string;
};

export const CheckboxListFilter: FunctionComponent<{
  name: string;
  apiGet: () => Promise<string[]>;
  onChange: (value: string[]) => void;
  value: string[];
}> = ({ onChange, value, name, apiGet }) => {
  const { isLoading, data, isError } = useQuery([`get${name}`], apiGet);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (value.includes(event.target.name)) {
      onChange(value.filter((tagName) => tagName !== event.target.name));
    } else {
      onChange([...value, event.target.name]);
    }
  };

  if (isLoading) return <Spinner />;
  if (!data || isError) return <span>Error loading {name}</span>;
  if (!data.length) return null;

  return (
    <Box mt={2} mb={2}>
      <Typography>Select {name}:</Typography>
      <Stack direction="row" spacing={1}>
        <FormGroup row>
          {data.map((item: string) => (
            <FormControlLabel
              key={item}
              control={<Checkbox size="small" name={item} onChange={handleChange} />}
              label={item}
            />
          ))}
        </FormGroup>
      </Stack>
    </Box>
  );
};

export const RecipesFilter: FunctionComponent<{
  value: Filters;
  onChange: Function;
}> = ({ onChange, value }) => {
  const onChangeTags = (tags: string[]) => {
    onChange({ ...value, tags });
  };
  const onChangeIngredients = (ingredients: string[]) => {
    onChange({ ...value, ingredients });
  };

  const onChangeQuery = (query: string) => {
    onChange({ ...value, name: query});
  };
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          value={value.name}
          onChange={(event) => onChangeQuery(event.target.value)}
          label="Search by name"
          size="small"
          variant="outlined"
        />
        <CheckboxListFilter
          name="tags"
          value={value.tags}
          onChange={onChangeTags}
          apiGet={getTagsNames}
        />
        <CheckboxListFilter
          name="ingredients"
          value={value.ingredients}
          onChange={onChangeIngredients}
          apiGet={getIngredients}
        />
      </AccordionDetails>
    </Accordion>
  );
};
