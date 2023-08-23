import { SxProps, Theme } from "@mui/material";
import { StyleConstants } from "../style-constants";
export const chipSx: SxProps<Theme> = {
  '&[data-genre="animation"]': {
    backgroundColor: StyleConstants.color.red,
    color: "white",
  },
  '&[data-genre="action"]': {
    backgroundColor: StyleConstants.color.dark,
    color: "white",
  },
  '&[data-genre="adventure"]': {
    backgroundColor: StyleConstants.color.darkGreen,
    color: "white",
  },
  '&[data-genre="science-fiction"]': {
    backgroundColor: StyleConstants.color.purple,
    color: "white",
  },
};
