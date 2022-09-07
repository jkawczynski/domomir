import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  Paper,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import { forwardRef } from "react";

type NumberFieldProps = TextFieldProps & {
  adornment?: string;
};

// eslint-disable-next-line react/display-name
export const NumberField = forwardRef<
  HTMLDivElement,
  PropsWithChildren<NumberFieldProps>
>((props, ref) => {
  const adornmentProps = props.adornment
    ? {
        startAdornment: (
          <InputAdornment position="start">{props.adornment}</InputAdornment>
        ),
      }
    : {};
  return (
    <TextField
      ref={ref}
      type="number"
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      InputProps={adornmentProps}
      {...props}
    />
  );
});

export const IncrementableNumberField: FunctionComponent<{
  value: number | undefined;
  onChange: (value: number) => void;
  label: string;
  incrementStep?: number;
}> = ({ value, onChange, label, incrementStep }) => {
  const onIncrement = () => {
    onChange((value || 0) + (incrementStep || 1));
  };
  const onReduce = () => {
    if (!value || value === 0) {
      return;
    }
    onChange((value || 0) - (incrementStep || 1));
  };

  return (
    <FormControl
      variant="outlined"
      size="small"
      sx={{ m: 0, p: 0, mt: 2, display: "flex" }}
    >
      <InputLabel htmlFor="incrementable-input">{label}</InputLabel>
      <OutlinedInput
        sx={{ m: 0, pl: 1, pr: 1 }}
        value={value}
        id="incrementable-input"
        startAdornment={
          <InputAdornment position="start">
            <IconButton onClick={onReduce} edge="start">
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onIncrement} sx={{ m: 0, p: 0 }}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
};

export default NumberField;
