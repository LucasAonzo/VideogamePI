import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={style.nav}>
      <h1 className={style.titlelogo}>VideogamePI</h1>
      <ul className={style.ul}>
        <li className={style.li}>
          <Link to="/videogames">
            <h1 className={style.title}>Home</h1>
          </Link>
        </li>
        <li className={style.li}>
          <Link to="/about">
            <h1 className={style.title}>About</h1>
          </Link>
        </li>
        <li className={style.li}>
          <Link to="/create">
            <h1 className={style.title}>Create Game</h1>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
