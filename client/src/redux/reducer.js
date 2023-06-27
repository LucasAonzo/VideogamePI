import {
  GET_ALL_GAMES,
  GET_GAMES_ORDER_ALPHABETIC,
  GET_GAMES_ORDER_RATING,
  GET_GAME_BY_ID,
  CLEAR_GAME_BY_ID,
  GET_GAME_BY_NAME,
  GET_GENRES,
  GET_GENRES_FILTERED,
  GET_GAMES_FROM_API_OR_DB,
  GAME_POST,
} from "./actions";

const initialState = {
  allGames: [],
  allUnfilteredGames: [],
  allDbGames: [],
  allApiGames: [],
  lastGenreFilter: null,
  allGamesToFilter: [],
  allGamesGenres: [],
  gameDetail: [],
  genres: [],
  ApiOrDb: "",
  gamesLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Traer todos los juegos
    case GET_ALL_GAMES:
      return {
        ...state,
        allGames: action.payload,
        allUnfilteredGames: action.payload,
        allGamesToFilter: action.payload,
        allGamesGenres: action.payload,
        gamesLoaded: true,
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
    //Limpiar el estado del juego especifico
    case CLEAR_GAME_BY_ID:
      return {
        ...state,
        gameDetail: [],
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
        // Busca el genero seleccionado
        (genre) => genre.id === selectedGenreId
      );

      let gamesToFilter = [];

      if (state.ApiOrDb === "DB") {
        gamesToFilter = [...state.allDbGames];
      } else if (state.ApiOrDb === "API") {
        gamesToFilter = [...state.allApiGames];
      } else {
        gamesToFilter = [...state.allUnfilteredGames];
      }

      const filteredGames = selectedGenreId
        ? gamesToFilter.filter((game) =>
            game.genres.includes(selectedGenre.name)
          )
        : gamesToFilter;

      return {
        ...state,
        allGames: filteredGames,
        lastGenreFilter: selectedGenre,
      };

    // Crear un juego
    case GAME_POST:
      return {
        ...state,
      };

    // Ordenar por rating
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
      if (action.payload === "DB") {
        const dbGames = state.allUnfilteredGames.filter(
          (game) => isNaN(game.id) // usamos isNaN para saber si no es un numero (id UUID)
        );
        let filteredGames = dbGames; // si no hay filtro de genero, se muestran todos los juegos
        if (state.lastGenreFilter) {
          // si hay filtro de genero, se muestran los juegos que incluyan ese genero
          filteredGames = dbGames.filter((game) =>
            game.genres.includes(state.lastGenreFilter.name)
          );
        }
        return {
          ...state,
          ApiOrDb: "DB",
          allGames: filteredGames,
          allDbGames: dbGames,
        };
      } else if (action.payload === "API") {
        const apiGames = state.allUnfilteredGames.filter(
          (game) => !isNaN(game.id) // usamos isNaN para saber si es un numero
        );
        let filteredGames = apiGames;
        if (state.lastGenreFilter) {
          filteredGames = apiGames.filter((game) =>
            game.genres.includes(state.lastGenreFilter.name)
          );
        }
        return {
          ...state,
          ApiOrDb: "API",
          allGames: filteredGames,
          allApiGames: apiGames,
        };
      } else {
        let filteredGames = [...state.allUnfilteredGames];
        if (state.lastGenreFilter) {
          filteredGames = state.allUnfilteredGames.filter((game) =>
            game.genres.includes(state.lastGenreFilter.name)
          );
        }
        return {
          ...state,
          ApiOrDb: "",
          allGames: filteredGames,
        };
      }

    // Llenar el estado global de plataformas

    default:
      return { ...state };
  }
};

export default reducer;
