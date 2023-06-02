const express = require("express");
const { Router } = require("express");
const { getGamesByName } = require("../controllers/gamecontroller.js");
const router = Router();

router.get("/name", async (req, res) => {
  try {
    const { name } = req.query;
    const games = await getGamesByName(name);

    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
