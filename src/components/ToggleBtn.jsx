import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './ToggleBtn.css';
import { styled } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import { useDispatch,useSelector} from 'react-redux';
import { invert,changeAlignment } from '../redux/VisiblePage';



export default function ToggleBtn() {
  const toggleBtnAlignment = useSelector((state) => state.visiblePage.toggleBtnAlignment);

  // const [alignment, setAlignment] = React.useState('left');
  const dispatch = useDispatch();

   const handleAlignment = (event, newAlignment) => {
    // setAlignment(newAlignment);
    dispatch(changeAlignment(newAlignment))

    // console.log('newAlignment',newAlignment)
    dispatch(invert())
  };
  const ToggleButton = styled(MuiToggleButton)({
    color: "white",

    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: '#fab90c'
    }
  });
  return (
    <ToggleButtonGroup
      value={toggleBtnAlignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      id='toggle'
    >
      <ToggleButton value="left" aria-label="left aligned" >
        Home
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        Favorites
      </ToggleButton>
      
    </ToggleButtonGroup>
  );
}
