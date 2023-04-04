const { Router } = require("express");

const genresRouter = Router();

genresRouter.get("/", (req, res) => {
  res.send("I'm in /genres. I have to return an array with all the genres in the API and store them in the postgres DB.");
});

module.exports = genresRouter;