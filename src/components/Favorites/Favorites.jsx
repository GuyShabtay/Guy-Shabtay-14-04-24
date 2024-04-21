import React from 'react';
import './Favorites.css';
import FavoriteCard from '../FavoriteCard/FavoriteCard';
import { useSelector ,useDispatch} from 'react-redux';
import { invert,changeAlignment } from '../../redux/VisiblePage';
import {setSearchQuery} from '../../redux/Search'




const Favorites = () => {
  const favorites = useSelector((state) => state.favoritesList.favorites);
  const dispatch = useDispatch();
  // console.log('favorites',favorites)
  const showFavoriteInMainPage =  (cityName) => {
    dispatch(invert());
    dispatch(changeAlignment('left'));
    dispatch(setSearchQuery(cityName))

    }
  return (
    <div id='favorites'>
    <h1 className='handlee-regular'>Favorites</h1>
    <div id='favorite-cards'>
    {favorites.map((favorite, index) => (
      <div className='favorite' key={index}>
      <button className='favorite-btn' onClick={() => showFavoriteInMainPage(favorite.name) }>
      <FavoriteCard favorite={favorite} />
    </button>
    
      </div>
    ))}
    </div>
    </div>

  )
}

export default Favorites