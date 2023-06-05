import {
  GET_ALL_GAMES,
  GET_GAMES_ORDER_ALPHABETIC,
  GET_GAMES_ORDER_RATING,
  GET_GAME_BY_ID,
  GET_GAME_BY_NAME,
  GET_GENRES,
  GET_GENRES_FILTERED,
  GET_GAMES_FROM_API_OR_DB,
  GAME_POST,
} from "./actions";

const initialState = {
  allGames: [],
  allGamesToFilter: [],
  gameDetail: [],
  genres: [],
  ApiOrDb: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Traer todos los juegos
    case GET_ALL_GAMES:
      return {
        ...state,
        allGames: action.payload,
        allGamesToFilter: action.payload,
      };
    //Traer el juego que se busca
    case GET_GAME_BY_NAME:
      return {
        ...state,
        allGames: action.payload,
        allGamesToFilter: action.payload,
      };
    //Traer un juego especifico (detailCard)
    case GET_GAME_BY_ID:
      return {
        ...state,
        gameDetail: action.payload,
      };
    // Traer todos los generos
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    // Filtrar segun el genero
    case GET_GENRES_FILTERED:
      const selectedGenreId = action.payload;
      const selectedGenre = state.genres.find(
        (genre) => genre.id === selectedGenreId
      );
      return {
        ...state,
        allGames:
          state.ApiOrDb === ""
            ? state.allGamesToFilter.filter((game) =>
                game.genres.includes(selectedGenre.name)
              )
            : state.ApiOrDb === "API"
            ? state.allGamesToFilter.filter(
                (game) =>
                  !isNaN(game.id) && game.genres.includes(selectedGenre.name)
              )
            : state.allGamesToFilter.filter(
                (game) =>
                  isNaN(game.id) && game.genres.includes(selectedGenre.name)
              ),
      };

    // Ordenar por rating

    case GAME_POST:
      return {
        ...state,
      };
    case GET_GAMES_ORDER_RATING:
      if (action.payload === "Ascendente") {
        return {
          ...state,
          allGames: [...state.allGames.sort((a, b) => a.rating - b.rating)],
        };
      } else {
        return {
          ...state,
          allGames: [...state.allGames.sort((a, b) => b.rating - a.rating)],
        };
      }
    // Ordenar alfabeticamente
    case GET_GAMES_ORDER_ALPHABETIC:
      if (action.payload === "Ascendente") {
        return {
          ...state,
          allGames: [
            ...state.allGames.sort((a, b) => a.name.localeCompare(b.name)),
          ],
        };
      } else {
        return {
          ...state,
          allGames: [
            ...state.allGames.sort((a, b) => b.name.localeCompare(a.name)),
          ],
        };
      }
    // Filtrar juegos por si es de la API o la DB
    case GET_GAMES_FROM_API_OR_DB:
      if (action.payload === "API") {
        return {
          ...state,
          ApiOrDb: "API",
          allGames: [
            ...state.allGamesToFilter.filter((game) => !isNaN(game.id)),
          ],
        };
      } else if (action.payload === "DB") {
        return {
          ...state,
          ApiOrDb: "DB",
          allGames: [
            ...state.allGamesToFilter.filter((game) => isNaN(game.id)),
          ],
        };
      } else {
        return {
          ...state,
          ApiOrDb: "",
          allGames: [...state.allGamesToFilter],
        };
      }

    // Llenar el estado global de plataformas

    default:
      return { ...state };
  }
};

export default reducer;
