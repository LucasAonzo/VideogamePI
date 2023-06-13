const axios = require("axios");
const { Genre } = require("../db");
const API_KEY = process.env.API_KEY;

const getGenres = async () => {
  const apiGenres = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const dataGenres = apiGenres.data;
  const genres = dataGenres.results.map((gen) => gen.name);
  genres.map((gen) =>
    Genre.findOrCreate({
      where: {
        name: gen,
      },
    })
  );

  const allGenres = await Genre.findAll();

  return allGenres;
};

module.exports = {
  getGenres,
};
