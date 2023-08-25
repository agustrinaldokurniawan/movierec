import Preview from "./Preview";
import { IPreviewList } from "./interfaces/IPreviewList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel, Navigation } from "swiper/modules";
import { Box } from "@mui/material";

export default function PreviewList(props: IPreviewList) {
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
