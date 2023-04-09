import React from 'react'
import styles from './Card.module.css'

const Card = (props) => {
  return (
    <div className={styles.videogameCard}>
      <img src={props.image} alt={props.name} />
      <h2>{props.name}</h2>
      <ul>{props.genres.map(genre => (
        <li key={genre.id}>{genre.name}</li>
      ))}
      </ul>
    </div>
  )
}

export default Card