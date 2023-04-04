const { Router } = require('express');

const videogamesRouter = Router();

videogamesRouter.get("/", (req, res) => { //include case if query param videogames?name="..." 
  res.send("I'm in /videogames - i have to return an array of all the videogames");
});

videogamesRouter.get("/:idVideogame", (req, res) => {
  res.send("I'm in the videogame detail. I have to return an object with the detail of the videogame");
});

videogamesRouter.post("/", (req, res) => {
  res.send("I'm doing a post to /videogames. I need all the data from body params to create a new videogame in the postgres database with the assosiated genre please.");
});

module.exports = videogamesRouter;