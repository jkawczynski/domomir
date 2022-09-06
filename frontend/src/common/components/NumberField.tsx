import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { forwardRef, FunctionComponent } from "react";

type NumberFieldProps = TextFieldProps & {
  adornment?: string;
};

export const NumberField: FunctionComponent<NumberFieldProps> = forwardRef(
  (props, ref) => {
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
  }
);

export default NumberField;
