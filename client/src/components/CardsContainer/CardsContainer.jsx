import React from 'react';
import Card from '../Card/Card';
import styles from './CardsContainer.module.css';
import { useSelector } from 'react-redux';

const CardsContainer = () => {
  const videogames = useSelector(state => state.videogames);

  return (
    <div>
      { videogames.length ? (
        <div className={styles.container}>
          {videogames.map((videogame) => (
            <Card
              key={videogame.id}
              id={videogame.id}
              name={videogame.name}
              image={videogame.image}
              genres={videogame.genres}
            />
          ))}
        </div>
      ) : (
        <p>Loading video games...</p>
      )}
    </div>
  );
};

export default CardsContainer;