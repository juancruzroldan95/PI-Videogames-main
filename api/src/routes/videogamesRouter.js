const { Router } = require('express');
const {
  getVideogamesHandler,
  getVideogameDetailHandler,
  createVideogameHandler
} = require("../handlers/videogamesHandlers");

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogamesHandler);
videogamesRouter.get("/:idVideogame", getVideogameDetailHandler);
videogamesRouter.post("/", createVideogameHandler);

module.exports = videogamesRouter;