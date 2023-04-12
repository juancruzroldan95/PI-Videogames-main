import { GET_ALL_VIDEOGAMES, GET_GENRES, GET_VIDEOGAMES_BY_NAME, SORT_VIDEOGAMES_BY, SET_ORIGIN_FILTER, SET_GENRE_FILTER } from './types'

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  platforms: [],
  genreFilter: [],
  originFilter: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        videogames: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload
      };
    case SORT_VIDEOGAMES_BY:
      switch(action.payload) {
        case ('nameAsc'):
          return {
            ...state,
            videogames: state.videogames.sort((a, b) => (a.name > b.name) ? 1 : -1)
          };
        case ('nameDesc'):
          return {
            ...state,
            videogames: state.videogames.sort((a, b) => (a.name < b.name) ? 1 : -1)
          };
        case ('ratingDesc'):
          return {
            ...state,
            videogames: state.videogames.sort((a, b) => (a.rating > b.rating) ? 1 : -1)
          };
        case ('ratingAsc'):
          return {
            ...state,
            videogames: state.videogames.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
          };
        default:
          return { ...state }
      };
      case SET_ORIGIN_FILTER:
        switch(action.payload) {
          case ('api'):
            return {
              ...state,
              originFilter: action.payload,
              videogames: state.allVideogames.filter((videogame) => videogame.created === false)
            };
          case ('database'):
            return {
              ...state,
              originFilter: action.payload,
              videogames: state.allVideogames.filter((videogame) => videogame.created === true)
            };
          case ('both'):
            return {
              ...state,
              originFilter: action.payload,
              videogames: state.allVideogames.filter((videogame) => videogame.created === false || videogame.created === true)
            };
          default:
            return {...state};
        }

      case SET_GENRE_FILTER:
        const filteredVideogames = state.allVideogames.filter((videogame) =>
          videogame.genres.some((genre) => action.payload.includes(genre.name))
        );
        return {
          ...state,
          genreFilter: action.payload,
          videogames: filteredVideogames
        };
    default:
      return {...state};
  };
};

export default rootReducer;