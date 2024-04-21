import * as React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import MuiToggleButton from '@mui/material/ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import { invert, changeAlignment } from '../redux/VisiblePage';

export default function ToggleBtn() {
  const toggleBtnAlignment = useSelector(
    (state) => state.visiblePage.toggleBtnAlignment
  );
  const dispatch = useDispatch();
  const handleAlignment = (event, newAlignment) => {
    dispatch(changeAlignment(newAlignment));
    dispatch(invert());
  };
  const ToggleButton = styled(MuiToggleButton)({
    color: 'white',

    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'white',
      backgroundColor: '#fab90c',
    },
  });
  return (
    <ToggleButtonGroup
      value={toggleBtnAlignment}
      exclusive
      onChange={handleAlignment}
      aria-label='text alignment'
      id='toggle'
      style={{ color: '#fab90c' }}
    >
      <ToggleButton value='left' aria-label='left aligned'>
        Home
      </ToggleButton>
      <ToggleButton value='center' aria-label='centered'>
        Favorites
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
