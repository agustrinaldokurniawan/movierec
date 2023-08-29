"use client";

import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { tmdbImageLoader } from "@/utils/tmdb-image-loader";
import ColorThief from "colorthief";
import { useEffect, useState } from "react";
import isDarkColor from "is-dark-color";
import Link from "next/link";
import { Menu, Star } from "@mui/icons-material";
import moment from "moment";
import { convertHexToRgb } from "../../utils/convertHexToRgb";
import { runtimeToHourAndMinute } from "../../utils/runtime-to-hour-and-minute";
import { useDetailMovie } from "../../hooks/movie/detail";
import { StyleConstants } from "../../common/styles/style-constants";
import { IDetailPreview } from "./interfaces/IDetailPreview";
import ListBackdropPreview from "./ListBackdropsPreview";
import AppImage from "../AppImage/AppImage";
import CreditsPreview from "./CreditsPreview";
import { useTranslation } from "react-i18next";
import VodProvidersPreview from "./VodProvidersPreview";
import GenrePreview from "./GenrePreview";
import SideMenu from "../SideMenu/SideMenu";

export default function ItemPreview(props: IDetailPreview) {
  const region = "US";
  const colorThief = new ColorThief();
  const { t } = useTranslation();

  const [isDesktop, setIsDesktop] = useState(true);
  const [dominantColor, setDominantColor] = useState<string>();
  const [isDominantColorDark, setIsDominantColorDark] =
    useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const { data, isLoading } = useDetailMovie(props.id);

  function onChangeResize() {
    setIsDesktop(window.innerWidth > 768);
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      event.preventDefault();
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenMenu(open);
    };

  useEffect(() => {
    window.addEventListener("resize", onChangeResize);
    return () => {
      window.removeEventListener("resize", onChangeResize);
    };
  }, []);

  const onLoadingImageComplete = (e: HTMLImageElement) => {
    if (e && e.width > 0) {
      const hexColor = colorThief.getColor(e);
      const rgbColor = convertHexToRgb(hexColor);
      setDominantColor(rgbColor);
      setIsDominantColorDark(isDarkColor(`#${rgbColor}`));
    }
  };

  if (isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    !!data && (
      <Box sx={{ height: "100vh", position: "relative" }}>
        <SideMenu open={openMenu} toggleDrawer={toggleDrawer} />
        <Box position={"absolute"} left={10} top={10} zIndex={2}>
          <IconButton size="large" onClick={toggleDrawer(true)}>
            <Menu fontSize="inherit" />
          </IconButton>
        </Box>
        <AppImage
          loader={tmdbImageLoader}
          src={isDesktop ? data.backdrop_path : data.poster_path}
          alt={data.title}
          sizes="100%"
          fill
          className="object-cover"
          onLoadingComplete={onLoadingImageComplete}
          crossOrigin="anonymous"
          priority
        />
        {!!dominantColor && (
          <Box
            className="absolute bottom-0 left-0 right-0 h-[100vh] overflow-hidden"
            sx={{
              background: `linear-gradient(to top, #${dominantColor}, transparent)`,
            }}
            display={"flex"}
            alignItems={"flex-end"}
          >
            <Grid container spacing={2} alignItems={"flex-end"}>
              <Grid
                item
                xs={12}
                md={6}
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
              >
                <Stack spacing={1} p={4}>
                  <GenrePreview
                    genres={data.genres}
                    isDominantColorDark={isDominantColorDark}
                  />
                  <Typography
                    color={isDominantColorDark ? "white" : "custom.dark"}
                    variant="h3"
                    fontWeight={"700"}
                    textAlign={"left"}
                  >
                    {data.title}
                  </Typography>
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Star sx={{ color: "star" }} />
                    <Typography
                      color={isDominantColorDark ? "white" : "custom.dark"}
                    >
                      {Number(data.vote_average).toFixed(2)}
                    </Typography>
                    <Link href="#">
                      <Typography
                        color={isDominantColorDark ? "white" : "custom.dark"}
                      >
                        ( {data.vote_count} )
                      </Typography>
                    </Link>
                    <Typography
                      color={isDominantColorDark ? "white" : "custom.dark"}
                      variant="caption"
                    >
                      {runtimeToHourAndMinute(data.runtime)} &#8226;{" "}
                      {moment(data.release_date).format("ll")}
                    </Typography>
                  </Box>
                  <Typography
                    color={isDominantColorDark ? "white" : "custom.dark"}
                    textAlign={"justify"}
                    className="line-clamp-3"
                  >
                    {data.overview}
                  </Typography>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Button
                          variant="contained"
                          sx={{
                            "&.MuiButton-root": {
                              backgroundColor: `#${dominantColor}`,
                            },
                          }}
                        >
                          <Typography
                            color={
                              isDominantColorDark
                                ? "white"
                                : StyleConstants.color.dark
                            }
                            textTransform={"capitalize"}
                          >
                            {t("readMore")}
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          sx={{
                            "&.MuiButton-root": {
                              borderColor: isDominantColorDark
                                ? "white"
                                : StyleConstants.color.dark,
                            },
                          }}
                        >
                          <Typography
                            color={
                              isDominantColorDark
                                ? "white"
                                : StyleConstants.color.dark
                            }
                            textTransform={"capitalize"}
                          >
                            Trailer
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Grid>
              <Grid item md={6} sx={{ display: { xs: "none", md: "flex" } }}>
                <Stack pt={4} mb={4}>
                  <ListBackdropPreview
                    movie_id={props.id}
                    isDominantColorDark={isDominantColorDark}
                    className="mt-4"
                  />
                  <CreditsPreview
                    isDominantColorDark={isDominantColorDark}
                    movie_id={props.id}
                    className="mt-4"
                  />
                  <VodProvidersPreview
                    isDominantColorDark={isDominantColorDark}
                    movie_id={props.id}
                    region={region}
                    className="mt-4"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    )
  );
}
