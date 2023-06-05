import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getGenres } from "../../redux/actions";
import Card from "../Card/Card";
import SearchBar from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import Navbar from "../Navbar/Navbar";
import Filter from "../Filter/Filter";
import style from "./Home.module.css";

const Home = (props) => {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  console.log(allGames);

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  // Calcular los índices del primer y último juego en la página actual
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  // Obtener los juegos que se mostrarán en la página actual
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  // Función para cambiar de página
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getGenres());
  }, []);

  console.log(allGames.genres);

  return (
    <div>
      <SearchBar />
      <Filter />
      <div className={style.cardsContainer}>
        {currentGames.map((game, index) => {
          return (
            <div className={style.cards} key={index}>
              <Card
                id={game.id}
                name={game.name}
                image={game.image}
                genres={game.genres}
                rating={game.rating}
              />
            </div>
          );
        })}
      </div>
      <div className={style.containerButtons}>
        {/* Renderizar el componente de paginación */}
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
