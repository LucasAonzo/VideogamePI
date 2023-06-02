const { Videogame, Genre } = require("../db.js");
const { Op } = require("sequelize");

const axios = require("axios");
const { API_KEY } = process.env;

const getGames = async (page = 1, pageSize = 15) => {
  try {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const urls = [];
    for (let i = 1; i <= 5; i++) {
      urls.push(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
    }

    const apiResponses = await Promise.all(urls.map((url) => axios.get(url)));
    const apiResults = apiResponses.flatMap(
      (response) => response.data.results
    );
    const apiGames = apiResults
      .slice(0, 100) // Limitar a los primeros 100 juegos
      .map((game) => ({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        genres: game.genres?.map((genre) => genre.name),
        platforms: game.platforms?.map((platform) => platform.platform.name),
      }));

    const dbGames = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const mergedGames = dbGames.map((game) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres?.map((genre) => genre.name),
      platforms: game.platforms?.map((platform) => platform.name),
    }));

    const allGames = [...apiGames, ...mergedGames];
    const paginatedGames = allGames.slice(start, end);

    return {
      total: Math.min(allGames.length, 100), // máximo 100
      page,
      pageSize,
      games: paginatedGames,
    };
  } catch (error) {
    throw new Error("Error al obtener los juegos");
  }
};

const getGameById = async (id) => {
  try {
    if (id.includes("-")) {
      const game = await Videogame.findOne({
        where: {
          id,
        },
        include: [Genre],
      });

      const gamedb = {
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        img: game.img,
        genres: game.genres.map((genre) => genre.name),
      };
      return gamedb;
    } else {
      const api = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const gameapi = {
        id: api.data.id,
        name: api.data.name,
        description: api.data.description,
        released: api.data.released,
        rating: api.data.rating,
        platforms: api.data.platforms.map((platform) => platform.platform.name),
        img: api.data.background_image,
        genres: api.data.genres.map((genre) => genre.name),
      };
      return gameapi;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`El juego con el ID: ${id} no existe`);
    } else {
      throw new Error("Error al obtener el juego");
    }
  }
};

const getGamesByName = async (name) => {
  try {
    const api = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );
    const apiResults = api.data.results.slice(0, 15);
    const apiGames = apiResults.map((game) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres?.map((genre) => genre.name),
      platforms: game.platforms?.map((platform) => platform.platform.name),
    }));

    const dbGames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const mergedGames = dbGames.map((game) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres?.map((genre) => genre.name),
      platforms: game.platforms?.map((platform) => platform.name),
    }));

    const results = [...apiGames, ...mergedGames];

    if (results.length === 0) {
      throw new Error(`No se encontraron juegos con el nombre: ${name}`);
    }

    return results;
  } catch (error) {
    throw new Error("Error al buscar juegos por nombre");
  }
};

const createGame = async (
  name,
  description,
  released,
  rating,
  platforms,
  img
) => {
  try {
    const [game, created] = await Videogame.findOrCreate({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      defaults: {
        name,
        description,
        released,
        rating,
        platforms,
        img,
      },
    });

    if (!created) {
      throw new Error(`El juego con el nombre: ${name} ya existe`);
    }

    return game;
  } catch (error) {
    throw new Error("Error al crear el juego");
  }
};

module.exports = {
  getGames,
  getGameById,
  getGamesByName,
  createGame,
};
