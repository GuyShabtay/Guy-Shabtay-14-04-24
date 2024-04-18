import React from 'react'
import "./HeartBtn.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useSelector } from 'react-redux';


const HeartBtn = ({heartStyle,isFavorite}) => {
  const handleAddToFavorites = async () => {
    const element = document.querySelector('.heart');
      element.classList.remove();
      element.classList.add({heartStyle});

    // switch(heartFill){
    //   case 'initial': return 'empty-heart';
    //   case 'added': return 'empty-heart';

    }
  return (
    <div >
    <FavoriteIcon key={heartStyle} className={heartStyle} />
    </div>
  )
}

export default HeartBtn;