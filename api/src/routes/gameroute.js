const { Router } = require("express");
const {
  createGame,
  getGames,
  getGamesByName,
} = require("../controllers/gamecontroller.js");
const { Genre } = require("../db.js");
const { getGenres } = require("../controllers/genrecontroller.js");
const router = Router();

router.get("/", async (req, res) => {
  let { name } = req.query;
  let games;
  try {
    if (name) {
      games = await getGamesByName(name);
    } else {
      games = await getGames();
    }
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  let { name, description, released, rating, platforms, genres } = req.body;
  try {
    let game = await createGame(
      name,
      description,
      released,
      rating,
      platforms,
      genres
    );
    let genresdb = await Genre.findAll({
      where: {
        name: genres,
      },
    });
    game.addGenres(genresdb);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
