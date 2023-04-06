const { createVideogame } = require("../controllers/videogamesControllers");

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

const createVideogameHandler = async (req, res) => {
  try {
    const { name, description, platforms, image, released, rating } = req.body;
    const newVideogame = await createVideogame(name, description, platforms, image, released, rating);
    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVideogamesHandler,
  getVideogameDetailHandler,
  createVideogameHandler,
}