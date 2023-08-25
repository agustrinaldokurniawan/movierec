import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb";
import { ICreditsHooks } from "../interfaces/ICreditsHooks";

export function useCreditsMovie(movie_id: string | number) {
  const { data, isLoading } = useQuery<ICreditsHooks>({
    queryKey: ["movie-credits-" + movie_id],
    queryFn: () => getMovieCredits(movie_id),
  });

  return { data, isLoading };
}
