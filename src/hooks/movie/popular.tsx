import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../api/tmdb";

export function usePopularMovie(params: any) {
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [`movie-popular-page-1`],
    queryFn: () => getPopularMovies(params),
  });

  return { data, isLoading, isFetched };
}
