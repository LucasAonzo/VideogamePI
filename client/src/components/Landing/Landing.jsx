import React from "react";
import style from "./Landing.module.css";
import videoSource from "../../assets/fondo.mp4";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className={`${style.div} ${style.landing}`}>
      <video autoPlay="autoplay" loop="loop" muted className={style.video}>
        <source src={videoSource} type="video/mp4" />
      </video>
      <h1 className={style.h1}>WELCOME TO VIDEO GAMES</h1>
      <Link to="/videogames">
        <button className={style.button}>START</button>
      </Link>
    </div>
  );
}
