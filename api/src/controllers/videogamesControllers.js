const { Videogames } = require("../db")
const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;

const cleanApiVideogamesRaw = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      platforms: elem.platforms.map((platform) => {return platform.platform.name}),
      image: elem.background_image,
      released: elem.released,
      rating: elem.rating,
      created: false,
    };
  });

const cleanDatabaseVideogamesRaw = (arr) => {
  arr.map((elem) => {
    return {
      id: elem.Videogames.dataValues.id,
      name: elem.Videogames.dataValues.name,
      platforms: elem.Videogames.dataValues.platforms,
      image: elem.Videogames.dataValues.image,
      released: elem.Videogames.dataValues.released,
      rating: elem.Videogames.dataValues.rating,
      created: elem.Videogames.dataValues.created,
    };
  });
}

const createVideogame = async (name, description, platforms, image, released, rating) =>
  await Videogames.create({ name, description, platforms, image, released, rating }); // The Model.create() method returns a promise

const getVideogameById = async (id, source) => {
  const videogame =
    source === "api"
      ? (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
      : await Videogames.findByPk(id);
  
  return videogame;
};

const getAllVideogames = async () => {
  const databaseVideogamesRaw = await Videogames.findAll();
  let apiVideogamesRaw = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data;
  let apiVideogamesResults = apiVideogamesRaw.results; // Array
  for (let i = 0; i < 4; i++) { // Only 100 videogames
    apiVideogamesRaw = (await axios.get(apiVideogamesRaw.next)).data;
    apiVideogamesResults = apiVideogamesResults.concat(apiVideogamesRaw.results);
  }
  // const databaseVideogames = cleanDatabaseVideogamesRaw(databaseVideogamesRaw);
  const apiVideogames = cleanApiVideogamesRaw(apiVideogamesResults);
  return [...databaseVideogamesRaw, ...apiVideogames];
};

const searchVideogameByName = async (name) => {
  const databaseVideogamesRaw = await Videogames.findAll({ where: {name: name} }); // Replace for LIKE statement
  const apiVideogamesRaw = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data;
  const apiVideogames = cleanApiVideogamesRaw(apiVideogamesRaw.results);
  // console.log(apiVideogames);
  const filteredApiVideogames = apiVideogames.filter((videogame) => videogame.name === name); // Replace for includes() string method
  return [...databaseVideogamesRaw, ...filteredApiVideogames];
};


module.exports = {
  createVideogame,
  getVideogameById,
  getAllVideogames,
  searchVideogameByName
};