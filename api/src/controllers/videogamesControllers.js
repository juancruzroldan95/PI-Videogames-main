const { Videogames, Genres } = require("../db")
const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { Sequelize } = require('sequelize');

const cleanArray = (arr) => // for route /videogames
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      image: elem.background_image,
      created: false,
      genres: elem.genres.map((genre) => { return { id: genre.id, name: genre.name }}),
    };
  });

const cleanObject = (obj) => { // for route /videogames/{id}
  return {
    id: obj.id,
    name: obj.name,
    description: obj.description,
    platforms: obj.platforms.map((platform) => {return platform.platform.name}),
    image: obj.background_image,
    released: obj.released,
    rating: obj.rating,
    genres: obj.genres.map((genre) => { return { id: genre.id, name: genre.name } })
  }
}

const createVideogame = async (name, description, platforms, image, released, rating, genreIds) => {
  const newVideogame = await Videogames.create({ name, description, platforms, image, released, rating });
  for (const genreId of genreIds) {
    const genre = await Genres.findByPk(genreId);
    await newVideogame.addGenres(genre);
  }
  return newVideogame;
};

const getVideogameById = async (id, source) => {
  let videogame;
  if (source === "api") {
    const result = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
    videogame = cleanObject(result);
  } else {
    videogame = await Videogames.findByPk(id, {
      include: {
        model: Genres,
        attributes: ['id', 'name'],
        through: { attributes: [] }, // Exclude the join table attributes from the result
        as: 'genres'
      }
    });
  }
  return videogame;
};

const getAllVideogames = async () => {
  const dbVideogames = await Videogames.findAll({
    attributes: ['id', 'name', 'image', 'created'],
    include: {
      model: Genres,
      attributes: ['id', 'name'],
      through: { attributes: [] },
      as: 'genres'
    }
  });
  let response = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data;
  let apiVideogamesResults = response.results; // Array
  for (let i = 0; i < 4; i++) { // Only 100 videogames
    response = (await axios.get(response.next)).data;
    apiVideogamesResults = apiVideogamesResults.concat(response.results);
  }
  const apiVideogames = cleanArray(apiVideogamesResults);
  return [...dbVideogames, ...apiVideogames];
};

const searchVideogameByName = async (name) => {
  const Op = Sequelize.Op;
  const dbVideogames = await Videogames.findAll({
    attributes: ['id', 'name', 'image', 'created'],
    include: {
      model: Genres,
      attributes: ['id', 'name'],
      through: { attributes: [] },
      as: 'genres'
    },
    where: {
      name: {
        [Op.iLike]: `%${name}%` // ILIKE '%name' (case insensitive) (PG only)
      }
    }
  });
  const response = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data;
  const apiVideogames = cleanArray(response.results);
  const filteredApiVideogames = apiVideogames.filter((videogame) => {
    return videogame.name.toLowerCase().includes(name.toLowerCase());
  }).slice(0, 15);
  const videogames = [...dbVideogames, ...filteredApiVideogames];
  if (videogames.length === 0) return { error: "No videogames with that search"};
  else return videogames;
};


module.exports = {
  createVideogame,
  getVideogameById,
  getAllVideogames,
  searchVideogameByName
};