import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/home" className={styles.navbarLink}>Home</Link>
      <Link to="/create" className={styles.navbarLink}>Add videogame</Link>
    </div>
  );
};

export default NavBar;