import React from "react";
import style from "./Landing.module.css";
import videoSource from "../../assets/again_-_105289 (Original).mp4";

export default function Landing() {
  return (
    <div className={style.div}>
      <video autoPlay="autoplay" loop="loop" muted className={style.video}>
        <source src={videoSource} type="video/mp4" />
      </video>
      <h1 className={style.h1}>WELCOME TO VIDEO GAMES</h1>
      <button className={style.button}>START</button>
    </div>
  );
}
