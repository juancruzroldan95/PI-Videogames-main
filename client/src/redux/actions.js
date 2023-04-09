import { GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL } from "./types";
import axios from 'axios';

export const getVideogames = () => {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/videogames');
    const videogames = response.data;
    dispatch({ type: GET_VIDEOGAMES, payload: videogames });
  };
};

export const getVideogameDetail = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    const videogameDetail = response.data;
    dispatch({ type: GET_VIDEOGAME_DETAIL, payload: videogameDetail });
  };
};