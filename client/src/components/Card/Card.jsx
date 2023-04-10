import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {
  return (
    <div className={styles.videogameCard}>
      <img src={props.image} alt={props.name} />
      <Link key={props.id} to={`/detail/${props.id}`} className={styles.videogameCardLink}>
        <h2>{props.name}</h2>
      </Link>
      <ul>{props.genres.map(genre => (
        <li key={genre.id}>{genre.name}</li>
      ))}
      </ul>
    </div>
  )
}

export default Card;