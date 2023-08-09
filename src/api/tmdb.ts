import { key } from "@/config/key";
import { url } from "@/config/url";
import axios from "axios";

export const getPopularMovies = (params: object) => {
  return axios
    .get(`${url.tmdb}/discover/movie`, {
      params,
      headers: {
        Authorization: `Bearer ${key.tmdb.access_token}`,
      },
    })
    .then((res) => res.data);
};
