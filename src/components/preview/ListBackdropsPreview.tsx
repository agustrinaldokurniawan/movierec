import { Box, Stack, Typography } from "@mui/material";
import { useImagesMovie } from "../../hooks/movie/images";
import { IBackdropsPreview } from "./interfaces/IBackdropPreview";
import { Swiper, SwiperSlide } from "swiper/react";
import { IImage } from "../../common/interfaces/IImage";
import { tmdbImageLoader } from "../../utils/tmdb-image-loader";
import AppImage from "../AppImage/AppImage";
import i18n from "../../localization/i18n";

export default function ListBackdropPreview(props: IBackdropsPreview) {
  const { data, isLoading: isLoadingImages } = useImagesMovie(props.movie_id);

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
          {i18n.t("scene")}
        </Typography>
        <Swiper
          direction={"horizontal"}
          slidesPerView={3.5}
          spaceBetween={30}
          nested={true}
          className="w-[50vw] h-[100px]"
        >
          {data.backdrops.map((item: IImage, key: number) => (
            <SwiperSlide key={key}>
              <Box width={"100%"} height={"100%"} className="relative">
                <AppImage
                  loader={tmdbImageLoader}
                  src={item.file_path}
                  alt={"TMDB"}
                  sizes="100%"
                  fill
                  className="object-cover"
                  priority
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    )
  );
}
