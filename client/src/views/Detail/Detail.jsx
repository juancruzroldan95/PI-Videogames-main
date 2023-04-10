import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "./Detail.module.css"

const Detail = () => {
  const { id } = useParams();
  const [videogameDetail, setVideogameDetail] = useState(null);

  useEffect(() => {
    const getVideogameDetail = async () => {
      const response = await axios.get(`http://localhost:3001/videogames/${id}`);
      setVideogameDetail(response.data);
    };
    getVideogameDetail();
  }, [id]);

  return (
    <div>
      {videogameDetail ? (
        <div className={styles.videogameDetail}>
          <h2 className={styles.title}>{videogameDetail.name}</h2>
          <img className={styles.image} src={videogameDetail.image} alt={videogameDetail.name} />
          <p className={styles.description}>{videogameDetail.description}</p>
          <p className={styles.label}>Platforms:</p>
          <ul className={styles.platforms}>
            {videogameDetail.platforms.map((platform) => (
              <li key={platform} className={styles.platform}>
                {platform}
              </li>
            ))}
          </ul>
          <p className={styles.label}>Genres:</p>
          <ul className={styles.genres}>
            {videogameDetail.genres.map((genre) => (
              <li key={genre.id} className={styles.genre}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Detail;