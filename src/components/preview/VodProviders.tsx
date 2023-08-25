import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { tmdbImageLoader } from "../../utils/tmdb-image-loader";
import Image from "next/image";
import { StyleConstants } from "../../common/styles/style-constants";
import Link from "next/link";
import { IPreviewProviders } from "./interfaces/IPreviewProviders";
import { IProvider } from "../../common/interfaces/IProvider";

export default function PreviewVodProviders(props: IPreviewProviders) {
  if (!props.providers?.length) {
    return (
      <>
        <p>Empty VoD</p>
      </>
    );
  }
  return (
    <Box>
      <Grid container spacing={2}>
        {props.providers.slice(0, 5).map((item: IProvider, key: number) => (
          <Grid item key={key}>
            <Tooltip title={item.provider_name}>
              <Box width={50} height={50} className="relative">
                <Image
                  loader={tmdbImageLoader}
                  src={item.logo_path}
                  fill
                  className="rounded-full object-cover"
                  alt={item.provider_name}
                />
              </Box>
            </Tooltip>
          </Grid>
        ))}
        {props.providers.length > 5 ? (
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
