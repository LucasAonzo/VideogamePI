const { Router } = require("express");
const { getPlataforms } = require("../controllers/plataformcontroller.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let plataforms = await getPlataforms();
    res.status(200).json(plataforms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
