import React from "react";
import { Link } from "react-router-dom";
import style from "./About.module.css";
import img from "../../assets/Lucas.png";
import git from "../../assets/github-mark.svg";

function About() {
  return (
    <div className={style.window}>
      <div className={style.container}>
        <h1 className={style.paragraph}>
          ¡Bienvenido a mi aplicación de juegos! Aquí podrás explorar una amplia
          variedad de juegos y descubrir nuevos títulos para jugar. Esta
          aplicación utiliza la API de juegos de Rawg.io, la cual proporciona
          información detallada sobre miles de juegos.
        </h1>
        <p>
          Esta aplicación fue desarrollada utilizando una combinación de
          tecnologías modernas para brindarte la mejor experiencia de juego.
          Algunas de las tecnologías utilizadas son:
        </p>
        <ul className={style.techList}>
          <li>React</li>
          <li>React Router</li>
          <li>Redux</li>
          <li>Axios</li>
          <li>PostgreSQL</li>
          <li>Node.js</li>
          <li>Express</li>
        </ul>
        <p>
          Si estás interesado en conocer más sobre el desarrollo de esta
          aplicación y explorar el código fuente, puedes visitar mi perfil de
          GitHub:
        </p>
        <div className={style.cardContainer}>
          <Link
            className={style.card}
            to="https://github.com/LucasAonzo"
            target="_blank"
          >
            <img
              className={style.profileImage}
              src={img}
              alt="Foto de perfil"
            />
            <h1 className={style.name}>Lucas Aonzo</h1>
            <img className={style.githubIcon} src={git} alt="Ícono de GitHub" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
