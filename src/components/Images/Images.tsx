"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Box } from "@mui/material";
import { IImages } from "./IImages";
import Image from "next/image";
import { tmdbImageLoader } from "../../utils/tmdb-image-loader";

export default function Images(props: IImages) {
  return (
    <Swiper
      direction={"horizontal"}
      slidesPerView={3.5}
      spaceBetween={30}
      nested={true}
      className="w-[100%] h-[100px]"
    >
      {props.images.map((item: any, key: number) => (
        <SwiperSlide key={key}>
          <Image
            loader={tmdbImageLoader}
            src={item.file_path}
            alt={"TMDB"}
            fill
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
