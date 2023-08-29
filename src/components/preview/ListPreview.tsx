import { IPreviewList } from "./interfaces/IPreviewList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel, Navigation } from "swiper/modules";
import { Box } from "@mui/material";
import ItemPreview from "./ItemPreview";

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
      {props.ids.map((item: string) => (
        <SwiperSlide key={item}>
          <Box width={"100vw"} height={"100vh"}>
            <ItemPreview id={item} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
