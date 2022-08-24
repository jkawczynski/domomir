import { createTheme } from "@mui/material/styles";
import { red, lightBlue, green } from "@mui/material/colors";

const theme = createTheme({
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

export default theme;
