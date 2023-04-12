import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_GENRES, GET_VIDEOGAMES_BY_NAME, SORT_VIDEOGAMES_BY, SET_ORIGIN_FILTER, SET_GENRE_FILTER } from "./types";
import axios from 'axios';

export const getAllVideogames = () => {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/videogames');
    const videogames = response.data;
    dispatch({ type: GET_ALL_VIDEOGAMES, payload: videogames });
  };
};

export const getVideogameDetail = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    const videogameDetail = response.data;
    dispatch({ type: GET_VIDEOGAME_DETAIL, payload: videogameDetail });
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/genres');
    const genres = response.data;
    dispatch({ type: GET_GENRES, payload: genres });
  };
};

export const getVideogamesByName = (name) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    const searchedVideogames = response.data;
    dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: searchedVideogames })
  };
};

export const sortVideogamesBy = (sortType) => {
  return {
    type: SORT_VIDEOGAMES_BY,
    payload: sortType
  };
};

export const setOriginFilter = (originStr) => {
  return {
    type: SET_ORIGIN_FILTER,
    payload: originStr
  };
};

export const setGenreFilter = (selectedGenres) => {
  return {
    type: SET_GENRE_FILTER,
    payload: selectedGenres
  };
};