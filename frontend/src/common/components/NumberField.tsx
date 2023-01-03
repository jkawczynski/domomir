import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
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
  Stack,
  TextField,
  TextFieldProps,
  Typography,
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
  disabled?: boolean;
}> = ({ value, onChange, label, incrementStep, disabled }) => {
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
    <FormControl variant="outlined" size="small">
      <Typography variant="caption">{label}</Typography>
      <Stack direction="row" spacing={0}>
        <IconButton
          size="small"
          color="error"
          variant="contained"
          onClick={onReduce}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Box sx={{ mt: 0.5 }}>
          <Typography variant="caption">{value}</Typography>
        </Box>
        <IconButton
          size="small"
          color="success"
          variant="contained"
          onClick={onIncrement}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Stack>
    </FormControl>
  );
};

export default NumberField;
