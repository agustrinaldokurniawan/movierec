import { StackProps } from "@mui/material";

export interface IPreviewProviders extends StackProps {
  isDominantColorDark?: boolean;
  movie_id: string | number;
  region: string;
}
