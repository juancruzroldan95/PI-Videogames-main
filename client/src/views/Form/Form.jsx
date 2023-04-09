import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createVideogame } from '..'

const Form = () => {
  const [form, setForm] = useState({
    name:"",
    description: "",
    platforms: [],
    image: "",
    released: "",
    rating: 0,
    genres: []
  });

  const handleInputChange = (e) => {
    setForm({...form, [e.target.id]:e.target.value})
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(createVideogame({ form.name, ...}))
  // };

  return (
    <form>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" value={form.name} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <textarea id="description" value={form.description} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="platforms">Platforms: </label>
        <input id="platforms" value={form.platforms} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="image">URL image: </label>
        <input id="image" value={form.image} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="released">Release date: </label>
        <input type="date" id="released" value={form.released} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="rating">Rating: </label>
        <input type="number" id="rating" value={form.rating} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="genres">Genres: </label>
        <input id="genres" value={form.genres} onChange={handleInputChange}/>
      </div>
      <div>
        <button type="submit">Create videogame</button>
      </div>
    </form>
  )
}

export default Form;