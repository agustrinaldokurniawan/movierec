import { key } from "@/config/key";
import { url } from "@/config/url";
import axios, { AxiosResponse } from "axios";

export const getPopularMovies = (params: object) => {
  return axios
    .get(`${url.tmdb}/discover/movie`, {
      params,
      headers: {
        Authorization: `Bearer ${key.tmdb.access_token}`,
      },
    })
    .then((res: AxiosResponse) => res.data);
};

export const getDetailMovies = (movie_id: string) => {
  return axios
    .get(`${url.tmdb}/movie/${movie_id}`, {
      headers: {
        Authorization: `Bearer ${key.tmdb.access_token}`,
      },
    })
    .then((res: AxiosResponse) => res.data);
};

export const getImages = (movie_id: string) => {
  return axios
    .get(`${url.tmdb}/movie/${movie_id}/images`, {
      headers: {
        Authorization: `Bearer ${key.tmdb.access_token}`,
      },
    })
    .then((res: AxiosResponse) => res.data);
};
