import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const Landing = () => {
  return (
    <div className={styles.landing}>
      <h1>Welcome to my Video Game App!</h1>
      <p>Explore thousands of video games and add your own creations!</p>
      <Link to="/home">
        <button>Explore</button>
      </Link>
    </div>
  );
};

export default Landing;