import { ThemeOptions, createTheme } from "@mui/material/styles";
import {palette} from './palette'

export const materialUiTheme : ThemeOptions = createTheme({
  palette,
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});
