const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesrouter = require("./gameroute.js");
const videogamesrouterid = require("./gamerouteid.js");
const genresrouter = require("./genreroute.js");
const plataformsrouter = require("./plataformroute.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogamesrouter);
router.use("/videogame", videogamesrouterid);
router.use("/genres", genresrouter);
router.use("/plataforms", plataformsrouter);

module.exports = router;
