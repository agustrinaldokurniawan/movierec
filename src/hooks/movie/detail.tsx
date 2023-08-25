import { useQuery } from "@tanstack/react-query";
import { getDetailMovies } from "../../api/tmdb";
import { IDetailHooks } from "../interfaces/IDetailHooks";

export function useDetailMovie(movie_id: string | number) {
  const { data, isLoading } = useQuery<IDetailHooks>({
    queryKey: ["movie-" + movie_id],
    queryFn: () => getDetailMovies(movie_id),
  });

  return { data, isLoading };
}
