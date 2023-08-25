"use client";

import { useState, useEffect } from "react";
import { getPopularMovies } from "@/api/tmdb";
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel, Navigation } from "swiper/modules";
import { usePopularMovie } from "../hooks/movie/popular";
import { paramsPopular } from "../base/movie/param-popular";
import PreviewList from "../components/preview/List";

export default function Home() {
  const [ids, setIds] = useState<string[]>([]);

  const params = paramsPopular;
  const { data, isLoading, isFetched } = usePopularMovie(params);

  useEffect(() => {
    if (isFetched && data) {
      setIds(data.results.map((item: any) => item.id));
    }
  }, [isFetched]);

  return (
    <Layout>
      <Box height={"100vh"}>
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          mousewheel={{
            forceToAxis: true,
          }}
          navigation={true}
          modules={[Mousewheel, Navigation]}
          className="h-[100vh]"
        >
          <SwiperSlide>
            <Box width={"100vw"} height={"100vh"}>
              {ids.length ? <PreviewList ids={ids} /> : ""}
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <p>Test2</p>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Layout>
  );
}
