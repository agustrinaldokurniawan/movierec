"use client";

import { useRef } from "react";
import Preview from "./Preview";
import { IList } from "./interfaces/IList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel, Autoplay, Navigation } from "swiper/modules";
import { Box } from "@mui/material";

export default function ListPreview(props: IList) {
  return (
    <Swiper
      direction={"horizontal"}
      slidesPerView={1}
      mousewheel={{
        forceToAxis: true,
      }}
      navigation={true}
      modules={[Mousewheel, Navigation]}
    >
      {props.ids.map((item: string, key: number) => (
        <SwiperSlide key={key}>
          <Box bgcolor={"red"} width={"100vw"} height={"100vh"}>
            <Preview id={item} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
