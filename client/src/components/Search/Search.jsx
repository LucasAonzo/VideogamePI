import { getGameByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Search.module.css";

export default function SearchBar() {
  const [game, setGame] = useState("");
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    setGame(event.target.value);
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      dispatch(getGameByName(game));
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [game, dispatch]);

  const searchGame = () => {
    dispatch(getGameByName(game));
    setGame("");
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
