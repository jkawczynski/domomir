import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red, lightBlue, green } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: "#512da8",
    },
    secondary: lightBlue,
    error: {
      main: red.A400,
    },
    success: {
      main: green.A700,
    },
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
});
theme = responsiveFontSizes(theme);

export default theme;
