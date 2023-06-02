import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Card.module.css";

const Card = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/videogames")
      .then((response) => setGames(response.data.games))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={style.container}>
      {games.map((game) => (
        <div className={style.card} key={game.id}>
          <h2 className={style.card__title}>{game.name}</h2>
          <p className={style.card__released}>Released: {game.released}</p>
          <p className={style.card__rating}>Rating: {game.rating}</p>
          <p className={style.card__genres}>Genres: {game.genres.join(", ")}</p>
          <p className={style.card__platforms}>
            Platforms: {game.platforms.join(", ")}
          </p>
          {game.background_image && (
            <img
              className={style.card__image}
              src={game.background_image}
              alt={game.name}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Card;
