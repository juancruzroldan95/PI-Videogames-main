const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { Genres } = require("../db");


const getAllGenres = async () => {
  const response = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data;
  const apiGenres = response.results.map(result => { return { id: result.id, name: result.name }});
  for (const apiGenre of apiGenres) { // store all genres obtained from the API in the database
    await Genres.create({ id: apiGenre.id, name: apiGenre.name });
  };
  return apiGenres;
};

module.exports = {
  getAllGenres,
};