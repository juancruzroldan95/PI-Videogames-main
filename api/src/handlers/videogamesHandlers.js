const { createVideogame, getVideogameById , searchVideogameByName, getAllVideogames} = require("../controllers/videogamesControllers");

const getVideogamesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name ? await searchVideogameByName(name) : await getAllVideogames();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVideogameDetailHandler = async (req, res) => {
  const { idVideogame } = req.params;
  const source = isNaN(idVideogame) ? "bdd" : "api";

  try {
    const videogame = await getVideogameById(idVideogame, source);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createVideogameHandler = async (req, res) => {
  const { name, description, platforms, image, released, rating } = req.body;
  try {
    const newVideogame = await createVideogame(name, description, platforms, image, released, rating);
    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// example body:
// {
//   "name":"Stumble Guys",
//   "description":"Battle royale party game",
//   "platforms":["iOS", "Android"],
//   "image":"https://cdn.cloudflare.steamstatic.com/steam/apps/1677740/capsule_616x353.jpg?t=1668177990",
//   "released":"2021-02-12",
//   "rating":4.12
// }

module.exports = {
  getVideogamesHandler,
  getVideogameDetailHandler,
  createVideogameHandler,
}