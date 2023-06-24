import { getGameByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import style from "./Search.module.css";

export default function SearchBar() {
  const [game, setGame] = useState("");
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    setGame(event.target.value);
  };

  const searchGame = () => {
    if (!game) {
      alert("Please enter a game name");
      return;
    }
    dispatch(getGameByName(game)).catch((error) => {
      window.alert("Game not found, please try again");
      setGame("");
    });
  };

  return (
    <div className={style.container}>
      <input
        autoComplete="off"
        className={style.input}
        onChange={onChangeHandler}
        type="search"
        placeholder="Name"
        name="name"
        value={game}
      />
      <button className={style.buttons} onClick={searchGame}>
        Search
      </button>
    </div>
  );
}
