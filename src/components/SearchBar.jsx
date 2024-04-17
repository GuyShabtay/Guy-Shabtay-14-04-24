// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import SearchIcon from '@mui/icons-material/Search';
// export default function InputWithIcon() {
//   return (
//     <Box sx={{ '& > :not(style)': { m: 1 } }}>
//       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//         <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//         <TextField id="input-with-sx" label="Search" variant="standard" />
//       </Box>
//     </Box>
//   );
// }
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { getAutoComplete } from '../ApiCalls';
import SearchIcon from '@mui/icons-material/Search';


const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [autoCompletions, setAutoCompletions] = useState([]);

  useEffect(() => {
    if (inputValue.length) handleAutoComplete();
  }, [inputValue]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleAutoComplete = async () => {
    try {
      const maxFiveAutoCompletions = await getAutoComplete(inputValue);
      setAutoCompletions(maxFiveAutoCompletions);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectionChange = (event, value) => {
    console.log('Selected:', value); // Print selected item to console
  };

  return (
    <div style={{display:'flex', alignItems:'end'}}>
    <SearchIcon sx={{ color: 'action.active',mr:'5px' }} />
    <Stack spacing={1} sx={{ width: 300 }}>
      <Autocomplete
        id='auto-highlight'
        autoHighlight
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleSelectionChange} // Add onChange event handler
        options={autoCompletions} // Map the options to only contain city names
        renderInput={(params) => (
          <TextField {...params} label='Search' variant='standard' />
        )}
      />
      </Stack>
      </div>
  );
}
export default SearchBar