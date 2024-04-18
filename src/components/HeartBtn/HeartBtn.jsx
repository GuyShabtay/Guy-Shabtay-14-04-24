import React from 'react'
import "./HeartBtn.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useSelector } from 'react-redux';


const HeartBtn = ({addOrRemoveFavorite,isFavorite}) => {
  // const favoritesList = useSelector((state) => state.favoritesList);

  // const handleAddToFavorites2 =  () => {
  //   if(addToFavoritesResult==='added')
   
  // };
  return (
    <div >
    <FavoriteIcon className={(isFavorite ? 'full-heart': 'empty-heart') } id={(addOrRemoveFavorite==='add' ? 'added': 'removed') } />

    </div>
  )
}

export default HeartBtn;