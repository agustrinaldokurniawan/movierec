import { useQuery } from "@tanstack/react-query";
import { getDetailMovies } from "../../api/tmdb";

export function useDetailMovie(movie_id: string | number) {
  const { data, isLoading } = useQuery({
    queryKey: ["movie-" + movie_id],
    queryFn: () => getDetailMovies(movie_id),
  });

  return { data, isLoading };
}
