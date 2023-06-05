import React from "react";
import { Link } from "react-router-dom";
import style from "./About.module.css";
import img from "../../assets/Lucas.png";
import git from "../../assets/GitHub.png";

function About() {
  return (
    <div className={style.container}>
      <p className={style.paragraph}>
        ¡Bienvenido a mi aplicación de juegos! Aquí podrás explorar una amplia
        variedad de juegos y descubrir nuevos títulos para jugar. Esta
        aplicación está basada en la API de juegos de Rawg.io, que proporciona
        información detallada sobre miles de juegos.
      </p>
      <p>
        Para desarrollar esta aplicación, utilicé una combinación de tecnologías
        modernas, incluyendo:
      </p>
      <ul className={style.techList}>
        <li>
          React: Un potente framework de JavaScript para construir interfaces de
          usuario interactivas.
        </li>
        <li>
          React Router: Una librería de enrutamiento para gestionar la
          navegación entre diferentes páginas de la aplicación.
        </li>
        <li>
          Redux: Una biblioteca de administración del estado que ayuda a
          mantener los datos de la aplicación de manera organizada.
        </li>
        <li>
          Axios: Un cliente HTTP basado en promesas utilizado para realizar
          solicitudes a la API de Rawg.io y obtener los datos de los juegos.
        </li>
        <li>
          PostgreSQL: Una base de datos relacional utilizada para almacenar
          información adicional sobre los juegos, como puntuaciones de usuarios
          y comentarios.
        </li>
        <li>
          Node.js: Un entorno de ejecución de JavaScript que permite ejecutar el
          código del servidor y establecer la conexión con la base de datos.
        </li>
        <li>
          Express: Un marco de aplicaciones web de Node.js que facilita la
          creación de API RESTful para interactuar con la base de datos y
          proporcionar los datos necesarios a la aplicación cliente.
        </li>
      </ul>
      <p>
        Si estás interesado en conocer más sobre el desarrollo de esta
        aplicación y explorar el código fuente, puedes visitar mi perfil de
        GitHub:
      </p>
      <div className={style.cardContainer}>
        <Link
          to={{ pathname: "https://github.com/LucasAonzo" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={style.profileImage} src={img} alt="Foto de perfil" />
          <h1 className={style.name}>Lucas Aonzo</h1>
          <img className={style.githubIcon} src={git} alt="Ícono de GitHub" />
        </Link>
      </div>
    </div>
  );
}

export default About;
