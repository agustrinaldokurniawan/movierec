import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../api/tmdb";
import { IPopularHooks } from "../interfaces/IPopularHooks";

export function usePopularMovie(params: any) {
  const { data, isLoading, isFetched } = useQuery<IPopularHooks>({
    queryKey: [`movie-popular-page-1`],
    queryFn: () => getPopularMovies(params),
  });

  return { data, isLoading, isFetched };
}
