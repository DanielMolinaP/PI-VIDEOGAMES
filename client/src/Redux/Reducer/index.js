// Importa las action types acá
import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_GENERES,
  GET_ALL_PLATFORMS,
  GET_BY_NAME,
  FILTER_BY_CREATED,
  FILTER_BY_GENRES,
  FILTER_BY_PLATFORMS,
  FILTER_BY_SORT_NAME,
  ORDER_BY_RATING,
  VIDEOGAME_DETAIL,
  CREATE_VIDEOGAME,
  ADD_FAVORITES,
  GET_ALL_VIDEOGAMESFAVS,
  DELETE_FAV_VIDEOGAME,
} from "../Acctions/index";

const initialState = {
  videogamesRender: [],
  allVideogames: [],
  genres: [],
  platforms: [],
  detail: [],
  favorites: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogamesRender: action.payload,
        allVideogames: action.payload,
      };
    case GET_ALL_VIDEOGAMESFAVS:
      return {
        ...state,
        favorites: action.payload,
      };
    case GET_ALL_GENERES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_ALL_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        videogamesRender: action.payload,
      };
    case VIDEOGAME_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case ADD_FAVORITES:
      return {
        ...state,
      };
    case FILTER_BY_CREATED:
      const allVideogames1 = state.allVideogames;
      const createdFilter =
        action.payload === "Created"
          ? allVideogames1.filter((e) => e.createdAtDb)
          : allVideogames1.filter((e) => !e.createdAtDb);
      return {
        ...state,
        videogamesRender:
          action.payload === "All" ? allVideogames1 : createdFilter,
      };
    case FILTER_BY_GENRES:
      const allGames = state.allVideogames;
      const gamesAPI = allGames.filter((e) => !e.createdAtDb);
      const gameApiIncludes = gamesAPI.filter((el) =>
        el.genre.includes(action.payload)
      );
      const videogameDb = allGames.filter((e) => e.createdAtDb);
      const gamesDB = videogameDb.filter((el) => {
        for (let i = 0; i < el.genres.length; i++) {
          if (el.genres[i].name === action.payload) {
            return el;
          }
        }
      });
      const allOfIt = gameApiIncludes.concat(gamesDB);
      return {
        ...state,
        videogamesRender: action.payload === "All" ? allGames : allOfIt,
      };
    case FILTER_BY_PLATFORMS:
      const allGames1 = state.allVideogames;
      const gamesAPI1 = allGames1.filter((e) => !e.createdAtDb);
      const gameApiIncludes1 = gamesAPI1.filter((el) =>
        el.platform.includes(action.payload)
      );
      const videogameDb1 = allGames1.filter((e) => e.createdAtDb);
      const gamesDB1 = videogameDb1.filter((el) => {
        for (let i = 0; i < el.platforms.length; i++) {
          if (el.platforms[i].name === action.payload) {
            return el;
          }
        }
      });
      const allOfIt1 = gameApiIncludes1.concat(gamesDB1);
      return {
        ...state,
        videogamesRender: action.payload === "All" ? allGames1 : allOfIt1,
      };
    case FILTER_BY_SORT_NAME:
      const prueba2 = state.allVideogames;
      const orderName =
        action.payload === "Asc"
          ? prueba2.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : prueba2.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogamesRender: orderName,
      };
    case ORDER_BY_RATING:
      const videogamesRating = state.allVideogames;
      let sorted =
        action.payload === "Lower"
          ? videogamesRating.sort((el1, el2) => {
              if (el1.rating > el2.rating) {
                return 1;
              }
              if (el1.rating < el2.rating) {
                return -1;
              }
              return 0;
            })
          : videogamesRating.sort((el1, el2) => {
              if (el1.rating > el2.rating) {
                return -1;
              }
              if (el1.rating < el2.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogamesRender: sorted,
      };
    case CREATE_VIDEOGAME:
      return {
        ...state,
      };
    case DELETE_FAV_VIDEOGAME:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;
