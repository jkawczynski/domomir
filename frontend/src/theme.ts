import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red, lightBlue, green } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
});
theme = responsiveFontSizes(theme);

export default theme;
