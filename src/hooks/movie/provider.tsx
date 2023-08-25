import { useQuery } from "@tanstack/react-query";
import { getMovieProviders } from "../../api/tmdb";
import { IProvidersHooks } from "../interfaces/IProvidersHooks";

export function useProvidersMovie(movie_id: string | number) {
  const { data, isLoading } = useQuery<IProvidersHooks>({
    queryKey: ["movie-providers-" + movie_id],
    queryFn: () => getMovieProviders(movie_id),
  });

  return { data, isLoading };
}
