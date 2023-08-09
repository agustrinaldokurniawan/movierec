"use client";

import { getPopularMovies } from "@/api/tmdb";
import Layout from "@/components/layout/Layout";
import Preview from "@/components/preview/Preview";
import { IPreview } from "@/components/preview/interfaces/IPreview";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
  const params = {
    include_adult: false,
    include_video: true,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc",
  };

  const { data, isLoading } = useQuery({
    queryKey: [`movie-popular-page-1`],
    queryFn: () => getPopularMovies(params),
  });

  const singleMovie: IPreview = data && data?.results[0];

  return <Layout>{singleMovie && <Preview {...singleMovie} />}</Layout>;
}
