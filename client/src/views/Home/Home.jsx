import { React, useEffect } from 'react'
import CardsContainer from '../../components/CardsContainer/CardsContainer'
import { useDispatch } from 'react-redux'
import { getGenres, getVideogames } from '../../redux/actions'

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div>
      <CardsContainer />
    </div>
  )
}

export default Home;