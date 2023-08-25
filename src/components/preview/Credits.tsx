import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { IPreviewCredits } from "./interfaces/IPreviewCredits";
import { tmdbImageLoader } from "../../utils/tmdb-image-loader";
import Image from "next/image";
import { StyleConstants } from "../../common/styles/style-constants";
import Link from "next/link";

export default function PreviewCredits(props: IPreviewCredits) {
  if (!props.cast?.length) {
    return (
      <>
        <p>Cast Empty</p>
      </>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {props.cast.slice(0, 5).map((item: any, key: number) => (
          <Grid item key={key}>
            <Tooltip title={item.name}>
              <Box width={50} height={50} className="relative">
                <Image
                  loader={tmdbImageLoader}
                  src={item.profile_path}
                  fill
                  className="rounded-full object-cover"
                  alt={item.name}
                />
              </Box>
            </Tooltip>
          </Grid>
        ))}
        {props.cast.length > 5 ? (
          <Grid item>
            <Tooltip title={"More"}>
              <Link href={"#"}>
                <Box
                  width={50}
                  height={50}
                  className="rounded-full"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    backgroundColor: !props.isDominantColorDark
                      ? "white"
                      : StyleConstants.color.dark,
                  }}
                >
                  <Typography
                    color={props.isDominantColorDark ? "white" : "custom.dark"}
                  >
                    More
                  </Typography>
                </Box>
              </Link>
            </Tooltip>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Box>
  );
}
