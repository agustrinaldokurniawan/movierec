"use client";

import { useRef } from "react";
import Preview from "./Preview";
import { IList } from "./interfaces/IList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles/list.css";

import { Mousewheel, Autoplay, Navigation } from "swiper/modules";
import { Box } from "@mui/material";

export default function ListPreview(props: IList) {
  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const onAutoplayTimeLeft = (_: any, time: any, progress: any) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <Box height={"100vh"}>
      <Swiper
        direction={"horizontal"}
        slidesPerView={1}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        mousewheel={{
          forceToAxis: true,
        }}
        navigation={true}
        modules={[Mousewheel, Navigation, Autoplay]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {props.ids.map((item: string, key: number) => (
          <SwiperSlide key={key}>
            <Box bgcolor={"red"} width={"100vw"} height={"100vh"}>
              <Preview id={item} />
            </Box>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </Box>
  );
}
