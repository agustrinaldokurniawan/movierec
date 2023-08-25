"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
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
import PreviewCredits from "./Credits";
import PreviewGenre from "./Genre";
import { useProvidersMovie } from "../../hooks/movie/provider";
import PreviewProviders from "./VodProviders";
import { IProvider } from "../../common/interfaces/IProvider";

export default function Preview(props: IPreview) {
  const colorThief = new ColorThief();

  const [isDesktop, setIsDesktop] = useState(true);
  const [dominantColor, setDominantColor] = useState<string>();
  const [isDominantColorDark, setIsDominantColorDark] =
    useState<boolean>(false);
  const [vodProviders, setVodProviders] = useState<IProvider[]>([]);
  const region = "US";

  const { data, isLoading } = useDetailMovie(props.id);
  const { data: dataImages, isLoading: isLoadingImages } = useImagesMovie(
    props.id
  );
  const { data: dataCredits, isLoading: isLoadingCredits } = useCreditsMovie(
    props.id
  );
  const { data: dataProviders, isLoading: isLoadingProviders } =
    useProvidersMovie(props.id);

  function onChangeResize() {
    setIsDesktop(window.innerWidth > 768);
  }

  useEffect(() => {
    if (dataProviders && dataProviders.results[region]) {
      setVodProviders(dataProviders.results[region].flatrate);
    }
  }, [dataProviders]);

  useEffect(() => {
    window.addEventListener("resize", onChangeResize);
    return () => {
      window.removeEventListener("resize", onChangeResize);
    };
  }, []);

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

  if (!data) {
    return (
      <>
        <p>Data Error</p>
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
        <Grid container spacing={2} alignItems={"flex-end"}>
          <Grid
            item
            xs={12}
            md={6}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
          >
            <Stack spacing={1} p={4}>
              <PreviewGenre
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
                <Images images={dataImages?.backdrops} />
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
                <PreviewCredits
                  cast={dataCredits?.cast}
                  isDominantColorDark={isDominantColorDark}
                />
              </Stack>
              <Stack mt={4}>
                <Typography
                  color={isDominantColorDark ? "white" : "custom.dark"}
                  variant="h6"
                  fontWeight={"700"}
                  textAlign={"left"}
                >
                  VoD
                </Typography>
                <PreviewProviders
                  providers={vodProviders}
                  isDominantColorDark={isDominantColorDark}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
