import { StackProps } from "@mui/material";

export interface ICreditsPreview extends StackProps {
  movie_id: string | number;
  isDominantColorDark?: boolean;
}
