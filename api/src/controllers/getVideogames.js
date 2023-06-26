const axios = require("axios");
const { Videogame, Genre } = require("../db");
const API_KEY = process.env.API_KEY;

const mapListGames = (arr) =>
  arr.map((result) => {
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      background_image: result.background_image,
      released: result.released,
      rating: result.rating,
      createdInDb: result.createdInDb,
      genres: result.genres.map((g) => g.name),
      platforms: result.platforms,
    };
  });

const getGames = async () => {
  const apiGames = [];
  for (let i = 1; i <= 5; i++) {
    let response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );
    response.data.results.forEach((game) => {
      apiGames.push({
        id: game.id,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        platforms: game.platforms.map((platform) => platform.platform.name),
        genres: game.genres.map((genre) => genre.name),
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

  const mappedDbGameList = mapListGames(dbGames);

  const allGames = apiGames.concat(mappedDbGameList);

  const gameList = allGames.map((game) => {
    return {
      name: game.name,
      id: game.id,
      released: game.released,
      image: game.background_image,
      platforms: game.platforms,
      genres: game.genres,
      rating: game.rating,
      createdInDb: game.createdInDb,
    };
  });
  return gameList;
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
      platforms: detail.platforms
        .map((platform) => platform.platform.name)
        .toString(),
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
    throw "missing data to create a videogame";
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
