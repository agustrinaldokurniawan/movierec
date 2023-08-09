import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { IPreview } from "./interfaces/IPreview";
import Image from "next/image";
import { tmdbImageLoader } from "@/utils/tmdb-image-loader";

export default function Preview(props: IPreview) {
  return (
    <Box sx={{ height: "100vh", position: "relative" }} bgcolor={grey[300]}>
      <Image
        loader={tmdbImageLoader}
        src={props.backdrop_path}
        alt={props.title}
        fill
        className="object-cover"
      />
      <Box className="absolute bottom-12 left-12 right-12">
        <Typography variant="h1" fontWeight={"700"}>
          {props.title}
        </Typography>
      </Box>
    </Box>
  );
}
