const { Router } = require('express');
const {
  getVideogamesHandler,
  getVideogameDetailHandler,
  createVideogameHandler
} = require("../handlers/videogamesHandlers");
const { validate } = require("../middlewares/middlewares");

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogamesHandler);
videogamesRouter.get("/:idVideogame", getVideogameDetailHandler);
videogamesRouter.post("/", validate, createVideogameHandler); // validate to protect database

module.exports = videogamesRouter;