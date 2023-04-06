const { Videogames } = require("../db")

const createVideogame = async (name, description, platforms, image, released, rating) =>
  await Videogames.create({ name, description, platforms, image, released, rating }) // The Model.create() method returns a promise

module.exports = {
  createVideogame
};