import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
        <span key={index} className={style.dupliGenre}>
          {genre.name}
        </span>
      ));
    } else if (gameDetail.genres?.length === 1) {
      return (
        <span className={style.uniqueGenre}>{gameDetail.genres[0].name}</span>
      );
    } else {
      return gameDetail.genres?.map((genre, index) => (
        <span key={index} className={style.genre}>
          {genre.name}
        </span>
      ));
    }
  };

  console.log(gameDetail);
  const renderPlatforms = (platforms) => {
    if (platforms) {
      const platformArray = platforms.toString().split(","); // Convertir a cadena y luego dividir
      return platformArray.map((platform, index) => (
        <span className={style.platform} key={index}>
          {platform}
        </span>
      ));
    }
    return null;
  };

  return (
    <div className={style.container}>
      {isLoading ? (
        <Loading /> // Muestra el componente de carga mientras isLoading es true
      ) : gameDetail ? (
        <div className={style.gridContainer}>
          <h2 className={style.name}>{gameDetail.name}</h2>
          <div className={style.imgandcontent}>
            <div className={style.imageContainer}>
              <img
                className={style.image}
                src={gameDetail.image}
                alt={gameDetail.name}
              />
            </div>
            <div className={style.components}>
              <div className={style.ratingContainer}>
                <h2 className={style.title}>Rating:</h2>
                <span className={style.rating}>⭐{gameDetail.rating}</span>
              </div>

              <div className={style.releasedContainer}>
                <h2 className={style.title}>Released:</h2>
                <span className={style.released}>{gameDetail.released}</span>
              </div>
              <div className={style.genresContainer}>
                <h2 className={style.title}>Genres:</h2>
                <div className={style.genresList}>{renderGenres()}</div>
              </div>
              <div className={style.plataformsContainer}>
                <h2 className={style.title}>Platforms:</h2>
                <div className={style.plataformsList}>
                  {renderPlatforms(gameDetail.platforms)}
                </div>
              </div>
            </div>
          </div>
          <div className={style.descriptionContainer}>
            <h2 className={style.descriptionTitle}>Description:</h2>
            <p
              className={style.descriptionText}
              dangerouslySetInnerHTML={{ __html: gameDetail.description }}
            ></p>
          </div>
        </div>
      ) : (
        <h1>Error al cargar el juego.</h1>
      )}
    </div>
  );
}
