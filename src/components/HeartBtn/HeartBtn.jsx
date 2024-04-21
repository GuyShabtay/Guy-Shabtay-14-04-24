import React from 'react'
import "./HeartBtn.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useSelector } from 'react-redux';


const HeartBtn = ({heartStyle}) => {
  return (
    <div >
    <FavoriteIcon key={heartStyle} className={heartStyle} />
    </div>
  )
}

export default HeartBtn;