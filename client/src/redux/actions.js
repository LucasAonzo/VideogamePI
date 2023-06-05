import axios from "axios";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const GET_GENRES = "GET_GENRES";
export const GET_GENRES_FILTERED = "GET_GENRES_FILTERED";
export const GET_GAMES_ORDER_RATING = "GET_GAMES_ORDER_RATING";
export const GET_GAMES_ORDER_ALPHABETIC = "GET_GAMES_ORDER_ALPHABETIC";
export const GET_GAMES_FROM_API_OR_DB = "GET_GAMES_FROM_API_OR_DB";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const FETCHED_ERRORS = "FETCHED_ERRORS";
export const GAME_POST = "GAME_POST";

// action traer todos los juegos
export const getAllGames = () => {
  try {
    return async (dispatch) => {
      const response = await axios.get("http://localhost:3001/videogames");
      const data = response.data;
      return dispatch({ type: GET_ALL_GAMES, payload: data });
    };
  } catch (error) {
    console.log(error);
  }
};

// action traer juegos por nombres
export const getGameByName = (name) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    const data = response.data;
    return dispatch({ type: GET_GAME_BY_NAME, payload: data });
  } catch (error) {
    dispatch({ type: FETCHED_ERRORS, payload: error.response.data.error });
  }
};

// action traer juegos por id
export const getGameById = (idVideogame) => {
  try {
    return async (dispatch) => {
      const response = await axios.get(
        `http://localhost:3001/videogames/${idVideogame}`
      );
      const data = response.data;
      return dispatch({ type: GET_GAME_BY_ID, payload: data });
    };
  } catch (error) {
    console.log(error);
  }
};

// action traer los generos
export const getGenres = () => {
  try {
    return async (dispatch) => {
      const response = await axios.get("http://localhost:3001/genres");
      const data = response.data;
      return dispatch({ type: GET_GENRES, payload: data });
    };
  } catch (error) {
    console.log(error);
  }
};

export const postGame = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogames",
        payload
      );
      return dispatch({ type: GAME_POST, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

// action traer generos filtrados
export const getGenresFiltered = (genre) => {
  return { type: GET_GENRES_FILTERED, payload: genre };
};

// cation ordenar por rating
export const getGamesOrderRating = (value) => {
  return { type: GET_GAMES_ORDER_RATING, payload: value };
};

// action ordenar alfabeticamente
export const getGamesOrderAlphabetic = (value) => {
  return { type: GET_GAMES_ORDER_ALPHABETIC, payload: value };
};

// action filtrar por origen de api o db
export const getGamesFromApiOrDb = (value) => {
  return { type: GET_GAMES_FROM_API_OR_DB, payload: value };
};

// action para filtrar todas las plataformas
export const getPlatforms = () => {
  return { type: GET_PLATFORMS };
};
