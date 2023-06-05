import {
  getAllGames,
  getGamesFromApiOrDb,
  getGamesOrderAlphabetic,
  getGamesOrderRating,
  getGenresFiltered,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Filter.module.css";

const FilterButtons = () => {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);

  // action para filtrar por generos
  const filterByGenre = (event) => {
    const selectedGenreId = Number(event.target.value);
    dispatch(getGenresFiltered(selectedGenreId));
  };

  // action para ordenar por rating
  const gameOrderRating = (event) => {
    dispatch(getGamesOrderRating(event.target.value));
  };
  // action para ordenar alfabeticamente
  const gamesOrderAlphabetic = (event) => {
    dispatch(getGamesOrderAlphabetic(event.target.value));
  };
  // functiones de api o db
  const filterByOrigin = (event) => {
    dispatch(getGamesFromApiOrDb(event.target.value));
  };

  return (
    <div className={style.container}>
      <div>
        <select
          className={style.selects}
          defaultValue=""
          onChange={filterByGenre}
        >
          <option disabled value="">
            Genres
          </option>
          {genres.map((genre) => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <select
          className={style.selects}
          defaultValue=""
          onChange={filterByOrigin}
        >
          <option disabled value="">
            Origin
          </option>
          <option value="ALL">All games</option>
          <option value="API">From API</option>
          <option value="DB">Created by user</option>
        </select>
      </div>

      <div>
        <select
          className={style.selects}
          defaultValue=""
          onChange={gameOrderRating}
        >
          <option disabled value="">
            Rating
          </option>
          <option value="Ascendente">Ascendant</option>
          <option value="Descendente">Descendant</option>
        </select>
      </div>
      <div>
        <select
          className={style.selects}
          defaultValue=""
          onChange={gamesOrderAlphabetic}
        >
          <option disabled value="">
            A/Z
          </option>
          <option value="Ascendente">Ascendant</option>
          <option value="Descendente">Descendant</option>
        </select>
      </div>
      <div>
        <button
          className={style.selects}
          onClick={() => dispatch(getAllGames())}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default FilterButtons;
