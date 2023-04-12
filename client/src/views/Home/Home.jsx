import { React, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getGenres, getAllVideogames } from '../../redux/actions'
import CardsContainer from '../../components/CardsContainer/CardsContainer'
import Sort from '../../components/Sort/Sort'
import Filter from '../../components/Filter/Filter'
import styles from './Home.module.css'

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  

  return (
    <div className={styles.home}>
      <div className={styles.filterSortContainer}>
        <Filter />
        <Sort />
      </div>
      <div>
        <CardsContainer />
      </div>
    </div>
  )
}

export default Home;