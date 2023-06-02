import { GET_GAMES } from "./actions";

const initialState = {
  games: [],
  sortgames: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      const gm = action.payload;
      return {
        ...state,
        games: action.payload,
        sortgames: gm,
      };
    default:
      return state;
  }
}
