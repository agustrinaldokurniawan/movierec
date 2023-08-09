import { materialUiTheme } from "@/themes/material-ui";
import { ThemeProvider } from "@mui/material";
import { IChildren } from "@/common/interfaces/ichildren";

export default function MuiProviders(props: IChildren) {
  return (
    <ThemeProvider theme={materialUiTheme}>{props.children}</ThemeProvider>
  );
}
