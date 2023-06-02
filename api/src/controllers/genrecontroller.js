const { Genre } = require("../db.js");
const { API_KEY } = process.env;
const axios = require("axios");

const getGenres = async () => {
  try {
    const apiGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const apiGenresData = apiGenres.data.results;

    // Guardar los géneros de la API en la base de datos
    for (const genreData of apiGenresData) {
      const genre = {
        name: genreData.name,
      };
      await Genre.findOrCreate({
        where: { name: genre.name },
        defaults: genre,
      });
    }

    // Obtener los géneros almacenados en la base de datos
    const dbGenres = await Genre.findAll();

    return dbGenres; // Devolver solo los géneros almacenados en la base de datos
  } catch (error) {
    throw new Error("Error al obtener los géneros");
  }
};

module.exports = {
  getGenres,
};
