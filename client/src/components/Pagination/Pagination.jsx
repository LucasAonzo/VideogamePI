import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ gamesPerPage, allGames, paginado, currentPage }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  const handlePageChange = (pageNumber) => {
    paginado(pageNumber);
    window.scrollTo(0, 0); // Scroll al inicio de la ventana
  };

  return (
    <nav className={style.container}>
      <ul className={style.containerButtons}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? style.current : style.buttons}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
