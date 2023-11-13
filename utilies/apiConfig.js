import { BaseURL } from "@env";
export const trendingMovies = `${BaseURL}/trending/movie/day?language=en-US`;

export const upComingMovies = `${BaseURL}/movie/upcoming?language=en-US`;
export const topRatedMovies = `${BaseURL}/tv/top_rated?language=en-US`;
///
export const movieDetails = (id) => `${BaseURL}/movie/${id}?language=en-US`;

export const movieCredential = (id) =>
  `${BaseURL}/movie/${id}/credits?language=en-US`;
export const movieSimilar = (id) =>
  `${BaseURL}/movie/${id}/similar?language=en-US&page=1`;
//
export const person = (id) => `${BaseURL}/person/${id}?language=en-US`;
export const personMovies = (id) =>
  `${BaseURL}/person/${id}/movie_credits?language=en-US`;
///
export const searchApi = (query) =>
  `${BaseURL}/search/movie?query=${query}&include_adult=true&page=1&language=en-US`;
