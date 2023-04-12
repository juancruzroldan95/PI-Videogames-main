import { React, useState} from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesByName } from '../../redux/actions';
import styles from './SearchBar.module.css'

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getVideogamesByName(searchTerm));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        placeholder="Search video games..."
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar;