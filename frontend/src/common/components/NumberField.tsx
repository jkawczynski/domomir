import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { PropsWithChildren } from "react";
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

export default NumberField;
