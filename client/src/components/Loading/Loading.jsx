import React from "react";
import style from "./Loading.module.css";

const LoadingPage = () => {
  return (
    <div className={style.container}>
      <h1 className={style.titulo}>Loading...</h1>

      <iframe
        src="https://giphy.com/embed/L05HgB2h6qICDs5Sms"
        width="180"
        height="180"
        className={style.gif}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default LoadingPage;
