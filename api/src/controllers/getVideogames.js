const axios = require("axios");
const { Videogame, Genre } = require("../db");
const API_KEY = process.env.API_KEY;

const getGames = async () => {
  const apiGames = [];
  for (let i = 1; i <= 5; i++) {
    let response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );
    response.data.results.forEach((v) => {
      apiGames.push({
        id: v.id,
        name: v.name,
        released: v.released,
        background_image: v.background_image,
        rating: v.rating,
        platforms: v.platforms.map((p) => p.platform.name),
        genres: v.genres.map((g) => g.name),
        createdInDb: false,
      });
    });
  }

  const dbGames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const totalGames = apiGames.concat(dbGames);

  const listGames = totalGames.map((vg) => {
    return {
      name: vg.name,
      id: vg.id,
      released: vg.released,
      image: vg.background_image,
      platforms: vg.platforms,
      genres: vg.genres,
      rating: vg.rating,
      createdInDb: vg.createdInDb,
    };
  });
  return listGames;
};

const gameDetail = async (id) => {
  if (!isNaN(id)) {
    const dataApi = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const detail = dataApi.data;

    const gameApiDetail = {
      image: detail.background_image,
      name: detail.name,
      genres: detail.genres,
      description: detail.description.replace(/<[^>]*>?/g, ""),
      released: detail.released,
      rating: detail.rating,
      platforms: detail.platforms.map((p) => p.platform.name).toString(),
    };

    return gameApiDetail;
  }

  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)
  ) {
    const detailDb = await Videogame.findByPk(id, {
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    const gameDbInfo = {
      image: detailDb.dataValues.background_image,
      name: detailDb.dataValues.name,
      genres: detailDb.dataValues.genres,
      description: detailDb.dataValues.description,
      released: detailDb.dataValues.released,
      rating: detailDb.dataValues.rating,
      platforms: detailDb.dataValues.platforms,
      createdInDb: detailDb.dataValues.createdInDb,
    };

    return gameDbInfo;
  }
};

const createGame = async (
  name,
  description,
  released,
  rating,
  background_image,
  genres,
  platforms
) => {
  if (!name || !description || !platforms || !background_image) {
    throw "missing data for create a videogame";
  } else {
    const newGame = await Videogame.create({
      name,
      description,
      released,
      rating,
      background_image,
      genres,
      platforms,
    });

    const newGenres = await Genre.findAll({
      where: {
        name: genres,
      },
    });

    newGame.addGenres(newGenres);
    return newGame;
  }
};

module.exports = {
  getGames,
  gameDetail,
  createGame,
};
