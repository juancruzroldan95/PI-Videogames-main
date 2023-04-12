import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGenreFilter, setOriginFilter } from '../../redux/actions';
import styles from './Filter.module.css'


const Filter = () => {
  const genreFilter = useSelector(state => state.genreFilter);
  const originFilter = useSelector(state => state.originFilter);
  const genres = useSelector(state => state.genres);
  const dispatch = useDispatch();

  const handleGenreChange = (event) => {
    const selectedGenres = Array.from(event.target.selectedOptions).map(option => option.value);
    dispatch(setGenreFilter(selectedGenres));
  }

  const handleOriginChange = (event) => {
    dispatch(setOriginFilter(event.target.value));
  }

  return (
    <div>
      <div>
        <label htmlFor="genreIds">Genres: </label>
        <select multiple name="genreIds" value={genres.genreIds} className={styles.filterSelect} onChange={handleGenreChange} >
          {genres.map(genre => (
            <option key={genre.id} value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <div>
          {genreFilter.map((genre) => (
            <div key={genre} className={styles.selectedFilter}>
              {genre}
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="origin">Origin: </label>
        <select id="origin" name="origin" className={styles.filterSelect} onChange={handleOriginChange}>
          <option value="both">Both</option>
          <option value="api">API</option>
          <option value="database">Database</option>
        </select>
        <div key={originFilter} className={styles.selectedFilter}>
          {originFilter}
        </div>
      </div>
    </div>
  )
}

export default Filter;