import React from "react";
import style from "./Loading.module.css";

const LoadingPage = () => {
  return (
    <div className={style.container}>
      <h1 className={style.titulo}>Loading...</h1>

      <img
        className={style.img}
        src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
        alt="Loading..."
      />
    </div>
  );
};

export default LoadingPage;
