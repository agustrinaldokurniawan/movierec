"use client";

import { Box, Grid, Stack, Typography, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { IPreview } from "./interfaces/IPreview";
import Image from "next/image";
import { tmdbImageLoader } from "@/utils/tmdb-image-loader";
import ColorThief from "colorthief";
import { useEffect, useState } from "react";
import isDarkColor from "is-dark-color";
import Link from "next/link";
import { Star } from "@mui/icons-material";
import moment from "moment";
import { convertHexToRgb } from "../../utils/convertHexToRgb";
import { runtimeToHourAndMinute } from "../../utils/runtime-to-hour-and-minute";
import Images from "../Images/Images";
import { useDetailMovie } from "../../hooks/movie/detail";
import { useImagesMovie } from "../../hooks/movie/images";
import { useCreditsMovie } from "../../hooks/movie/credits";
import Genre from "./Genre";

export default function Preview(props: IPreview) {
  const [isDesktop, setIsDesktop] = useState(true);

  function onChangeResize() {
    setIsDesktop(window.innerWidth > 768);
  }

  useEffect(() => {
    window.addEventListener("resize", onChangeResize);
    return () => {
      window.removeEventListener("resize", onChangeResize);
    };
  }, []);

  const [dominantColor, setDominantColor] = useState<string>();
  const [isDominantColorDark, setIsDominantColorDark] =
    useState<boolean>(false);

  const { data, isLoading } = useDetailMovie(props.id);
  const { data: dataImages, isLoading: isLoadingImages } = useImagesMovie(
    props.id
  );
  const { data: dataCredits, isLoading: isLoadingCredits } = useCreditsMovie(
    props.id
  );

  const colorThief = new ColorThief();
  const onLoadingImageComplete = (e: HTMLImageElement) => {
    if (e) {
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
    <Box sx={{ height: "100vh", position: "relative" }} bgcolor={grey[300]}>
      <Image
        loader={tmdbImageLoader}
        src={isDesktop ? data.backdrop_path : data.poster_path}
        alt={data.title}
        fill
        className="object-cover"
        onLoadingComplete={onLoadingImageComplete}
        crossOrigin="anonymous"
      />
      <Box
        className="absolute bottom-0 left-0 right-0 h-[100vh]"
        sx={{
          background: `linear-gradient(to top, #${dominantColor}, transparent)`,
        }}
        display={"flex"}
        alignItems={"flex-end"}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1} p={4}>
              <Genre
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
              >
                {data.overview}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack pt={4} mb={4}>
              <Stack>
                <Typography
                  color={isDominantColorDark ? "white" : "custom.dark"}
                  variant="h6"
                  fontWeight={"700"}
                  textAlign={"left"}
                >
                  Posters
                </Typography>
                {dataImages ? <Images images={dataImages.backdrops} /> : ""}
              </Stack>
              <Stack mt={4}>
                <Typography
                  color={isDominantColorDark ? "white" : "custom.dark"}
                  variant="h6"
                  fontWeight={"700"}
                  textAlign={"left"}
                >
                  Actors
                </Typography>
                {dataCredits ? (
                  <Box>
                    <Grid container spacing={2}>
                      {dataCredits.cast
                        .slice(0, 5)
                        .map((item: any, key: number) => (
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
                      {dataCredits.cast.length > 5 ? (
                        <Grid item>
                          <Tooltip title={"More"}>
                            <Box
                              width={50}
                              height={50}
                              className="rounded-full"
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              sx={{
                                backgroundColor: !isDominantColorDark
                                  ? "white"
                                  : "custom.dark",
                              }}
                            >
                              <Typography
                                color={
                                  isDominantColorDark ? "white" : "custom.dark"
                                }
                              >
                                More
                              </Typography>
                            </Box>
                          </Tooltip>
                        </Grid>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Box>
                ) : (
                  ""
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
