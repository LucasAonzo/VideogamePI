const { Router } = require("express");
const { getGameById } = require("../controllers/gamecontroller.js");
const router = Router();

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let game = await getGameById(id);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
