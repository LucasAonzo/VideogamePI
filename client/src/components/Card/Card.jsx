import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, image, genres, id, rating }) => {
  return (
    <div key={id} className={style.container}>
      <Link to={`/detail/${id}`}>
        <div className={style.card}>
          <img className={style.card__image} src={image} alt={name} />
          <h2 className={style.card__title}>{name}</h2>
          <span className={style.card__rating}>⭐{rating}</span>
          <div className={style.card__genrebox}>
            {genres.every((e) => typeof e === "string")
              ? genres?.map((gen) => gen).join(" - ")
              : genres?.map((gen) => gen.name).join(" - ")}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
