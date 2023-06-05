import React, { useEffect, useState } from "react";
import { postGame, getAllGames, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Form.module.css";

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
  });

  const validateInputs = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "Name is required";
    } else if (!input.description) {
      errors.description = "Description is required";
    } else if (!input.released) {
      errors.released = "Released is required";
    } else if (!input.rating) {
      errors.rating = "Rating is required";
    } else if (!input.genres) {
      errors.genres = "Genres is required";
    } else if (!input.platforms) {
      errors.platforms = "Platforms is required";
    } else if (!input.background_image) {
      errors.background_image = "Background_image is required";
    }
    return errors;
  };

  const [errorIn, setErrorIn] = useState({});

  const arrPlat = [];
  allGames.map((games) =>
    games.platforms?.map((platfs) => arrPlat.push(platfs))
  );
  let newSet = arrPlat.length > 0 ? [...new Set(arrPlat)] : [];

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAllGames());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrorIn(
      validateInputs({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectGenres = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
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
      genres: input.genres.filter((genre) => genre !== e.target.value),
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
        platforms: [...input.platforms, e.target.value],
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
        (platform) => platform !== e.target.value
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

    const nameRepeated = allGames.find((game) => game.name === input.name);
    if (nameRepeated) {
      alert("Game already exists");
    } else {
      let resultError = Object.keys(validateInputs(input));
      if (
        resultError.length !== 0 ||
        !input.genres.length ||
        !input.platforms.length
      ) {
        alert("complete all fields");
        return;
      } else {
        dispatch(postGame(input));

        setInput({
          name: "",
          description: "",
          released: "",
          rating: 0,
          genres: [],
          platforms: [],
          background_image: "",
        });

        alert("Game created successfully");
      }
    }
  };

  return (
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
            type="number"
            name="rating"
            value={input.rating}
            onChange={handleInputChange}
            className={style.input}
          />
          {errorIn.rating && <p className={style.error}>{errorIn.rating}</p>}
        </div>
        <div>
          <label className={style.label}>Genres: </label>
          <select onChange={handleSelectGenres} className={style.select}>
            <option value="">Select genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <div>
            {input.genres.map((genre) => (
              <div key={genre}>
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
            <option value="">Select platform</option>
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
          <div>
            {input.platforms.map((platform) => (
              <div key={platform}>
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
          <label className={style.label}>Background_image: </label>
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

        <button type="submit" className={style.button}>
          Create Game
        </button>
      </form>
    </div>
  );
};

export default CreateGame;
