import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getGenres } from '../../redux/actions'
import styles from './Form.module.css'

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => { dispatch(getGenres()) }, [dispatch]);

  const [form, setForm] = useState({
    name:"",
    description: "",
    platforms: [],
    image: "",
    released: "",
    rating: 0,
    genreIds: []
  });

  const [errors, setErrors] = useState({ image: '' });

  const isValidUrl = (string) => {
    // Regular expression for URL validation
    const urlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
    return urlRegex.test(string);
  }
  
  const genres = useSelector(state => state.genres);
  // const platforms = useSelector(state => state.platforms);
  const platforms = [
    "Xbox One",
    "Android",
    "Xbox",
    "iOS",
    "PC",
    "macOS",
    "Xbox 360",
    "PlayStation 2",
    "PlayStation 3",
    "PlayStation 4",
    "PlayStation 5"
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "genreIds") {
      const selectedGenres = Array.from(event.target.selectedOptions).map(option => parseInt(option.value));
      setForm({ ...form, genreIds: selectedGenres });
    } else if (name === "platforms") {
      const selectedPlatforms = Array.from(event.target.selectedOptions).map(option => option.value);
      setForm({ ...form, platforms: selectedPlatforms });
    } else if (name === "image") {
      if (isValidUrl(value)) {
        setErrors({ ...errors, image: null });
      } else {
        setErrors({ ...errors, image: 'Invalid URL' });
      };
      setForm({ ...form, [name]: value })
    } else {
      setForm({ ...form, [name]: value });
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3001/videogames", form);
    history.push(`detail/${response.data.id}`);
  };

  return (
    <form className={styles.createVideogameForm} onSubmit={handleSubmit}>
      <div >
        <div>
          <h1 name="title">Add a missing game!</h1>
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" value={form.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea name="description" value={form.description} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="platforms">Platforms: (you can select more than one)</label>
          <select multiple name="platforms" value={form.platforms} onChange={handleInputChange} >
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option> 
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="image">URL image: </label>
          <input type="text" name="image" value={form.image} onChange={handleInputChange} />
          {errors.image && <p className={styles.error}>{errors.image}</p>}
        </div>
        <div>
          <label htmlFor="released">Release date: </label>
          <input type="date" name="released" value={form.released} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="rating">Rating: </label>
          <input type="number" name="rating" min="1" max="5" value={form.rating} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="genreIds">Genres: (you can select more than one)</label>
          <select multiple name="genreIds" value={form.genreIds} onChange={handleInputChange} >
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Create videogame</button>
        </div>
      </div>
    </form>
  )
}

export default Form;