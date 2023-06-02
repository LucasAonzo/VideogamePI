import style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={style.nav}>
      <h1 className={style.titlelogo}>VideogamePI</h1>
      <ul className={style.ul}>
        <li className={style.li}>
          <h1 className={style.title}>Home</h1>
        </li>
        <li className={style.li}>
          <h1 className={style.title}>About</h1>
        </li>
        <li className={style.li}>
          <h1 className={style.title}>Create Game</h1>
        </li>
      </ul>
    </nav>
  );
}
