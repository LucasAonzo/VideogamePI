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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <nav className={style.container}>
      <ul className={style.containerButtons}>
        <button
          disabled={currentPage === 1}
          className={style.buttons}
          onClick={handlePreviousPage}
        >
          &lt; Anterior
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? style.current : style.buttons}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          disabled={currentPage === pageNumbers.length}
          className={style.buttons}
          onClick={handleNextPage}
        >
          Siguiente &gt;
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
