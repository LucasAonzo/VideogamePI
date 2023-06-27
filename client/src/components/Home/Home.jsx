import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getGenres, getGenresFiltered } from "../../redux/actions";
import Card from "../Card/Card";
import SearchBar from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";
import Loading from "../Loading/Loading";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const genres = useSelector((state) => state.genres);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  // Calcular los índices del primer y último juego en la página actual
  const indexOfLastGame = currentPage * gamesPerPage; // 15 * 1 = 15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  // Obtener los juegos que se mostrarán en la página actual
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame); //con el slice saco una parte del array y lo guardo en un nuevo array
  const selectedGenre = useSelector((state) => state.selectedGenre);
  const gamesLoaded = useSelector((state) => state.gamesLoaded);

  // Función para cambiar de página
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Si los juegos ya han sido cargados, no hacemos nada
    if (gamesLoaded) {
      return;
    }
    // Si hay un filtro de género seleccionado, cargamos los juegos filtrados
    if (selectedGenre) {
      dispatch(getGenresFiltered(selectedGenre));
    }
    // Si no, cargamos todos los juegos
    else {
      dispatch(getAllGames());
    }
    dispatch(getGenres());
  }, [gamesLoaded, selectedGenre, dispatch]);

  if (!gamesLoaded || !genres.length) {
    return <Loading />;
  } //vemos si los juegos estan cargados y si no, mostramos el componente de loading hasta que se carguen

  return (
    <div className={style.container}>
      <SearchBar />
      <Filter />
      <div className={style.cardsContainer}>
        {currentGames.map((game, index) => (
          <div className={style.cards} key={index}>
            <Card
              id={game.id}
              name={game.name}
              image={game.image}
              genres={game.genres}
              rating={game.rating}
            />
          </div>
        ))}
      </div>
      <div className={style.containerButtons}>
        <Pagination
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Home;
