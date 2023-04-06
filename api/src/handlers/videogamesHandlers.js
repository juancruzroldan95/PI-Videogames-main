const getVideogamesHandler = (req, res) => {
  // Call a function that obtains the data from the DB
  // Call a function that obtains the data from the API
  // Join data
  // Response with the data

  const { name } = req.query;
  if (name !== undefined) {
    res.send(`Return all videogames with name ${name}`);
  } else {
    res.send("Return all videogames");
  }
}

const getVideogameDetailHandler = (req, res) => {
  const { idVideogame } = req.params;
  res.send(`I'm in the videogame detail. I have to return an object with the detail of the videogame with id ${id}`);
};

const createVideogameHandler = (req, res) => {
  const { name, genre, title } = req.body;
  res.send("I'm doing a post to /videogames. I need all the data from body params to create a new videogame in the postgres database with the assosiated genre please.");
};

module.exports = {
  getVideogamesHandler,
  getVideogameDetailHandler,
  createVideogameHandler,
}