import React from 'react'
import { useDispatch } from 'react-redux';
import { sortVideogamesBy } from '../../redux/actions';
import styles from './Sort.module.css'

const Sort = () => {
  const dispatch = useDispatch();

  const handleSortChange = (event) => {
    dispatch(sortVideogamesBy(event.target.value));
  };

  return (
    <div>
      <label htmlFor="sortSelect">Sort by: </label>
      <select id="sortSelect" name ="sortSelect" className={styles.sortSelect} onChange={handleSortChange}>
        <option value='none'>None</option>
        <option value="nameAsc">Name (A to Z)</option>
        <option value="nameDesc">Name (Z to A)</option>
        <option value="ratingAsc">Top Rating</option>
        <option value="ratingDesc">Low Rating</option>
      </select>
    </div>
  );
};

export default Sort;