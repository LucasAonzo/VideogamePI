import React, { useEffect, useState } from "react";
import { postGame, getAllGames, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Form.module.css";
import { validateInputs } from "./Validation";

const CreateGame = () => {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  const allGames = useSelector((state) => state.allGames);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    genres: [],
    platforms: [],
    background_image: "",
  }); //estado local para guardar los valores del form

  const [errorIn, setErrorIn] = useState({}); //estado local para guardar los errores

  const arrPlat = []; //array para guardar las plataformas
  allGames.map(
    (games) => games.platforms?.map((platfs) => arrPlat.push(platfs)) //recorro los juegos y guardo las plataformas en el array
  );
  let newSet = arrPlat.length > 0 ? [...new Set(arrPlat)] : []; //quito las plataformas repetidas

  useEffect(() => {
    dispatch(getGenres());
    return () => {
      dispatch(getAllGames());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value, //guardo los valores del form en el estado local
    });
    setErrorIn(
      validateInputs({
        ...input,
        [e.target.name]: e.target.value, //guardo los errores en el estado local
      })
    );
  };

  const handleSelectGenres = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value], //guardo los valores de los select de generos en el estado local
    });
    setErrorIn(
      validateInputs({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    );
  };

  const handleSelectGenresDelete = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== e.target.value), //quito el valor del select del estado local
    });
    setErrorIn(
      validateInputs({
        ...input,
        genres: input.genres.filter((genre) => genre !== e.target.value),
      })
    );
  };

  const handleSelectPlatforms = (e) => {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value], //guardo los valores del select de plataformas en el estado local
      });
      setErrorIn(
        validateInputs({
          ...input,
          platforms: [...input.platforms, e.target.value],
        })
      );
    }
  };

  const handleSelectPlatformsDelete = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter(
        (platform) => platform !== e.target.value //quito el valor del select del estado local
      ),
    });
    setErrorIn(
      validateInputs({
        ...input,
        platforms: input.platforms.filter(
          (platform) => platform !== e.target.value
        ),
      })
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const nameRepeated = allGames.find((game) => game.name === input.name); //veo si el nombre del juego ya existe
    if (nameRepeated) {
      alert("Game already exists");
    } else {
      let resultError = Object.keys(validateInputs(input)); //guardo los errores en un array
      if (
        resultError.length !== 0 ||
        !input.genres.length ||
        !input.platforms.length //veo si hay errores o si no se selecciono ningun genero o plataforma
      ) {
        alert("Complete all fields");
        return;
      } else {
        dispatch(postGame(input)); //envio el juego al action
        dispatch(getAllGames());

        setInput({
          name: "",
          description: "",
          released: "",
          rating: 0,
          genres: [],
          platforms: [],
          background_image: "",
        }); //limpio el estado local

        alert("Game created successfully");
      }
    }
  };

  const isFormValid = () => {
    return (
      Object.keys(errorIn).length === 0 &&
      input.name &&
      input.description &&
      input.released &&
      input.rating &&
      input.genres.length > 0 &&
      input.platforms.length > 0 &&
      input.background_image
    );
  }; //veo si hay errores y si los campos estan completos para habilitar el boton de submit

  return (
    <div className={style.pageContainer}>
      <div className={style.container}>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label className={style.label}>Name: </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleInputChange}
              className={style.input}
            />
            {errorIn.name && <p className={style.error}>{errorIn.name}</p>}
          </div>
          <div>
            <label className={style.label}>Description: </label>
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={handleInputChange}
              className={style.input}
            />
            {errorIn.description && (
              <p className={style.error}>{errorIn.description}</p>
            )}
          </div>
          <div>
            <label className={style.label}>Released: </label>
            <input
              type="date"
              name="released"
              value={input.released}
              onChange={handleInputChange}
              className={style.input}
            />
            {errorIn.released && (
              <p className={style.error}>{errorIn.released}</p>
            )}
          </div>
          <div>
            <label className={style.label}>Rating: </label>
            <input
              type=""
              name="rating"
              value={input.rating}
              min={0}
              max={5}
              step={0.1}
              onChange={handleInputChange}
              className={style.input}
            />
            {errorIn.rating && <p className={style.error}>{errorIn.rating}</p>}
          </div>
          <div>
            <label className={style.label}>Genres: </label>
            <select onChange={handleSelectGenres} className={style.select}>
              <option value="">Select Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
            <div className={style.selectcontainer}>
              {input.genres.map((genre) => (
                <div className={style.selectoption} key={genre}>
                  <p>{genre}</p>
                  <button
                    type="button"
                    value={genre}
                    onClick={handleSelectGenresDelete}
                    className={style.button}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            {errorIn.genres && <p className={style.error}>{errorIn.genres}</p>}
          </div>
          <div>
            <label className={style.label}>Platforms: </label>
            <select onChange={handleSelectPlatforms} className={style.select}>
              <option value="">Select Platforms</option>
              {newSet.length > 0 ? (
                newSet.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))
              ) : (
                <option disabled>No platforms available</option>
              )}
            </select>
            <div className={style.selectcontainer}>
              {input.platforms.map((platform) => (
                <div key={platform} className={style.selectoption}>
                  <p>{platform}</p>
                  <button
                    type="button"
                    value={platform}
                    onClick={handleSelectPlatformsDelete}
                    className={style.button}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            {errorIn.platforms && (
              <p className={style.error}>{errorIn.platforms}</p>
            )}
          </div>
          <div>
            <label className={style.label}>URL Image: </label>
            <input
              type="text"
              name="background_image"
              value={input.background_image}
              onChange={handleInputChange}
              className={style.input}
            />
            {errorIn.background_image && (
              <p className={style.error}>{errorIn.background_image}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={style.button}
          >
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
