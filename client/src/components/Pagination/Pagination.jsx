import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ gamesPerPage, allGames, paginado, currentPage }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i + 1);
  } // Math.ceil redondea al entero más cercano hacia arriba

  const handlePageChange = (pageNumber) => {
    paginado(pageNumber);
    window.scrollTo(0, 0); // Scroll al inicio de la ventana cada vez que yo cambio de página
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }; // Si la página actual es mayor a 1, entonces puedo ir a la página anterior

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      handlePageChange(currentPage + 1);
    }
  }; // Si la página actual es menor a la cantidad de páginas, entonces puedo ir a la página siguiente

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
