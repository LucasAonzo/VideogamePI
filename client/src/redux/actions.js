import axios from "axios";
export const GET_GAMES = "GET_GAMES";

export const getGames = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get("http://localhost:3001/videogames");
      dispatch({ type: GET_GAMES, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};
