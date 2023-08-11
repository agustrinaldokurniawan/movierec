import { createTheme } from "@mui/material/styles";

export const materialUiTheme = createTheme({
  palette: {
    custom: {
      dark: "#272829",
      animation: "#1D5C83",
      star: "#F29727",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  components: {
    MuiChip: {
      variants: [
        {
          props: { variant: "genre-animation" },
          style: {
            backgroundColor: "#F94C10",
            color: "white",
          },
        },
        {
          props: { variant: "genre-action" },
          style: {
            backgroundColor: "#272829",
            color: "white",
          },
        },
        {
          props: { variant: "genre-adventure" },
          style: {
            backgroundColor: "#4C4B16",
            color: "white",
          },
        },
        {
          props: { variant: "genre-science-fiction" },
          style: {
            backgroundColor: "#3D246C",
            color: "white",
          },
        },
      ],
    },
  },
});
