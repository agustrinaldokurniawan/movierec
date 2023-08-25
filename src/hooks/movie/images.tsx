import { useQuery } from "@tanstack/react-query";
import { getImages } from "../../api/tmdb";
import { IImagesHooks } from "../interfaces/IImagesHooks";

export function useImagesMovie(movie_id: string | number) {
  const { data, isLoading } = useQuery<IImagesHooks>({
    queryKey: ["movie-images-" + movie_id],
    queryFn: () => getImages(movie_id),
  });

  return { data, isLoading };
}
