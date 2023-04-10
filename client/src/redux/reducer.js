import { GET_VIDEOGAMES, GET_GENRES } from './types'

const initialState = {
  videogames: [],
  genres: [],
  platforms: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      };
    default:
      return {...state};
  };
};

export default rootReducer;