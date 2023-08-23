"use client";

import { useState, useEffect } from "react";
import { getPopularMovies } from "@/api/tmdb";
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import ListPreview from "../components/preview/List";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel, Navigation } from "swiper/modules";

export default function Home() {
  const [ids, setIds] = useState<string[]>([]);

  const params = {
    include_adult: false,
    include_video: true,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc",
  };

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [`movie-popular-page-1`],
    queryFn: () => getPopularMovies(params),
  });

  useEffect(() => {
    if (isFetched) {
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
          className="mySwiper"
        >
          <SwiperSlide>
            <Box width={"100vw"} height={"100vh"}>
              {ids.length ? <ListPreview ids={ids} /> : ""}
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box width={"100vw"} height={"100vh"}>
              <p>Test</p>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Layout>
  );
}
