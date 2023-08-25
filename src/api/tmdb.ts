import { key } from "@/config/key";
import { url } from "@/config/url";
import axios, { AxiosResponse } from "axios";

export const getPopularMovies = async (params: object) => {
  const res = await axios.get(`${url.tmdb}/discover/movie`, {
    params,
    headers: {
      Authorization: `Bearer ${key.tmdb.access_token}`,
    },
  });
  return res.data;
};

export const getDetailMovies = async (movie_id: string | number) => {
  const res = await axios.get(`${url.tmdb}/movie/${movie_id}`, {
    headers: {
      Authorization: `Bearer ${key.tmdb.access_token}`,
    },
  });
  return res.data;
};

export const getImages = async (movie_id: string | number) => {
  const res = await axios.get(`${url.tmdb}/movie/${movie_id}/images`, {
    headers: {
      Authorization: `Bearer ${key.tmdb.access_token}`,
    },
  });
  return res.data;
};

export const getMovieCredits = async (movie_id: string | number) => {
  const res = await axios.get(`${url.tmdb}/movie/${movie_id}/credits`, {
    headers: {
      Authorization: `Bearer ${key.tmdb.access_token}`,
    },
  });
  return res.data;
};

export const getMovieProviders = async (movie_id: string | number) => {
  const res = await axios.get(`${url.tmdb}/movie/${movie_id}/watch/providers`, {
    headers: {
      Authorization: `Bearer ${key.tmdb.access_token}`,
    },
  });
  return res.data;
};
