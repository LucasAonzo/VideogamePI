const { Genre } = require("../db.js");
const { API_KEY } = process.env;
const axios = require("axios");

const getGenres = async () => {
  try {
    let apigenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    apigenres = apigenres.data.results;
    apigenres = apigenres.map((genre) => {
      return {
        name: genre.name,
      };
    });
    apigenres.forEach(async (genre) => {
      await Genre.findOrCreate({
        where: {
          name: genre.name,
        },
      });
    });
    let dbgenres = await Genre.findAll();
    return [...apigenres, ...dbgenres];
  } catch (error) {
    throw new Error("Error al obtener los géneros");
  }
};

module.exports = {
  getGenres,
};
