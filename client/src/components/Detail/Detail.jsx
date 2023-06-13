import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { getGameById, clearGameById } from "../../redux/actions";
import Loading from "../Loading/Loading";

export default function Detail() {
  const { idVideogame } = useParams();
  const dispatch = useDispatch();
  const gameDetail = useSelector((state) => state.gameDetail);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getGameById(idVideogame))
      .then(() => {
        setIsLoading(false); // Establece isLoading en false cuando la carga ha finalizado
      })
      .catch((error) => {
        console.log("Error al cargar el juego:", error);
        setIsLoading(false); // En caso de error, también establece isLoading en false
      });

    return () => {
      dispatch(clearGameById());
    };
  }, [dispatch, idVideogame]);

  const renderGenres = () => {
    if (gameDetail.genres?.length === 2) {
      return gameDetail.genres.map((genre, index) => (
        <h4 key={index} className={style.dupliGenre}>
          {genre.name}
        </h4>
      ));
    } else if (gameDetail.genres?.length === 1) {
      return <h4 className={style.uniqueGenre}>{gameDetail.genres[0].name}</h4>;
    } else {
      return gameDetail.genres?.map((genre, index) => (
        <h4 key={index} className={style.genre}>
          {genre.name}
        </h4>
      ));
    }
  };

  console.log(gameDetail);
  const renderPlatforms = (platforms) => {
    if (platforms) {
      const platformArray = platforms.toString().split(","); // Convertir a cadena y luego dividir
      return platformArray.map((platform, index) => (
        <span className={style.detail__platform} key={index}>
          {platform}
        </span>
      ));
    }
    return null;
  };

  return (
    <div className={style.container}>
      <div className={style.buttonContainer}>
        <Link to="/videogames">
          <button className={style.homeButton}>Return to Video Games</button>
        </Link>
      </div>
      {isLoading ? (
        <Loading /> // Muestra el componente de carga mientras isLoading es true
      ) : gameDetail ? (
        <div className={style.gridContainer}>
          <h2 className={style.name}>{gameDetail.name}</h2>
          <div className={style.imageContainer}>
            <img
              className={style.image}
              src={gameDetail.image}
              alt={gameDetail.name}
            />
          </div>
          <div>
            <h2 className={style.title}>Rating:</h2>
            <span className={style.rating}>{gameDetail.rating}</span>
          </div>
          <div className={style.genreGrid}>
            <h2 className={style.genreTitle}>Genres:</h2>
            {renderGenres()}
          </div>
          <div>
            <h2 className={style.release}>Released:</h2>
            <span className={style.released}>{gameDetail.released}</span>
          </div>
          <div className={style.platformGrid}>
            <h2 className={style.platformTitle}>Platforms:</h2>
            {renderPlatforms(gameDetail.platforms)}
          </div>
          <div className={style.description}>
            <h2 className={style.descriptionTitle}>Description:</h2>
            <h4
              className={style.descriptionText}
              dangerouslySetInnerHTML={{ __html: gameDetail.description }}
            ></h4>
          </div>
        </div>
      ) : (
        <h1>Error al cargar el juego.</h1>
      )}
    </div>
  );
}
