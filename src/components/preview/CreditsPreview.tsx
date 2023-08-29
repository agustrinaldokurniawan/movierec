import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { ICreditsPreview } from "./interfaces/ICreditsPreview";
import { tmdbImageLoader } from "../../utils/tmdb-image-loader";
import { StyleConstants } from "../../common/styles/style-constants";
import Link from "next/link";
import { useCreditsMovie } from "../../hooks/movie/credits";
import AppImage from "../AppImage/AppImage";
import { ICast } from "../../common/interfaces/ICast";
import i18n from "../../localization/i18n";

export default function CreditsPreview(props: ICreditsPreview) {
  const { data, isLoading } = useCreditsMovie(props.movie_id);

  return (
    !!data && (
      <Stack className={props.className}>
        <Typography
          color={props.isDominantColorDark ? "white" : "custom.dark"}
          variant="h6"
          fontWeight={"700"}
          textAlign={"left"}
          textTransform={"capitalize"}
        >
          {i18n.t("actors")}
        </Typography>
        <Box>
          <Grid container spacing={2}>
            {data.cast.slice(0, 5).map((item: ICast, key: number) => (
              <Grid item key={key}>
                <Tooltip
                  title={`${item.name}${
                    !!item.character && ` ${i18n.t("as")} ${item.character}`
                  }`}
                >
                  <Box width={50} height={50} className="relative">
                    <AppImage
                      loader={tmdbImageLoader}
                      src={item.profile_path}
                      sizes="100%"
                      fill
                      className="rounded-full object-cover"
                      alt={item.name}
                      priority
                    />
                  </Box>
                </Tooltip>
              </Grid>
            ))}
            {!!(data.cast.length > 5) && (
              <Grid item>
                <Tooltip title={i18n.t("all")}>
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
                        color={
                          props.isDominantColorDark ? "white" : "custom.dark"
                        }
                      >
                        {i18n.t("all")}
                      </Typography>
                    </Box>
                  </Link>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Box>
      </Stack>
    )
  );
}
