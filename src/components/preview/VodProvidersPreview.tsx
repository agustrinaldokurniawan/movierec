"use client";

import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { tmdbImageLoader } from "../../utils/tmdb-image-loader";
import Image from "next/image";
import { StyleConstants } from "../../common/styles/style-constants";
import Link from "next/link";
import { IPreviewProviders } from "./interfaces/IPreviewProviders";
import { IProvider } from "../../common/interfaces/IProvider";
import { useEffect, useState } from "react";
import { useProvidersMovie } from "../../hooks/movie/provider";
import AppImage from "../AppImage/AppImage";

export default function VodProvidersPreview(props: IPreviewProviders) {
  const [vodProviders, setVodProviders] = useState<IProvider[]>([]);

  const { data, isLoading } = useProvidersMovie(props.movie_id);

  useEffect(() => {
    if (data && data.results[props.region]) {
      setVodProviders(data.results[props.region].flatrate);
    }
  }, [data]);

  return (
    !!vodProviders && (
      <Stack className={props.className}>
        <Typography
          color={props.isDominantColorDark ? "white" : "custom.dark"}
          variant="h6"
          fontWeight={"700"}
          textAlign={"left"}
        >
          VoD
        </Typography>
        <Box>
          <Grid container spacing={2}>
            {vodProviders.slice(0, 5).map((item: IProvider, key: number) => (
              <Grid item key={key}>
                <Tooltip title={item.provider_name}>
                  <Box width={50} height={50} className="relative">
                    <AppImage
                      loader={tmdbImageLoader}
                      src={item.logo_path}
                      width={0}
                      height={0}
                      fill
                      sizes="100%"
                      className="rounded-full object-cover"
                      alt={item.provider_name}
                      priority
                    />
                  </Box>
                </Tooltip>
              </Grid>
            ))}
            {!!(vodProviders.length > 5) && (
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
                        color={
                          props.isDominantColorDark ? "white" : "custom.dark"
                        }
                      >
                        More
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
